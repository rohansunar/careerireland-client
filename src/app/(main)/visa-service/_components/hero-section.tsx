import Image from "next/image";

import React from "react";

const HeroSection = () => {
  return (
    <div className=" relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[770px] overflow-hidden">
      <Image
        src="/visa-service/image.png"
        fill
        className="object-cover object-left-top h-full w-full"
        alt="hero image"
      />

      <div className="absolute w-full h-full mt-5 sm::mt-0 ">
        <div className=" container h-full flex justify-center   flex-col gap-4 lg:gap-8">
          <h3 className="text-lg md:text-4xl lg:text-5xl text-white font-bold w-1/2">
            Explore visa options for working in Ireland
          </h3>
          <p className="text-xs md:text-lg  text-white w-[70%] lg:w-1/2">
            If you want to spend time working in Ireland you will need a work
            visa, the type of visa you may get will depend on how long you want
            to stay, it is likely that you will need to have an occupation that
            is on a skills shortage list.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
