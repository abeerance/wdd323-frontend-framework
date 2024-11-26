import { ArticleData } from "@/app/page";
import { TipTapViewer } from "@/components/tiptap/tiptap-viewer";
import Image from "next/image";

interface ArticleDataProps {
  data: ArticleData;
}

export function ArticleDetail({ data }: ArticleDataProps) {
  // we initialize the coverImage variable to null
  let coverImage = null;

  // if the cover_image is not null, we set the coverImage variable
  // to the pathname of the cover_image
  if (data.cover_image) {
    coverImage = data.cover_image.pathname;
  }

  return (
    <>
      <h1 className='text-2xl font-bold mb-3'>{data.title}</h1>
      {coverImage && (
        <div className='image-container'>
          <Image
            src={`${process.env.BACKEND_URL}/${coverImage}`}
            alt={data.cover_image.pathname}
            fill
            objectFit='cover'
          />
        </div>
      )}
      <TipTapViewer content={data.content} />
    </>
  );
}
