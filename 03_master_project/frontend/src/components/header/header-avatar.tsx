"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogoutButton } from "../buttons/logout-button";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

export const HeaderAvatar = () => {
  // here we get the session and status from the useSession hook
  const { data: session, status } = useSession();

  // if the session is loading, we show a skeleton
  if (status === "loading") {
    return <Skeleton className='w-10 h-10 rounded-full' />;
  }

  // if there is no session show the login button
  return session === null ? (
    <Link
      href={"/session"}
      className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8'
    >
      Log in <MoveUpRight />
    </Link>
  ) : (
    // if there is a session, show the my articles link and the avatar
    <>
      <Link href={"/articles"}>My Articles</Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
