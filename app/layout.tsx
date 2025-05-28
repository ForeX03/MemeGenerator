import type { Metadata } from "next";
import "./globals.css";
import { FaGithub } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Meme generator",
  description: "Simple meme generator",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="relative antialiased w-full h-full">
        { children }
        <div className="absolute z-50 text-gray-300 bottom-2 left-2 flex flex-row gap-2">
            <p>Created by ForeX03</p>
            <a href="https://github.com/ForeX03/MemeGenerator"><FaGithub size={30} /></a>
        </div>
      </body>
    </html>
  );
}
