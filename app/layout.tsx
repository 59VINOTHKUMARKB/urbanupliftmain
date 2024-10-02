"use client";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from './components/Sidebar';
import Header from "./components/Header";
import { useState } from "react";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

 {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 bg-white shadow">
            <Header setIsMobileMenuOpen={setIsMobileMenuOpen}/>
          </header>
          <aside className="sticky top-16 w-full bg-gray-200 z-10"> {/* Adjust top based on Header height */}
            <Sidebar />
          </aside>
          <main className="flex-1 p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
