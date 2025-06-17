import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
      <Image
        src="/blogs/hero.jpeg"
        fill
        className="object-cover h-full w-full"
        alt="hero image"
        priority
      />
    </div>
  );
};

export default HeroSection;
