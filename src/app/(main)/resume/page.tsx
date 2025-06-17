import React from "react";
import HeroSection from "./_components/hero-section";
import CVServices from "./_components/cvservices";
import CareerServices from "./_components/careerservices";
// import Empower from "./_components/empower";
// import Explore from "./_components/explore";
// import Template from "./_components/template";
export default async function ResumePage() {
  return (
    <div>
      <HeroSection />
      <CareerServices />
      <CVServices />

      {/* <Empower /> */}
      {/* <Explore /> */}
      {/* <Template /> */}
    </div>
  );
}
