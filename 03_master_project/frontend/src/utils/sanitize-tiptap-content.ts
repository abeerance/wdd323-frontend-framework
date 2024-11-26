import { ProseMirrorNode } from "@/components/tiptap/tiptap-editor";

/**
 * Cleans up and sanitizes content generated for use with TipTap by ensuring that the structure is valid
 * and any invalid or empty nodes are removed. This function is especially useful when dealing with
 * potentially malformed or user-generated ProseMirror content that needs to adhere to a specific format.
 *
 * @param content - The ProseMirror content to be sanitized. Can be a single node or an array of nodes.
 * @returns A cleaned array of ProseMirror nodes.
 */
export function sanitizeTiptapContent(
  content: ProseMirrorNode[] | ProseMirrorNode
): ProseMirrorNode[] {
  // Step 1: Check if the content is an array of nodes. ProseMirror content can either be a single node or an array of nodes.
  if (Array.isArray(content)) {
    return content
      .filter((node) => node && node.type) // Step 2: Filter out invalid nodes. Nodes must exist and have a valid `type` property.
      .map((node) => {
        // Step 3: Clone the current node to ensure immutability when making changes.
        const cleanedNode = { ...node };

        // Step 4: If the node contains nested content, recursively sanitize the children.
        if (node.content && Array.isArray(node.content)) {
          cleanedNode.content = sanitizeTiptapContent(node.content);
        }

        // Step 5: Remove empty text nodes. Text nodes without any actual text or only whitespace are invalid.
        if (cleanedNode.type === "text" && (!cleanedNode.text || cleanedNode.text.trim() === "")) {
          return null; // Returning `null` indicates that this node should be excluded.
        }

        // Step 6: Return the cleaned node.
        return cleanedNode;
      })
      .filter(Boolean) as ProseMirrorNode[]; // Step 7: Remove any null or invalid nodes resulting from previous steps.
  }

  // Step 8: If the input is a single ProseMirrorNode, wrap it in an array and process it.
  // This ensures that the function can handle both single nodes and arrays uniformly.
  return sanitizeTiptapContent([content]);
}
