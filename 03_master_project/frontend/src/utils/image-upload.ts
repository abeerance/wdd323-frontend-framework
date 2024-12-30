import { toast } from "sonner";

export const uploadImage = async ({
  file,
  title,
  maxFileSizeMb = 8,
  endpoint = "/api/upload-image",
}: {
  file: File;
  title: string;
  maxFileSizeMb?: number;
  endpoint?: string;
}) => {
  if (!file) {
    toast.error("No file selected for upload", { position: "bottom-center" });
    return null;
  }

  const fileSizeMb = file.size / (1024 * 1024);

  if (fileSizeMb > maxFileSizeMb) {
    toast.error(
      `The image file size exceeds the maximum limit of ${maxFileSizeMb} MB. Please upload a smaller image`,
      {
        position: "bottom-center",
      }
    );
    throw new Error("Image file size exceeds the maximum limit");
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("files[]", file);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Image upload failed", { position: "bottom-center" });
      throw new Error(data.message || "Image upload failed");
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to upload image", { position: "bottom-center" });
    return null;
  }
};
