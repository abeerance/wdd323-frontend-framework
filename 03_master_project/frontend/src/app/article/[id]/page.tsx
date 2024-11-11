import dataFetch from "@/lib/data-fetch";
import { ArticleDetail } from "./article-detail";
import { ArticleData } from "@/app/page";

// this is needed for the dynamic route so that we can fetch
// a single article from the backend
// with the help of an id which we will get from the router
async function getArticleDetail(id: number) {
  // here we call the dataFetch function from the lib
  // to get a single article from the backend
  return await dataFetch(`http://127.0.0.1:8000/api/articles?id=${id}`);
}

// the params are being fetched from the router
// in this example we are on the route http://localhost:3000/article/1
export default async function ArticlePage({ params }: { params: Promise<{ id: number }> }) {
  // here we await the id from the params
  // we need to await it, so there is no hydration error
  const { id } = await params;
  // here we call the getArticleDetail function to get the data
  // and we pass the destructured params to it -> id
  const data: ArticleData = await getArticleDetail(id);

  return (
    <div>
      <ArticleDetail data={data} />
    </div>
  );
}
