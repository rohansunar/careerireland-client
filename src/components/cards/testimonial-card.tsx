"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: GoogleReview }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const TEXT_LIMIT = 120;
  const needsTruncation = testimonial.text.length > TEXT_LIMIT;
  const displayText = isExpanded
    ? testimonial.text
    : needsTruncation
      ? `${testimonial.text.slice(0, TEXT_LIMIT)}...`
      : testimonial.text;

  return (
    <div className="h-full p-6 border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-gray-50 group ">
      <div className="flex items-start gap-4 mb-6">
        <div className="relative shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
          <Image
            src={testimonial.profile_photo_url}
            alt={`${testimonial.author_name}'s profile`}
            width={56}
            height={56}
            className="relative rounded-full object-cover border-2 border-white"
            loading="lazy"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {testimonial.author_name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 fill-current ${index < testimonial.rating ? "text-amber-400" : "text-gray-300"}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-500">
              {testimonial.rating}/5
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {testimonial.relative_time_description}
          </p>
        </div>
      </div>
      <div className="relative">
        <p className="text-gray-600 leading-relaxed">{displayText}</p>
        {needsTruncation && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
