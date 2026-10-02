import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight, TikTok_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const tiktokSans = TikTok_Sans({
  variable: "--font-tiktok-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rivet",
  description: "Better introductions, brought to you by people",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${interTight.variable} ${tiktokSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
