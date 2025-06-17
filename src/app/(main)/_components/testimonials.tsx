"use client";

import React from "react";
import TestimonialCard from "@/components/cards/testimonial-card";
import Link from "next/link";
import Image from "next/image";

const Testimonials = ({ reviews }: { reviews: IGoogleReview[] }) => {
  return (
    <section
      className="py-[100px] mb-[100px] md:max-w-[84rem] mx-auto px-6"
      aria-labelledby="testimonials-title"
    >
      <h2
        id="testimonials-title"
        className="text-center text-2xl font-bold mb-[5rem]"
      >
        GOOGLE REVIEWS FROM OUR CLIENTS
      </h2>

      {/* Parent Flex Container for Alignment */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left Section: Rating Overview */}
        <div className="w-full md:w-1/6 flex flex-col items-center md:items-start md:justify-center md:pt-6">
          <h3 className="text-3xl font-bold text-center md:text-left">
            EXCELLENT
          </h3>
          <div className="flex items-center text-2xl mt-2">⭐⭐⭐⭐⭐</div>
          <p className="text-gray-600 text-md mt-1 text-center md:text-left">
            Based on <span className="font-bold">502 reviews</span>
          </p>
          <Image
            src="/home/google-logo.svg"
            alt="Google"
            width={84}
            height={84}
            className="mt-[1rem] h-10 w-[7rem]"
          />
        </div>

        {/* Right Section: Scrolling Testimonials */}
        <div className="w-full md:w-5/6 overflow-x-auto py-6 scrollbar scrollbar-thumb-[#404BD0] scrollbar-thumb-rounded-lg scrollbar-h-2">
          <div className="flex space-x-8">
            {reviews.map((review, index) => (
              <div
                key={`${review.author_name}-${index}`}
                className="flex-shrink-0 w-full sm:w-96"
              >
                <TestimonialCard testimonial={review} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Reviews Button */}
      <div className="flex justify-center mt-8">
        <Link
          href="https://www.google.com/search?q=career+ireland&rlz=1C5CHFA_enIN1060IN1060&oq=career+i&aqs=chrome.0.69i59j69i57j69i59j69i64j69i60l3.1447j0j7&sourceid=chrome&ie=UTF-8#lrd=0x48670dc6858c0ccd:0xffb2c5df54294c1,1,,,,"
          className="text-blue-500"
          target="_blank"
        >
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            View All Reviews
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;
