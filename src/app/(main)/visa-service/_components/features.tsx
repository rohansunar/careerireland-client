import FeatureCard from "@/components/cards/feature-card";
import React from "react";

const Features = () => {
  const features = [
    {
      title: "Specialization",
      desc: "Career Ireland specialises in immigration procedures,Critical Skills Employment Permits, General Employment Permits and spouse visas",
    },
    {
      title: "Expert Guidance",
      desc: "Our team of experts will help you with the applications and paperwork needed to register and obtain a visa.",
    },
    {
      title: "Job Assistance/Support",
      desc: "We offer guidance and valuable support to customers planning to have a legal status and career in Ireland.",
    },
  ];
  return (
    <div className="container h-full py-14 flex  items-center justify-center  w-full">
      <div className="flex items-center flex-col md:flex-row">
        {features.map((feature, i) => (
          <FeatureCard
            key={i}
            title={feature.title}
            desc={feature.desc}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
