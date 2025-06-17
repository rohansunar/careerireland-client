import { brands } from "@/util/data";
import Image from "next/image";
import React from "react";

const Brands = () => {
  return (
    <div className="container flex flex-col space-y-10 mb-[5rem] py-10">
      <p className="font-semibold text-lg lg:text-2xl text-center ">
        Brands where our mentees are employed
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8">
        {brands.map((brand, i) => (
          <div className="w-full h-10 lg:w-full lg:h-[80px]  relative" key={i}>
            <Image
              key={i}
              src={brand.logo}
              fill
              className="object-contain "
              unoptimized
              alt={brand.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
