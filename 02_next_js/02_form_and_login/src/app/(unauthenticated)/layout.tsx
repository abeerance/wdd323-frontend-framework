import { ReactNode } from "react";

export default function UnauthenticatedLayout({ children }: { children: ReactNode }) {
  return <div className='h-screen w-full flex items-center justify-center'>{children}</div>;
}
