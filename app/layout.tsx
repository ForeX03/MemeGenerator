import type { Metadata } from "next";
import "./globals.css";
import {FaCode, FaGithub} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Meme generator",
  description: "Simple meme generator",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="relative antialiased w-full h-full">
        { children }
        <div className="absolute z-50 text-gray-300 bottom-3 left-3 flex flex-row gap-3 items-center">
            <a className="hover:text-neutral-400 active:text-neutral-500 transition-colors cursor-pointer" href="https://github.com/ForeX03/"><FaGithub size={25} /></a>
            <a className="hover:text-neutral-400 active:text-neutral-500 transition-colors cursor-pointer" href="https://github.com/ForeX03/MemeGenerator"><FaCode size={25} /></a>
        </div>
      </body>
    </html>
  );
}
