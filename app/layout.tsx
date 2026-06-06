import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family-base",
});

export const metadata: Metadata = {
  title: "DoD Business Portal",
  description: "U.S. Department of Defense Business Registration Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[var(--color-bg-page)]">
        {children}
      </body>
    </html>
  );
}