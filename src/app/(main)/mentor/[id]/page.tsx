import Image from "next/image";
import React from "react";
import AppointmentForm from "./_components/appointment-form";
import { apiUrl, imgUrl } from "@/util/urls";
import ReviewForm from "./_components/review-form";
import Reviews from "./_components/reviews";
import Link from "next/link";
import { GlobeIcon, LinkedinIcon } from "lucide-react";

async function getMentor(id: string) {
  const res = await fetch(`${apiUrl}/mentor/${id}`, {
    next: {
      tags: ["mentor", id],
    },
    cache: "no-store",
  });
  const data = await res.json();

  if (res.status === 200) {
    return data as TMentorInfo;
  }
  return null;
}

const MentorDetails = async ({ params }: { params: { id: string } }) => {
  const data = await getMentor(params.id);
  return (
    <div className="p-2 lg:container">
      <div className="flex">
        <div className="relative h-40 w-full justify-center rounded-xl bg-cover lg:mt-20">
          <Image
            className="h-full w-full rounded-xl object-cover"
            src="/mentor/bg.png"
            fill
            alt="Mentor"
            unoptimized
          />
          <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:left-20 flex h-[130px] w-[130px] items-center justify-center rounded-full border-[4px] border-white bg-white">
            <Image
              className="h-full w-full rounded-full"
              src={imgUrl + (data?.image ?? "")}
              fill
              alt=""
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Desktop View for Mentor Name & Links */}
      <div className="hidden lg:flex flex-col md:flex-row ml-48 justify-between items-center py-3">
        <div className="flex items-center gap-x-2">
          <h4 className="text-2xl font-bold">{data?.name}</h4>
          {data?.linkedin && data.linkedin.trim() !== "" && (
            <Link
              href={data.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg hover:text-gorgonzolaBlue"
            >
              | <LinkedinIcon size={20} /> LinkedIn
            </Link>
          )}

          {data?.profile && data.profile.trim() !== "" && (
            <Link
              href={data.profile || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg hover:text-gorgonzolaBlue"
            >
              | <GlobeIcon size={20} /> Training Courses
            </Link>
          )}
        </div>
      </div>

      {/* Mobile View for Mentor Name & Links */}
      <div className="lg:hidden flex flex-col justify-between items-center py-3 mt-16 space-y-1">
        <h4 className="text-2xl font-bold">{data?.name}</h4>
        <div className="flex items-center gap-x-2">
          {data?.linkedin && data.linkedin.trim() !== "" && (
            <Link
              href={data.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2  hover:text-gorgonzolaBlue"
            >
              <LinkedinIcon size={20} /> LinkedIn
            </Link>
          )}

          {data?.profile && data.profile.trim() !== "" && (
            <Link
              href={data.profile || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2  hover:text-gorgonzolaBlue"
            >
              | <GlobeIcon size={20} /> Training Courses
            </Link>
          )}
        </div>
      </div>

      {/* Appointment Form & Mentor Description */}
      <div className="flex flex-col space-y-8 mt-8">
        <div className="w-full">
          {data && <AppointmentForm mentor={data} />}
        </div>
        <div
          className="prose-base bg-[#f3f3f3] p-2 rounded-lg lg:p-6 text-base"
          dangerouslySetInnerHTML={{ __html: data?.desc || "" }}
        />
      </div>

      {/* Reviews Section */}
      <div className="py-10 space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl text-center lg:text-start font-bold">
            Our Customer Feedback
          </h2>
          <p className="text-base text-center lg:text-start">
            Don&apos;t take our word for it. Trust our customers.
          </p>
        </div>
        <ReviewForm mentorId={params.id} />
        <Reviews mentorId={params.id} />
      </div>
    </div>
  );
};

export default MentorDetails;
