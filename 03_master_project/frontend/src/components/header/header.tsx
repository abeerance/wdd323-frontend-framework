import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className='border-b border-black w-full h-20 px-16 flex items-center justify-between'>
      <Link href={"/"}>DevLab</Link>
      <div className='flex items-center gap-6'>
        <Link href={"/articles"}>Articles</Link>
        <Link href={"/articles"}>About</Link>
        <Link
          href={"/session"}
          className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8'
        >
          Log in <MoveUpRight />
        </Link>
      </div>
    </header>
  );
};
