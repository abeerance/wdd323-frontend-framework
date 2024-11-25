"use client";

import { ProseMirrorNode, TipTapEditor } from "@/components/tiptap/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateArticlePage() {
  // state to hold the content of the TipTap editor
  const [editorContent, setEditorContent] = useState<ProseMirrorNode | undefined>(undefined);
  // state to hold the article title
  const [title, setTitle] = useState<string>("");
  // state to hold the cover image of the article
  const [coverImage, setCoverImage] = useState<File | undefined>();
  // useRouter hook for routing
  const router = useRouter();
  // define the maximum allowed size for the image file in MB
  const MAX_IMAGE_SIZE_MB = 8;

  // function to handle uploading an image to the server
  const handleImageUpload = async () => {
    // early return if no coverImage is selected
    if (!coverImage) return;

    // calculate the size of the image file in MB,
    const fileSizeMb = coverImage.size / (1024 * 1024);
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
    formData.append("files[]", coverImage);

    try {
      //  send the file to the NextJS Server via POST request
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      // parse the JSON response from the server
      const data = await response.json();
      return data; // return the uploaded image details
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image", { position: "bottom-center" });
    }
  };

  // function to handle creating the article
  const handleCreateArticle = async () => {
    // rudimentary validation
    if (!editorContent || !title) {
      alert("Title and content are required");
    }

    // call the handleImageUpload function
    const uploadedImageResponse = await handleImageUpload();

    // extract the image ID from the uploaded image data
    const imageId = uploadedImageResponse?.images[0].id;

    // create a payload to send to the backend server
    const payload = {
      title, // article title
      content: editorContent, // the current state of the editorContant
      image_id: imageId, // the ID of the uploaded image
    };

    // now we send the payload to the backend via POST request in a API-Route-Handler
    // 1. try to create an api-route-handler with the name create-article
    // 2. inside that api-route-handler, we send the JSON to the route /api/articles
    // 3. wenn die article creation nicht erfolgreich ist, sollte eine toast-message im catch erscheinen
    // 4. wenn der Artikel kriert ist, dann gibt es einen toat.success und einen router push auf /articles
    try {
      // send the article data to the backend route-handler
      const response = await fetch("/api/create-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      //parse the json from the server
      await response.json().then(() => {
        toast.success("Article created successfully", { position: "bottom-center" });
        router.push("/articles");
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create article", { position: "bottom-center" });
    }
  };

  return (
    <>
      <h1 className='font-bold text-3xl'>Let your imagination run wild</h1>
      {/* Input for the article title */}
      <Input
        placeholder='Article title'
        className='border-gray-600 mt-6'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type='file'
        className='border-gray-600 mt-6'
        accept='image/*'
        onChange={(event) => setCoverImage(event.target.files?.[0])}
      />
      <TipTapEditor content={editorContent} onContentChange={setEditorContent} />
      {/* Submit button to create the article  */}
      <Button onClick={handleCreateArticle}>
        Create Article <Rocket />
      </Button>
    </>
  );
}
