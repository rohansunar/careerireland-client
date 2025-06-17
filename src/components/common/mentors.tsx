import MentorCard from "@/components/cards/mentor-card";
// import { mentors } from "@/util/data";
import React from "react";

import { apiUrl } from "@/util/urls";

export const getMentor = async () => {
  const res = await fetch(`${apiUrl}/mentor?page=0&limit=0`, {
    next: {
      tags: ["mentor"],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data.filter(
      (item: TMentorInfo) => item.name !== "Career Ireland"
    ) as TMentor[];
  }
  return [];
};

export default async function Mentors() {
  const mentors = await getMentor();
  return (
    <div className="container h-full  py-10 lg:py-20  w-full flex-col flexStart gap-10 mb-[5rem]">
      <h3 className="text-xl md:text-2xl lg:text-3xl text-center">
        Professional Consulting Mentors
      </h3>
      {/* <p className="text-foreground/60 text-sm lg:text-base text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa corrupti
        consectetur accusantium aspernatur ipsum iste exercitationem hic
        consequuntur, ab quos ratione repellendus natus ipsam officia quod
        corporis beatae commodi illo.
      </p> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {mentors.map((mentor, i) => (
          <MentorCard key={i} mentor={mentor} />
        ))}
      </div>
    </div>
  );
}

// export default Mentors;
