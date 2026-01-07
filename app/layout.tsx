import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/app/providers";
import './globals.css';
import SidebarPage from "./sidebars/SidebarSection";

export const metadata: Metadata = {
  title: "Wing TaskFlow",
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
          <SidebarPage>
            <div className="flex min-h-screen w-full">{children}</div>
          </SidebarPage>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
