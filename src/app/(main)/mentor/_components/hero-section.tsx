import React from "react";

import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="container h-full  py-14  w-full grid grid-cols-1 sm:grid-cols-2  gap-10">
      <div className="w-full  h-full flex  justify-start md:justify-center  flex-col gap-5 lg:gap-8 order-2 sm:order-1">
        <h3 className="text-2xl md:text-4xl lg:text-6xl">
          Mentors for your professional journey
        </h3>
        <p className="text-xs md:text-lg lg:text-xl">
          With our tailored support services. Elevate your career through expert
          guidance, confidence-building, and strategic navigation. Unlock
          opportunities, build a solid foundation, and navigate the complexities
          of the job market.
        </p>

        <div className="w-full">
          <Link
            href="/"
            className="  rounded-full button p-2 text-sm lg:text-base  text-center"
          >
            Build Resume
          </Link>
        </div>
      </div>

      <div className="  h-full flex justify-center items-center mt-5 sm:mt-0 flex-col order-1 sm:order-2 ">
        <div className="h-[250px] w-[250px] md:h-[360px] md:w-[360px] lg:h-[550px] lg:w-[550px] relative">
          <Image
            src="/resume/hero.png"
            fill
            className="object-contain h-full w-full rounded-lg"
            alt="hero image"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
