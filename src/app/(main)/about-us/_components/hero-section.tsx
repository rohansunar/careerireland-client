import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className=" relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[770px]">
      <Image
        src="/about-us/hero.jpeg"
        fill
        className="object-cover h-full w-full"
        alt="hero image"
      />
      <div className="absolute top-0 bg-gradient-to-b from-black/60 to-transparent w-full h-full  " />

      <div className="absolute w-full h-full  ">
        <div className="w-full container h-full flex justify-center  flex-col gap-4 lg:gap-8">
          <h3 className="text-xl md:text-4xl lg:text-5xl text-white font-bold">
            Grow Your Skills With <br />
            Career Ireland
          </h3>

          <div className="w-full flex items-center gap-3 text-white ">
            <Link href="/contact-us" className="bg-gorgonzolaBlue rounded">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
