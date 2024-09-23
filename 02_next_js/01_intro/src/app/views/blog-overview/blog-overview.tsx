import { CardContent, CardFooter, CardHeader, ModularCard } from "../../../components/cards/cards";

const BlogArticle = [
  {
    title: "My first blog article",
    content: "this is the content of my first blog article",
    button: "Read more",
  },
  {
    title: "My second blog article",
    content: "this is the content of my second blog article",
    button: "Read more 2",
  },
];

export const BlogCardOverview = () => {
  return (
    <>
      {BlogArticle.map((blog) => (
        <ModularCard key={blog.title}>
          <CardHeader title={blog.title} />
          <CardContent>{blog.content}</CardContent>
          <CardFooter>
            <button>{blog.button}</button>
          </CardFooter>
        </ModularCard>
      ))}
    </>
  );
};
