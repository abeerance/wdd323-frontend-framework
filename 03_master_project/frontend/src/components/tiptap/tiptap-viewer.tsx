//src/components/tiptap/tiptap-viewer.tsx

"use client";

import { sanitizeTiptapContent } from "@/utils/sanitize-tiptap-content";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TipTapViewerProps {
  content: string;
}

export const TipTapViewer = ({ content }: TipTapViewerProps) => {
  // since the backend returns a JSON string, we need to parse it first
  // pasring means that we convert the JSON string into a JSON object
  // this is necessary, ebcause the TipTapEditor componenet expect a JSON object
  // and not a JSON string
  const parsedContent =
    typeof content === "string" ? JSON.parse(content) : { type: "doc", content };

  const cleanedContent = {
    type: "doc",
    // here we call the sanitizeTiptapContent function to clean the content
    content: sanitizeTiptapContent(parsedContent.content),
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: cleanedContent,
    immediatelyRender: false,
    editable: false,
  });

  return <EditorContent editor={editor} />;
};
