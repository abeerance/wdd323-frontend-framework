import ArticleList from "@/components/article-list/article-list";
import { ArticleListSkeleton } from "@/components/skeletons/article-list-skeleton";
import { Suspense } from "react";

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
  cover_image: {
    id: number;
    pathname: string;
  };
}

export default async function Home() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-10'>Our latest articles</h1>
      <div className='flex flex-col gap-6'>
        <Suspense fallback={<ArticleListSkeleton />}>
          <ArticleList />
        </Suspense>
      </div>
    </div>
  );
}
