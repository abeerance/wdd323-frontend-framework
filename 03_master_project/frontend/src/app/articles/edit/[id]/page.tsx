// this is needed for the dynamic route so that we can fetch
// a single article from the backend

import { ArticleData } from "@/app/page";
import { authConfig } from "@/auth";
import { EditArticle } from "@/components/edit-article/edit-article";
import dataFetch, { dataFetchWithToken } from "@/lib/data-fetch";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

// with the help of an id which we will get from the router
async function getArticleDetail(id: number) {
  // here we call the dataFetch function from the lib
  // to get a single article from the backend
  return await dataFetch(`http://127.0.0.1:8000/api/articles?id=${id}`);
}

// here we get the current logged in user
async function getCurrentUser() {
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return null;
  }

  return await dataFetchWithToken(`${process.env.BACKEND_URL}/api/user`, session.accessToken);
}

export default async function EditArticlePage({ params }: { params: Promise<{ id: number }> }) {
  // here we await the id from the params
  // we need to await it, so there is no hydration error
  const { id } = await params;
  // here we call the getArticleDetail function to get the data
  // and we pass the destructured params to it -> id
  const data: ArticleData = await getArticleDetail(id);

  // here we get the current user
  const user = await getCurrentUser();

  return user.id === data.user_id ? <EditArticle data={data} /> : notFound();
}