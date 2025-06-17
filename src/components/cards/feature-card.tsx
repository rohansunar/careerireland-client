import React from "react";

const FeatureCard = ({
  title,
  desc,
  i,
}: {
  title: string;
  desc: string;
  i: number;
}) => {
  return (
    <div
      key={i}
      className={`flex flex-col items-center justify-center gap-8 text-white p-7
            ${i % 2 === 0 ? "bg-[#202674]" : "bg-[#404BD0]"}
        `}
    >
      <h3 className="text-lg lg:text-2xl font-semibold text-left w-full">
        {title}
      </h3>
      <p className="text-sm ">{desc}</p>
    </div>
  );
};

export default FeatureCard;
