import { Skeleton } from "../ui/skeleton";

export const ArticleListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className='w-full h-32' />
      ))}
    </>
  );
};
