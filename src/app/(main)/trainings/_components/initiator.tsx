import InitiatorCard from "@/components/cards/initiator-card";
import { apiUrl } from "@/util/urls";
import React from "react";

async function getTrainings() {
  const res = await fetch(`${apiUrl}/training`, {
    next: {
      tags: ["trainings"],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as ITraining[];
  }
  return [];
}

const Initiator = async () => {
  const data = await getTrainings();
  return (
    <div
      className="md:container h-full py-10  w-full flex-col flexCenter gap-10 px-2"
      id="consulting-plans"
    >
      <h2 className="text-2xl lg:text-3xl font-bold text-center md:mb-12">
        {" "}
        Training Programs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3">
        {data.map((item, i) => (
          <InitiatorCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Initiator;
