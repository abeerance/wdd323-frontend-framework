import dataFetch from "@/lib/data-fetch";
import Link from "next/link";

// this is the interface for the article data
// this is exported, because we will need it in the dynamic route too
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

async function getArticle() {
  // here we call the dataFetch function from the lib
  // to get all the articles from the backend
  return await dataFetch("http://127.0.0.1:8000/api/articles");
}

export default async function Article() {
  // here we call the getArticle function to get the data
  const data: ArticleData[] = await getArticle();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* here we map over the data and render a link for each article */}
      {data.map((article) => (
        // here we use the Link component from next.js
        // this is a way to create a link to a dynamic route
        // this will route to the article/[id] page
        <Link key={article.id} href={`/articles/${article.id}`}>
          {article.title}
        </Link>
      ))}
    </div>
  );
}
