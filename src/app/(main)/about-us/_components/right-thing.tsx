import Link from "next/link";
import React from "react";

const RightThing = () => {
  const counts = [
    {
      value: 50,
      title: "Mentors",
    },
    {
      value: 5000,
      title: "Customers",
    },
    {
      value: 3,
      title: "Services",
    },
    {
      value: 5,
      title: "Years",
    },
  ];
  return (
    <div
      className="
    bg-gradient-to-tr from-[#7563b7] to-[#7563b8]
 "
    >
      <div className="container flexBetween flex-col md:flex-row w-full gap-5 py-10 ">
        <div className="flex flex-col gap-5">
          <h3 className="text-white text-2xl lg:text-4xl text-center lg:text-left">
            Doing the right thing, <br /> at the right time.
          </h3>

          <div className="w-full">
            <Link
              href="/contact-us"
              className=" border rounded-xl p-3 px-3 py-2 text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {counts.map((count, i) => (
            <div
              key={i}
              className="
            flexCenter justify-center flex-col border text-white p-5 rounded-lg
            "
            >
              <h3 className="text-5xl font-bold">{count.value}+</h3>
              <p className="text-sm">{count.title} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightThing;
