import Accordian from "@/components/common/accordion";
import Image from "next/image";
import React from "react";

const Features = () => {
  const features = [
    {
      title: "01. Experience",
      desc: "Remember that from the customer perspective, experiences are seamless and there is an expectation of consistency across channels but different internal owners of parts of that experience can cause inconsistency.You must take a longitudinal view of the total experience to spot inconsistency",
    },
    {
      title: "02. Professionalism",
      desc: "Among the meanings of the word ‘professional’ in the dictionary, there are two which are connected with the way we work. One is something that is related to a job or profession. The other means well-trained, or a person who is good at one’s work. To be a professional, therefore, implies that a person is good in his job and can be depended upon.",
    },
    {
      title: "03. Quality",
      desc: "Start with quality, destination will be excellence. The quality of what you do determines the quality of your life. The world has changed from quality to quantity, and so have we. Think, Quality only happens when you care enough to do your best!",
    },
    {
      title: "04. Determination",
      desc: "It is difficult to find any one in the world who has made a place for themself without constant struggle to reach their goal. Therefore, we do not have to rest for a moment in our thought of what we are. We should say each day to ourself that “my place is higher up” by having big dreams and vowing to get there. There is nothing so important in our life as our mental attitude towards ourself and what we think of ourself.",
    },
  ];
  return (
    <div className="container h-full lg:min-h-screen py-14 flex flex-col items-center justify-center  w-full">
      <div className=" grid grid-cols-1 md:grid-cols-2 sm:py-10 gap-10 w-full h-full">
        <div className="  h-full flex justify-center items-center mt-5 sm:mt-0 flex-col  ">
          <div className="h-[400px] w-full md:h-[460px] md:w-full lg:h-[500px] lg:w-full relative">
            <Image
              src="/about-us/features.png"
              fill
              className="object-cover object-right h-full w-full rounded-lg"
              alt="hero image"
              unoptimized
            />
          </div>
        </div>

        <Accordian items={features} />
      </div>
    </div>
  );
};

export default Features;
