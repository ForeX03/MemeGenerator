import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meme generator",
  description: "Simple meme generator",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="antialiased w-full h-full">
        { children }
        <div className="absolute">ForeX03</div>
      </body>
    </html>
  );
}
