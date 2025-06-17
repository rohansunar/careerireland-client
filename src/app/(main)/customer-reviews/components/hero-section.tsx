"use client";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
      <Image
        src="/review.jpeg"
        fill
        className="object-cover h-full w-full"
        alt="Customer Reviews"
        priority
        unoptimized
      />
    </div>
  );
};

export default HeroSection;
