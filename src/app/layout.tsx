import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./components/appProvider";

const oswald = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geo Game",
  description: "Simple game to guess a place in Belarus"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en">
        <body className={oswald.className}>{children}</body>
      </html>
    </AppProvider>
  );
}
