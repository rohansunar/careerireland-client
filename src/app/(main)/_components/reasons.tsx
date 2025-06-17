import Image from "next/image";
import React from "react";

const ReasonsToJoin = () => {
  const reasons = [
    {
      title: "Deep desire and commitment",
      content:
        "Our coaches have a deep desire and commitment to help others (not just a desire to heal their own pain), coaches have conducted their own proprietary research.",
    },
    {
      title: "Model for change",
      content:
        "Our coaches have developed their own 'model for change', our coaches have once faced what you are facing now and know what it feels like, personally.",
    },
    {
      title: "Job search process",
      content:
        "Your job search process is not yielding results, you had taken a career detour and now want to resume. We've got your back!",
    },
    {
      title: "Making progress",
      content:
        "You're stuck in your career and not making progress? Our Coaches Tell You What You NEED To Hear. You Get Personalised Advice!",
    },
    {
      title: "You Get Personalised Advice",
      content:
        "You don't know your own potential? Interviewing Paralyzes you? You get dedicated time to make progress with our mentors! You Get to Experiment, Iterate, and Improve.",
    },
  ];

  return (
    <div className="container min-h-screen py-20 w-full">
      {/* Centered Header Section */}
      <div className="w-full flex justify-center mb-16 lg:mb-20">
        <div className="text-center max-w-4xl">
          <p className="text-lg font-semibold lg:text-3xl uppercase tracking-widest">
            WHY CHOOSE US
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="w-full h-full flex items-center gap-4 lg:gap-6">
          <div className="flex flex-col gap-4 flex-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/home/reasons-1.jpeg"
                fill
                className="object-cover"
                alt="Coaching session"
              />
            </div>
            <div className="relative aspect-[1.5/1] rounded-2xl overflow-hidden">
              <Image
                src="/home/reasons-2.jpeg"
                fill
                className="object-cover"
                alt="Team discussion"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="relative aspect-[0.8/1] rounded-2xl overflow-hidden">
              <Image
                src="/home/reasons-3.jpeg"
                fill
                className="object-cover"
                alt="Career growth"
              />
            </div>
          </div>
        </div>

        {/* Reasons List */}
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="space-y-6 md:space-y-0">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex gap-2 md:p-[0.5rem] lg:p-[0.75rem] rounded-xl bg-white hover:bg-gray-50 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-lg bg-gorgonzolaBlue/10 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-gorgonzolaBlue" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{reason.title}:</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonsToJoin;
