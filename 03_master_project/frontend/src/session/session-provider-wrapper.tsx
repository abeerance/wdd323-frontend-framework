"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface SessionProviderWrapperProps {
  session: Session;
  children: React.ReactNode;
}

export const SessionProviderWrapper = ({ session, children }: SessionProviderWrapperProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
