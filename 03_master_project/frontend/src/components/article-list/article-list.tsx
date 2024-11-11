import dataFetch from "@/lib/data-fetch";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArticleData } from "@/app/page";

// simulate delay funciton
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getArticles() {
  // here we simulate a delay of 2 second
  await delay(2000);

  // here we call the dataFetch function from the lib
  // to get all the articles from the backend
  return await dataFetch("http://127.0.0.1:8000/api/articles");
}

export default async function ArticleList() {
  const articles = await getArticles();

  return (
    <>
      {articles.map((article: ArticleData) => (
        // here we use the Link Component from next.js
        // to enable routing whenever we click on an article
        <Link key={article.id} href={`/article/${article.id}`} className='w-full'>
          <Card>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>{article.content}</CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
