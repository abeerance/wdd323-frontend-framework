//src/components/tiptap/tiptap-viewer.tsx

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TipTapViewerProps {
  content: JSON;
}

export const TipTapViewer = ({ content }: TipTapViewerProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    immediatelyRender: false,
    editable: false,
  });

  return <EditorContent editor={editor} />;
};
