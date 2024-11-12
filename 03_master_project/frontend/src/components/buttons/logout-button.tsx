"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Log out
    </button>
  );
};
