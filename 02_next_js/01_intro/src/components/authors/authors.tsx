import { CardContent, CardFooter, CardHeader, ModularCard } from "../cards/cards";

interface Author {
  authorName: string;
  biography: string;
  email: string;
}

export const Authors = ({ authorName, biography, email }: Author) => {
  return (
    <ModularCard>
      <CardHeader title={authorName} />
      <CardContent>{biography}</CardContent>
      <CardFooter>
        <button>{email}</button>
      </CardFooter>
    </ModularCard>
  );
};
