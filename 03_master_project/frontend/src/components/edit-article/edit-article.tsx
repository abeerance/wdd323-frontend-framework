"use client";

import { ArticleData } from "@/app/page";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Rocket } from "lucide-react";
import Image from "next/image";

interface EditArticleProps {
  data: ArticleData;
}

export const EditArticle = ({ data }: EditArticleProps) => {
  const [editorContent, setEditorContent] = useState<ProseMirrorNode | undefined>(
    JSON.parse(data.content)
  );
  const [title, setTitle] = useState<string>(data.title);
  const [newImage, setNewImage] = useState<File | null>(null); // For storing the new uploaded image
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null); // For handling the file input
  // define the maximum allowed size for the image file in MB
  const MAX_IMAGE_SIZE_MB = 8;

  useEffect(() => {
    if (data.cover_image && data.cover_image.pathname) {
      setImageUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${data.cover_image.pathname}`);
    }
  }, [data]);

  // Handle image upload and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file); // Store the new image in state
      setImageUrl(URL.createObjectURL(file)); // Update the preview
    }
  };

  // function to handle uploading an image to the server
  const handleImageUpload = async () => {
    // early return if no coverImage is selected
    if (!newImage) return;

    // calculate the size of the image file in MB,
    const fileSizeMb = newImage.size / (1024 * 1024);
    // check if the file size exceeds the maximum limit
    if (fileSizeMb > MAX_IMAGE_SIZE_MB) {
      toast.error(
        `The image file size exceeds the maximum limit of ${MAX_IMAGE_SIZE_MB} MB. Please upload a smaller image`,
        {
          position: "bottom-center",
        }
      );

      // stop further execution
      throw new Error("Image file size exceeds the maximum limit");
    }

    // prepare the file to be sent using FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("files[]", newImage);

    try {
      //  send the file to the NextJS Server via POST request
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      // parse the JSON response from the server
      const data = await response.json();

      // check if the upload failed (based on response status)
      if (!response.ok) {
        toast.error(data.message || "Image upload failed", { position: "bottom-center" });
        throw new Error(data.message || "Image upload failed");
      }

      return data; // return the uploaded image details
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image", { position: "bottom-center" });
    }
  };

  const handleImageDelete = async () => {
    if (!data.cover_image?.id) return false; // Fail gracefully if there's no `cover_image` or `id`.

    try {
      const response = await fetch("/api/delete-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.cover_image.id }),
      });

      if (!response.ok) {
        toast.error("Failed to delete image", { position: "bottom-center" });
        return false;
      }

      // Log success for debugging
      console.log("Image deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting image: ", error);
      toast.error("Failed to delete image", { position: "bottom-center" });
      return false;
    }
  };

  const handleEditArticle = async () => {
    if (!editorContent || !title) {
      alert("Title and content are required");
      return;
    }

    let imageId = data.cover_image?.id || null; // Use null if `cover_image` or `id` is missing

    // If a new image is uploaded, handle the upload
    if (newImage) {
      const uploadedImageResponse = await handleImageUpload();
      if (!uploadedImageResponse) return;

      // Delete the old image if it exists
      if (data.cover_image?.id) {
        const deleteImageResponse = await handleImageDelete();
        console.log("deleteImageResponse: ", deleteImageResponse);
        if (!deleteImageResponse) return;
      }

      // Update the image ID with the new uploaded image
      imageId = uploadedImageResponse?.images[0]?.id || null;
    }

    // Prepare the payload for updating the article
    const payload = {
      id: data.id,
      title,
      content: editorContent,
      image_id: imageId,
    };

    try {
      const response = await fetch("/api/edit-article", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Article update failed", { position: "bottom-center" });
        return;
      }

      await response.json();
      toast.success("Article updated successfully", { position: "bottom-center" });
      router.push("/articles");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update article", { position: "bottom-center" });
    }
  };

  return (
    <div>
      <h1 className='font-bold text-3xl'>Edit Article</h1>
      <Input
        placeholder='Article title'
        className='border-gray-600 mt-6'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {imageUrl !== "" && (
        <div className='image-container'>
          {/* Display current or new image */}
          <Image src={imageUrl} alt='' fill objectFit='cover' />
        </div>
      )}
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='hidden'
        ref={fileInputRef} // Attach the ref here
      />
      <Button
        type='button'
        onClick={() => fileInputRef.current?.click()} // Trigger the file input using ref
        className='mt-4'
      >
        Upload New Image
      </Button>
      <TipTapEditor content={editorContent} onContentChange={setEditorContent} />
      <Button onClick={handleEditArticle}>
        Edit Article <Rocket />
      </Button>
    </div>
  );
};
