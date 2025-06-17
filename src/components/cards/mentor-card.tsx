import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imgUrl } from "@/util/urls";

const MentorCard = ({ mentor }: { mentor: TMentor }) => {
  return (
    <div className="rounded-lg shadow-md p-5 border border-gray-50 flexBetween flex-col gap-4 w-full">
      <div className="h-[200px] relative w-full  rounded-lg">
        <Image
          src={imgUrl + mentor.image}
          fill
          className="object-contain h-full w-full rounded-lg border border-gray-200"
          alt="mentor image"
          unoptimized
        />
      </div>

      <div className="w-full min-h-[50px] flex items-center justify-center text-[#404BD0] text-sm md:text-md bg-[#3D6CE712] px-3 py-2 rounded-full text-center">
        <span className="w-full">{mentor.designation}</span>
      </div>

      <h3 className="text-md md:text-lg sm:text-md w-full text-center">
        {mentor.name}
      </h3>

      <div className="w-full flex items-center justify-center mt-3">
        <Link
          href={`/mentor/${mentor.id}`}
          className=" rounded-full p-2 px-4 text-sm  text-center bg-gorgonzolaBlue text-white "
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default MentorCard;
