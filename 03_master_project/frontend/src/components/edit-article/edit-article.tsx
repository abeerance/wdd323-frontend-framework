"use client";

import { ArticleData } from "@/app/page";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Rocket } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/utils/image-upload";

interface EditArticleProps {
  data: ArticleData;
}

export const EditArticle = ({ data }: EditArticleProps) => {
  const [editorContent, setEditorContent] = useState<ProseMirrorNode | undefined>(
    JSON.parse(data.content)
  );
  const [title, setTitle] = useState<string>(data.title);
  const [imagePreview, setImagePreview] = useState<string>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${data.cover_image?.pathname}` || "" // Assuming `cover_image.pathname` contains the database image URL
  );
  const [newImage, setNewImage] = useState<File | null>(null); // For newly selected image
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  // define the maximum allowed size for the image file in MB
  const MAX_IMAGE_SIZE_MB = 8;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file); // Save the file for upload later
      setImagePreview(URL.createObjectURL(file)); // Show preview of the new image
    }
  };

  // function to handle uploading an image to the server
  const handleImageUpload = async () => {
    if (!newImage) return;

    const result = await uploadImage({
      file: newImage,
      title,
      maxFileSizeMb: MAX_IMAGE_SIZE_MB,
    });

    if (result) {
      console.log("Image uploaded successfully:", result);
      return result;
    }
  };

  const handleEditArticle = async () => {
    if (!editorContent || !title) {
      alert("Title and content are required");
      return;
    }

    let imageId = data.cover_image?.id || null;

    // If there's a new image selected, handle image upload
    if (newImage) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("files[]", newImage);

      try {
        // Delete the old image if there is one
        if (data.image_id && newImage) {
          await fetch("/api/delete-image", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: data.cover_image.id,
            }),
          });
        }

        // call the handleImageUpload function
        const uploadedImageResponse = await handleImageUpload();

        // extract the image ID from the uploaded image data
        // safely access the iamge ID from the uploadedImageResponse
        imageId = uploadedImageResponse?.images[0].id || null;

        if (!uploadedImageResponse.ok) {
          toast.error("Failed to upload image", { position: "bottom-center" });
          return;
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload image", { position: "bottom-center" });
        return;
      }
    }

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
      <h1 className='font-bold text-3xl'>Let your imagination run wild</h1>
      {/* Input for the article title */}
      <Input
        placeholder='Article title'
        className='border-gray-600 mt-6'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {/* Display current image from the database */}
      {imagePreview && (
        <div className='mt-4 relative w-full aspect-video'>
          <Image src={imagePreview} alt='Cover Image Preview' fill style={{ objectFit: "cover" }} />
        </div>
      )}
      {/* File input for new image */}
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        className='hidden'
        onChange={handleImageChange}
      />
      <Button type='button' onClick={() => fileInputRef.current?.click()} className='mt-4'>
        Upload New Image
      </Button>
      <TipTapEditor content={editorContent} onContentChange={setEditorContent} />
      <Button onClick={handleEditArticle} className='mt-4'>
        Edit Article <Rocket />
      </Button>
    </div>
  );
};
