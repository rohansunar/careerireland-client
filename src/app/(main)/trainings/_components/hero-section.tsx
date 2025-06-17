import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className=" relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[770px]">
      <Image
        src="/trainings/hero.png"
        fill
        className="object-cover h-full w-full"
        alt="hero image"
      />
      <div className="absolute top-0 bg-gradient-to-b from-black/60 to-transparent w-full h-full  " />

      <div className="absolute w-full h-full mt-5 sm::mt-0 ">
        <div className="w-full container h-full flex justify-center  flex-col gap-4 lg:gap-8">
          <h3 className="text-xl md:text-4xl lg:text-5xl text-white font-bold">
            Grow Your Skills With Our <br />
            Training Programs
          </h3>

          <div className="w-full flex items-center gap-3 text-white ">
            <Link
              href="/contact-us"
              className="bg-gorgonzolaBlue rounded p-2 text-sm lg:text-base"
            >
              Contact Us
            </Link>
            <a
              href="https://supabase.careerireland.com/storage/v1/object/public/careerireland-prod/brochure/1738582862267_Business-Analyst-Training-Program-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-sm lg:text-base border rounded bg-red-500 hover:bg-white/10 transition-colors"
            >
              Download Brochure
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
