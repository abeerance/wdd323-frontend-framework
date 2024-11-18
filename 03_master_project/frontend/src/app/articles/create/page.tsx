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

  // function to handle uploading an image to the server
  const handleImageUpload = async () => {
    // early return if no coverImage is selected
    if (!coverImage) return;

    // prepare the file to be sent using FormData
    const formData = new FormData();
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
    const uploadedImage = await handleImageUpload();

    console.log(uploadedImage);
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
