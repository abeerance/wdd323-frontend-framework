import dataFetch from "@/lib/data-fetch";

import { ArticleListPreview } from "./article-list-preview";

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

  return <ArticleListPreview articles={articles} />;
}
