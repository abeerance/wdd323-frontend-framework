import ArticleList from "@/components/article-list/article-list";
import ArticleList2 from "@/components/article-list/article-list2";
import { Suspense, use } from "react";

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  user_id: number;
  image_id: number;
  created_at: string;
  updated_at: string;
  tags: string[];
  coverImageId: string | null;
}

export default async function Home() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-3'>Not inside the Suspense Boundary</h1>
      <Suspense
        fallback={<div className='w-full h-full flex items-center justify-center'>Loading...</div>}
      >
        <ArticleList />
      </Suspense>
      <Suspense
        fallback={
          <div className='w-full h-full flex items-center justify-center'>Loading... article 2</div>
        }
      >
        <ArticleList2 />
      </Suspense>
    </div>
  );
}
