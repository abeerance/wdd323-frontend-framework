import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import { Session } from "next-auth";
import { SessionProviderWrapper } from "@/session/session-provider-wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DevLab",
  description:
    "Devlab’s Frontend Development platform empowers aspiring and seasoned developers to master the latest tools and technologies in web development. Offering hands-on courses, interactive coding challenges, and real-world projects, Devlab brings a practical approach to learning. Whether you’re diving into HTML, CSS, JavaScript, TypeScript or mastering framework like React and Next.js, Devlab’s expert-led modules and supportive community will guide you every step of the way. Start building your frontend expertise with Devlab and transform your skills into career-ready capabilities.",
};

export default function RootLayout({
  children,
  // modal is needed here for the parallel route, so that we can render the modal in the layout
  modal,
  session,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  session: Session;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased min-h-screen flex flex-col`}
      >
        <SessionProviderWrapper session={session}>
          <Header />
          <div className='flex-grow px-16 py-10'>
            {children}
            {modal}
          </div>
          <Footer />
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
