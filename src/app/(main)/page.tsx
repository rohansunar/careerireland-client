import React from "react";
import HeroSection from "./_components/hero-section";
import Brands from "@/components/common/brands";
import ReasonsToJoin from "./_components/reasons";
import Packages from "./_components/packages";
import Mentors from "@/components/common/mentors";
import SignOut from "@/components/common/sign-out";
import FeaturesSection from "./_components/feature-section";

export default async function Home() {
  // const reviews = await getGoogleReviews();

  return (
    <div className="">
      <SignOut />
      <HeroSection />
      <FeaturesSection />
      <Packages />
      <Mentors />
      <Brands />
      <ReasonsToJoin />
      {/* <Testimonials reviews={reviews} /> */}
    </div>
  );
}
