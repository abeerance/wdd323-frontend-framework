import { authConfig } from "@/auth";
import dataFetch, { dataFetchWithToken } from "@/lib/data-fetch";
import { getServerSession } from "next-auth";
import { ArticleData } from "../page";
import { PlusIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/buttons/link-button";

async function getUserArticles() {
  // get accessToken from the session
  const session = await getServerSession(authConfig);

  // if there is no session, early return
  if (!session) return;

  // get user from backend
  const user = await dataFetchWithToken(`${process.env.BACKEND_URL}/api/user`, session.accessToken);

  // get articles from current logged in user
  return await dataFetch(`${process.env.BACKEND_URL}/api/articles?user_id=${user.id}`);
}

export default async function ArticlesPage() {
  const data: ArticleData[] = await getUserArticles();

  return (
    <>
      <div className='flex justify-between mb-6'>
        <h1 className='text-3xl font-bold'>My Articles</h1>
        <LinkButton href={"/articles/create"}>
          Create a new article <PlusIcon />
        </LinkButton>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
        {data.map((article) => (
          <Card key={article.id} className='p-6 h-56'>
            <CardContent className='font-semibold'>{article.title}</CardContent>
          </Card>
        ))}
      </div>
    </>
  );

  // Beispiel mit einem Image fetch aus dem backend
  // return (
  //   <div>
  //     {data.map((article) => {
  //       return (
  //         <Fragment key={article.id}>
  //           {article.cover_image.pathname && (
  //             <Image
  //               src={`${process.env.BACKEND_URL}/${article.cover_image.pathname}`}
  //               alt=''
  //               height={400}
  //               width={200}
  //             />
  //           )}
  //         </Fragment>
  //       );
  //     })}
  //   </div>
  // );
}
