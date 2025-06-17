import Image from "next/image";
// import { Link } from 'react-router-dom'
import React from "react";

const Explore = () => {
  return (
    <div className="container h-full lg:min-h-screen py-14 flex flex-col items-center justify-center  w-full">
      <h3 className="text-xl md:text-4xl lg:text-5xl font-bold">
        Explore a World of Career Support at Career Ireland!
      </h3>

      <div className=" grid grid-cols-1 sm:grid-cols-2 sm:py-10 gap-10">
        <div className="  h-full flex justify-center items-center mt-5 sm:mt-0 flex-col  ">
          <div className="h-[200px] w-full md:h-[360px] md:w-full lg:h-[400px] lg:w-full relative">
            <Image
              src="/resume/explore.png"
              fill
              className="object-contain h-full w-full rounded-lg"
              alt="hero image"
              unoptimized
            />
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center justify-center">
          <p className="text-gray-600 text-xs sm:text-sm text-center md:text-left sm:leading-relaxed">
            Our array of career services is crafted to empower professionals at
            every stage. From honing your CV to perfection, ensuring it reflects
            your accomplishments and potential, to personalized coaching
            sessions and mock interviews designed to boost your confidence and
            interview skills. At Career Ireland, we understand the nuances of
            the job market and offer guidance that{"'"}s tailored to your needs.
            Whether you{"'"}re a seasoned expert seeking new horizons or a
            recent graduate navigating the job landscape, our services provide a
            solid foundation for your career journey. Let us guide you toward a
            future filled with opportunities and professional growth.
          </p>

          {/* <div className="w-full flex items-center justify-center md:justify-start">
            <Link
              href="/"
              className="bg-preciousPersimmon  rounded-full text-white px-4 p-3 text-sm lg:text-base  text-center"
            >
              Build Resume
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Explore;
