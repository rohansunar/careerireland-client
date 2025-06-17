import { programPedagogyPoints } from "@/util/data";
import Image from "next/image";
import React from "react";

const ProgramPedagogy = () => {
  return (
    <div
      className="container h-full lg:min-h-2 py-10  w-full flex-col flexCenter gap-10"
      id="program-pedagogy"
    >
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center w-full">
        Program Pedagogy
      </h3>

      <div
        className="
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4
      "
      >
        {programPedagogyPoints.map((item, i) => (
          <ProgramPedagogyCard
            key={i}
            icon={item.icon}
            desc={item.desc}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramPedagogy;

const ProgramPedagogyCard = ({
  icon,
  desc,
  title,
}: {
  icon: string;
  desc: string;
  title: string;
}) => {
  return (
    <>
      <div className="rounded-lg p-3 flex flex-col  gap-4 items-start h-full border border-gorgonzolaBlue">
        <div className="h-10 w-10 relative">
          <Image
            src={icon}
            alt="icon"
            fill
            className=" w-full object-contain h-full"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <h3 className="text-base lg:text-base font-bold text-left">
            {title}
          </h3>
          <p className="text-sm text-left">{desc}</p>
        </div>
      </div>
    </>
  );
};
