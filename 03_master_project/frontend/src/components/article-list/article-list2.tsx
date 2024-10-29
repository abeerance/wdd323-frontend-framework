import dataFetch from "@/lib/data-fetch";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card/card";
import { ArticleData } from "@/app/page";

// simulate delay funciton
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getArticles() {
  // here we simulate a delay of 2 second
  await delay(5000);

  // here we call the dataFetch function from the lib
  // to get all the articles from the backend
  return await dataFetch("http://127.0.0.1:8000/api/articles");
}

export default async function ArticleList2() {
  const articles = await getArticles();

  return (
    <div className='flex flex-col items-center justify-center gap-6'>
      {articles.slice(0, 3).map((article: ArticleData) => (
        // here we use the Link Component from next.js
        // to enable routing whenever we click on an article
        <Link key={article.id} href={`/article/${article.id}`} className='w-full max-w-[400px] '>
          <Card>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>{article.content}</CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
