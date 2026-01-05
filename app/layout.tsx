import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers> 
        
          
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
