import dataFetch from "@/lib/data-fetch";
import { ArticleData } from "../page";

async function getArticleDetail(id: number) {
  // here we call the dataFetch function from the lib
  // to get a single article from the backend
  return await dataFetch(`http://127.0.0.1:8000/api/articles?id=${id}`);
}

// params are always after the host server
// this means, for example http://localhost:3000/article/1
// the params will be {id: 1}
export default async function Article({ params }: { params: { id: number } }) {
  // here we call the getArticleDetail function to get the data
  // and we pass the destructured params to it -> id
  const data: ArticleData = await getArticleDetail(params.id);

  // now that we have the data from the backend of a single article
  // we can render it the way we want it to
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p>created by {data.user_id}</p>
    </div>
  );
}
