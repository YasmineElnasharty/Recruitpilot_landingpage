import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RecruitPilot AI - Recruitment Made Simple",
  description: "AI-powered recruitment platform that cuts through the crap. Upgrade your tools and hire like a pro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#111111] text-white">
        {children}
      </body>
    </html>
  );
}
