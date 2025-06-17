import CountCard from "@/components/cards/count-card";
import { countsData } from "@/util/data";
import React from "react";

const Counts = () => {
  return (
    <div className="container py-10">
      <div className="flex flex-wrap items-center gap-10 justify-between w-full">
        {countsData.map((count, i) => (
          <CountCard key={i} count={count} />
        ))}
      </div>
    </div>
  );
};

export default Counts;
