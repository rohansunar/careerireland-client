import React from "react";
import InfoNavbar from "@/components/globals/info-nav";
import Footer from "@/components/globals/footer";
import Navbar from "@/components/globals/navbar";
import Cookies from "@/components/common/cookies";
import MaintenancePage from "./maintenance/maintenance";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.MAINTENANCE_MODE === "true") {
      return <MaintenancePage />;
    }
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
