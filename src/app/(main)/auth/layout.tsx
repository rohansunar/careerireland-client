import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login | Career Ireland",
  description: "Career Ireland - Login to your account.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {children}
    </div>
  );
}
