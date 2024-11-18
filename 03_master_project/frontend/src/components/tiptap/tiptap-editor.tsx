"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Heading1, Heading2, Heading3, Italic, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
// for images
// import Image from "@tiptap/extension-image";

export interface ProseMirrorNode {
  type: string;
  attrs?: Record<string, string | number | boolean>;
  content?: ProseMirrorNode[];
  marks?: { type: string }[];
  text?: string;
}

interface TipTapEditorProps {
  content: ProseMirrorNode | undefined;
  onContentChange: (content: ProseMirrorNode) => void;
}

export const TipTapEditor = ({ content, onContentChange }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false, // Disable default BulletList to avoid conflicts
      }),
      BulletList,
      ListItem,
      //   for images
      //   Image.configure({
      //     inline: true,
      //   }),
    ],
    editorProps: {
      attributes: {
        class: "my-5 border rounded-md border-gray-600 min-h-[400px] p-4 focus:outline-none editor",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      const jsonContent = editor.getJSON();
      onContentChange(jsonContent as ProseMirrorNode);
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  //   for images
  //   const handleFileSelect = () => {
  //     const input = document.createElement("input");
  //     input.type = "file";
  //     input.accept = "image/*";

  //     input.onchange = () => {
  //       const file = input.files?.[0];
  //       if (file) {
  //         const localImageURL = URL.createObjectURL(file);

  //         editor.chain().focus().setImage({ src: localImageURL }).run();
  //       }
  //     };

  //     input.click();
  //   };

  return (
    <>
      <ToggleGroup type='multiple' variant='outline' className='justify-start mt-6'>
        <ToggleGroupItem value='bold' onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='heading1'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='heading2'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='heading3'
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='bulletList'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </ToggleGroupItem>
        {/* for images
        <ToggleGroupItem value='addImage' onClick={handleFileSelect}>
          <ImagePlus />
        </ToggleGroupItem> */}
      </ToggleGroup>
      <EditorContent editor={editor} />
    </>
  );
};
