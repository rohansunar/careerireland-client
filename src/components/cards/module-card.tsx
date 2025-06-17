import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import React from "react";
interface TModule {
  i: number;
  title: string;
  desc: string;
  image: string;
  points: string[];
  id: string;
  link: string;
}

const ModuleCard = ({ module, type }: { module: TModule; type: string }) => {
  const isOddIndex = module.i % 2 !== 0;

  return (
    <div
      className="container h-full  py-10  w-full flex-col flexCenter gap-10"
      id={module.id}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
        <div
          className={`w-full h-full flex flex-col gap-6
        ${isOddIndex ? "sm:order-1" : ""}
        `}
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-left w-full">
            {module.title}
          </h3>
          <p className=" text-sm lg:text-base text-left w-full">
            {module.desc}
          </p>
          <div className="space-y-4">
            {module.points.map((point: string, i: number) => (
              <div className="flex items-center gap-2" key={i}>
                <CheckCircle2
                  size={24}
                  className="text-white"
                  fill={type === "visa-info" ? "#404BD0" : "#757575"}
                />
                <p className="text-sm w-full text-[#757575]">{point}</p>
              </div>
            ))}

            {/* <Link 
  href="/visa-service#packages" 
  className="inline-block px-4 py-2 bg-[#404BD0] text-white rounded-md hover:bg-[#3038A0] transition-colors"
>
  View Packages
</Link> */}
          </div>

          {/* <div className="w-full mt-5">
            <Link
              href={module.link}
              className={`
            ${type === "visa-info" ? "bg-[#404BD0] " : "bg-[#757575]"}
             text-white rounded `}
            >
              View Plans
            </Link>
          </div> */}
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="h-[250px] w-full lg:h-full relative ">
            <Image
              src={module.image}
              alt="module"
              fill
              className="object-cover rounded-xl"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
