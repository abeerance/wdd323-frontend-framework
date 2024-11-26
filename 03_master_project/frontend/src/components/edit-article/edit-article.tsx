"use client";

import { ArticleData } from "@/app/page";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Rocket } from "lucide-react";

interface EditArticleProps {
  data: ArticleData;
}

export const EditArticle = ({ data }: EditArticleProps) => {
  // get the article content from the data
  const [editorContent, setEditorContent] = useState<ProseMirrorNode | undefined>(
    JSON.parse(data.content)
  );
  // get the article title from the data
  const [title, setTitle] = useState<string>(data.title);
  const router = useRouter();

  // function to handle creating the article
  const handleEditArticle = async () => {
    // rudimentary validation
    if (!editorContent || !title) {
      alert("Title and content are required");
    }

    // initialize the image ID as null
    const imageId = null;

    // create a payload to send to the backend server
    const payload = {
      id: data.id,
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
      const response = await fetch("/api/edit-article", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Article creation failed", { position: "bottom-center" });
        return;
      }

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
    <div>
      <h1 className='font-bold text-3xl'>Let your imagination run wild</h1>
      {/* Input for the article title */}
      <Input
        placeholder='Article title'
        className='border-gray-600 mt-6'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TipTapEditor content={editorContent} onContentChange={setEditorContent} />
      <Button onClick={handleEditArticle}>
        Edit Article <Rocket />
      </Button>
    </div>
  );
};
