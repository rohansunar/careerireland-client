import React from "react";
import BoostImage from "@/public/home/boost.png";
import Image from "next/image";
import Button from "@/components/cta/Button";

interface BadgeProps {
  color: string;
  text: string;
}

const Badge = ({ color, text }: BadgeProps) => {
  return (
    <div className={`${color} text-white rounded-lg p-3 text-sm`}>{text}</div>
  );
};

const Boost = () => {
  return (
    <div className="container h-full lg:h-screen py-20 lg:py-5 ">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center h-full">
        <div className="relative w-full h-[270px]  lg:h-[500px] ">
          <Image
            src={BoostImage}
            fill
            className="object-contain h-full w-full px-5"
            alt="hero image"
          />
          <div className="absolute w-full h-full  flex flex-col  justify-between">
            <div className="absolute  right-0 top-4 lg:top-5 lg:right-0 w-32 text-center">
              <Badge color="bg-[#FF783E]" text="CV Templates" />
            </div>
            <div className="absolute top-1/2 right-0 w-32 text-center">
              <Badge color="bg-[#2B2B2B]" text="CV Analyser" />
            </div>
            <div className="absolute top-1/2 left-0 w-32 text-center">
              <Badge color="bg-[#404BD0]" text="Targeted CVs" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 lg:gap-8">
          <h3 className="uppercase text-foreground/60 text-xl lg:text-3xl">
            BOOST YOUR CAREER CHASING
          </h3>

          <h4 className="font-bold text-lg lg:text-3xl">
            Land your dream job with already made{" "}
            <span className="text-preciousPersimmon">Eye catchy Resumes.</span>
          </h4>

          <p className="text-sm lg:text-base">
            Create awesome resumes with one of our template in just few seconds.
          </p>

          <Button text="Resume & CV" link="/resume" />
        </div>
      </div>
    </div>
  );
};

export default Boost;
