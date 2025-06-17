import Image from "next/image";
import React from "react";

const Empower = () => {
  return (
    <div className="container bg-[#E3E4F8] rounded-lg  h-full   w-full grid grid-cols-1 md:grid-cols-2  gap-10 py-10">
      <div className="w-full flex flex-col items-center justify-center gap-3 ">
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold">
          Empower your professional journey
        </h3>

        <p className="text-gorgonzolaBlue text-base text-center md:text-left w-full">
          Career
        </p>

        <p className="text-gray-600 text-sm text-center md:text-left">
          With our tailored support services. Elevate your career through expert
          guidance, confidence-building, and strategic navigation. Unlock
          opportunities, build a solid foundation, and navigate the complexities
          of the job market. Your path to success begins here, where
          personalized support meets unlimited potential for professional growth
          and achievement.
        </p>
      </div>

      <div className="  h-full flex justify-center  flex-col order-1 md:order-2 ">
        <div className="h-[150px] w-full md:h-[360px] md:w-[360px] lg:h-[400px] lg:w-full relative">
          <Image
            src="/resume/empower.png"
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

export default Empower;
