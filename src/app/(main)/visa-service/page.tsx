import React from "react";
import HeroSection from "./_components/hero-section";
import Features from "./_components/features";
import Packages from "./_components/packages";
import Info from "./_components/info";
import ImmigrationServices from "./_components/immigration-services"; // Import new component

const VisaServicePage = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <Packages />
      <ImmigrationServices />
      <Info />
    </div>
  );
};

export default VisaServicePage;
