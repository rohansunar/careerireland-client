import React from "react";
import InfoNavbar from "@/components/globals/info-nav";
import Footer from "@/components/globals/footer";
import Navbar from "@/components/globals/navbar";
import Cookies from "@/components/common/cookies";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <InfoNavbar />
      <Navbar />
      <div>{children}</div>
      <Footer />
      <Cookies />
    </main>
  );
}
