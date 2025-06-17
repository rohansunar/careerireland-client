import Image from "next/image";
import React from "react";

const WhoCanJoin = () => {
  const whoCanJoin = [
    {
      icon: "/trainings/hat.svg",
      desc: "Begin your journey with core concepts and foundational knowledge",
    },
    {
      icon: "/trainings/headphones.svg",
      desc: "Any graduates from commerce, science and engineering streams",
    },
    {
      icon: "/trainings/people.svg",
      desc: "Freshers from any stream with good Analytical and Logical skills",
    },
    {
      icon: "/trainings/skills.svg",
      desc: "Professionals from any domains who have logical and analytical skills",
    },
    {
      icon: "/trainings/calc.svg",
      desc: "Finance and Accounting professionals",
    },
    {
      icon: "/trainings/list.svg",
      desc: "Management professionals",
    },
  ];
  return (
    <div
      className="container h-full lg:min-h-screen py-10  w-full flex-col flexCenter gap-10"
      id="who-can-join"
    >
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center lg:text-left">
        Who Can Join Business Analyst Training
      </h3>

      <p className=" text-sm lg:text-base text-center">
        Professionals who can consider Business Analyst as a next logical move
        to enhance their careers
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-10">
        <div className="flex flex-col gap-8">
          {whoCanJoin.slice(0, 3).map((item, i) => (
            <WhoCanJoinCard key={i} item={item} index={i} />
          ))}
        </div>

        <div className="h-52 w-full lg:h-full relative">
          <Image
            src="/trainings/analyst.png"
            alt="icon"
            fill
            className=" w-full object-cover h-full"
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-8">
          {whoCanJoin.slice(3, 6).map((item, i) => (
            <WhoCanJoinCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoCanJoin;

const WhoCanJoinCard = ({
  item,
  index,
}: {
  index: number;
  item: {
    icon: string;
    desc: string;
  };
}) => {
  return (
    <>
      <div className="w-full p-2 flex  gap-4 items-center h-full">
        <div className="h-10 w-10 relative">
          <Image
            src={item.icon}
            alt="icon"
            fill
            className=" w-full object-contain h-full"
          />
        </div>

        <p className="text-sm lg:text-base  w-full text-left">{item.desc}</p>
      </div>
      {index < 2 && <hr className="w-full h-1 bg-gray-400"></hr>}
    </>
  );
};
