import { ReactNode } from "react";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <nav className='h-12 w-full bg-purple-600 text-white font-bold'>meine navigation</nav>
      {children}
    </main>
  );
}
