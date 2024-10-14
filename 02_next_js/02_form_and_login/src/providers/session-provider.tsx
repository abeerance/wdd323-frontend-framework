"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
