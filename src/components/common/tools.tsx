import Image from "next/image";
import React from "react";

const Tools = () => {
  const tools = [
    {
      name: "Jira Software",
      image: "/trainings/jira.png",
    },
    {
      name: "MS Project",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/MS_Project_Logo.png/640px-MS_Project_Logo.png",
    },
    {
      name: "MS Excel",
      image: "/trainings/excel.png",
    },
    {
      name: "Mural",
      image: "/trainings/mural.png",
    },
    {
      name: "Visio",
      image: "/trainings/visio.png",
    },
  ];
  return (
    <div className="bg-[#F7F7F7] " id="tools">
      <div className="md:container py-3 flex flex-col md:flex-row justify-between items-center gap-3 px-3 ">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center lg:text-left w-full">
          Tools you{"'"}ll learn
          <br />
          <span className="font-normal">in BA Training program </span>
        </h3>

        <div className="grid grid-cols-5 gap-5 w-full overflow-x-scroll scrollbar scrollbar-h-0">
          {tools.map((tool, i) => (
            <div
              key={i}
              className=" p-3 flexStart flex-col  gap-4  h-full w-full"
            >
              <div className="h-16 w-16 relative">
                <Image
                  src={tool.image}
                  alt="icon"
                  fill
                  className=" w-full object-contain h-full"
                  unoptimized
                />
              </div>

              <h3 className="text-base lg:text-base  text-center ">
                {tool.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
