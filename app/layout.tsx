import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OP.GG Clone MVP - Stats",
  description: "League of Legends Player Statistics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} dark antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
