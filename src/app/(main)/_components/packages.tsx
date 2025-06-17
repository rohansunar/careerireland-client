import PackageCard from "@/components/cards/package-card";
import React from "react";

import { apiUrl } from "@/util/urls";

export const getPackages = async () => {
  const res = await fetch(`${apiUrl}/packages`, {
    next: {
      tags: ["packages"],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as TPackage[];
  }
  return [];
};

// Packages.tsx
const Packages = async () => {
  const packages = await getPackages();
  return (
    <div className="container min-h-screen py-10 w-full mx-auto flex flex-col items-center gap-8 ">
      <div className="text-center space-y-2 max-w-2xl ">
        <h3 className="text-2xl md:text-3xl lg:text-4xl md:py-6">
          Mentorship Packages
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full px-4 sm:px-6 ">
        {packages.map((packageDetails, i) => (
          <PackageCard key={i} packageDetails={packageDetails} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Packages;
