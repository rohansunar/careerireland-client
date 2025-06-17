import ImmigrationCard from "@/components/cards/immigration-card";
import { apiUrl } from "@/util/urls";
import React from "react";
export const getImmigrations = async () => {
  const res = await fetch(`${apiUrl}/immigration`, {
    next: {
      tags: ["immigrations"],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as TImmigration[];
  }
  return [];
};

const Packages = async () => {
  const data = await getImmigrations();
  return (
    <div
      className="container h-full min-h-screen py-10  w-full flex-col flexStart gap-10"
      id="immigration-packages"
    >
      <h3 className="text-xl md:text-2xl lg:text-3xl">
        Our Immigration Services
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {data.map((packageDetails, i) => (
          <ImmigrationCard
            packageDetails={packageDetails}
            index={i}
            key={packageDetails.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Packages;
