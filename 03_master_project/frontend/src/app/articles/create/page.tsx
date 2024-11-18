"use client";

import { ProseMirrorNode, TipTapEditor } from "@/components/tiptap/tiptap-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateArticlePage() {
  // state to hold the content of the TipTap editor
  const [editorContent, setEditorContent] = useState<ProseMirrorNode | undefined>(undefined);
  // state to hold the article title
  const [title, setTitle] = useState<string>("");
  // state to hold the cover image of the article
  const [coverImage, setCoverImage] = useState<File | null>(null);
  // useRouter hook for routing
  const router = useRouter();

  return <TipTapEditor content={editorContent} onContentChange={setEditorContent} />;
}
