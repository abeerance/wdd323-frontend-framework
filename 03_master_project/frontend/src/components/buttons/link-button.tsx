import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
}

export const LinkButton = ({ href, children, className }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8",
        className
      )}
    >
      {children}
    </Link>
  );
};
