import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Header } from "./ui/Header";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Public Goods Club",
  description: "Doing Good Different",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <ThirdwebProvider>
          <ThemeProvider attribute="class">
            <main className="flex-grow bg-background-light dark:bg-background-dark">
              <Header />
              {children}
            </main>
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
