import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { noto } from "@/util/font";
import NextAuthProvider from "@/provider/next-auth";
import TanStackProvider from "@/provider/tanstack";

export const metadata: Metadata = {
  title: "Career Ireland",
  description:
    "Career Ireland - Your gateway to immigration and career services.",
  icons: ["/logo.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${noto.variable} font-noto`}>
        <NextAuthProvider>
          <TanStackProvider>
            {children}
            <Toaster position={"top-center"} />
          </TanStackProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
