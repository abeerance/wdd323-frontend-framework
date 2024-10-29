import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "// DevLab",
  description:
    "Devlab’s Frontend Development platform empowers aspiring and seasoned developers to master the latest tools and technologies in web development. Offering hands-on courses, interactive coding challenges, and real-world projects, Devlab brings a practical approach to learning. Whether you’re diving into HTML, CSS, JavaScript, TypeScript or mastering framework like React and Next.js, Devlab’s expert-led modules and supportive community will guide you every step of the way. Start building your frontend expertise with Devlab and transform your skills into career-ready capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased p-16`}
      >
        {children}
      </body>
    </html>
  );
}
