import Image from "next/image";
import React from "react";

const CountCard = ({
  count,
}: {
  count: {
    value: number;
    image: string;
    symbol: string;
    desc: string;
  };
}) => {
  return (
    <div className="flex  gap-3 items-center">
      <div className="h-10 w-10 relative">
        <Image
          src={count.image}
          fill
          className="object-contain h-full w-full"
          alt="count image"
          unoptimized
        />
      </div>

      <div className="flex flex-col gap-1 ">
        <h3 className="text-5xl font-bold text-preciousPersimmon">
          {count.value}
          <span className="ml-1 text-xl">{count.symbol}</span>
        </h3>

        <p className="text-sm text-gray-600 w-36">{count.desc}</p>
      </div>
    </div>
  );
};

export default CountCard;
