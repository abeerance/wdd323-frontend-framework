import Link from "next/link";
import { HeaderAvatar } from "./header-avatar";

export const Header = () => {
  return (
    <header className='border-b border-black w-full h-20 px-16 flex items-center justify-between'>
      <Link href={"/"}>DevLab</Link>
      <div className='flex items-center gap-6'>
        <Link href={"/about"}>About</Link>
        <HeaderAvatar />
      </div>
    </header>
  );
};
