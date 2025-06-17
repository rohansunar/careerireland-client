"use client";
import { templates } from "@/util/data";
import Image from "next/image";
import React, { useState } from "react";

const Template = () => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  const handleTemplateClick = (index: number) => {
    setSelectedTemplateIndex(index);
  };
  return (
    <div className="container h-full  py-14  flex flex-col gap-10 items-center justify-center  w-full">
      <h3 className="text-2xl md:text-4xl lg:text-4xl text-center ">
        Start by selecting a <br /> resume template design
      </h3>

      <div className="flex items-center gap-10  w-full justify-between overflow-x-auto scrollbar scrollbar-h-0">
        {templates.map((template, index) => (
          <div
            className="bg-[#E3E4F8] p-3 rounded-lg"
            key={index}
            style={{
              transform: `translateX(${-selectedTemplateIndex * 330}px)`,
              transition: "all 0.5s   ease-in-out",
            }}
          >
            <div
              key={index}
              className="w-[330px] h-[450px]  rounded-lg relative flex flex-col items-center justify-center gap-1 "
            >
              <Image
                src={template.img}
                alt={template.name}
                fill
                className="object-contain p-4"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* pagination of carousel */}

      <div className="flex items-center gap-3">
        {templates.map((template, index) => (
          <div
            onClick={() => handleTemplateClick(index)}
            key={index}
            className={`
            w-3 h-3 rounded-full cursor-pointer
            ${selectedTemplateIndex === index ? "bg-gorgonzolaBlue" : "bg-gray-300"}
          `}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Template;
