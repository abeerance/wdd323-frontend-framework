import { ArticleData } from "@/app/page";

interface ArticleDataProps {
  data: ArticleData;
}

export function ArticleDetail({ data }: ArticleDataProps) {
  return (
    <>
      <h1 className='text-2xl font-bold mb-3'>{data.title}</h1>
      <p>{data.content}</p>
    </>
  );
}
