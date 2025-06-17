import { getMentorByName } from "@/hooks/use-server";
import { imgUrl } from "@/util/urls";
import Image from "next/image";
import React from "react";
import AppointmentForm from "../mentor/[id]/_components/appointment-form";

const BookAppointmentNow = async () => {
  const data = await getMentorByName(encodeURI("Career Ireland"));
  return (
    <div className=" p-2 lg:container">
      <div className=" flex    ">
        <div className="relative h-40 w-full justify-center rounded-xl bg-cover lg:mt-20">
          <Image
            className="h-full w-full rounded-xl object-cover"
            src="/mentor/bg.png"
            fill
            alt=""
            unoptimized
          />

          <div className="absolute -bottom-16 left-3 lg:left-10 flex h-[130px] w-[130px] items-center justify-center rounded-full border-[4px] border-white ">
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
      <div className=" flex flex-col md:flex-row ml-48 justify-between items-center  py-3">
        <h4 className="text-xl lg:text-2xl font-bold">{data?.name}</h4>
      </div>

      <div className="flex flex-col space-y-8 mt-8">
        <div className="w-full">
          {data && <AppointmentForm mentor={data} />}
        </div>
        {/* <div
        className=" prose-base bg-[#f3f3f3] p-2 rounded-lg lg:p-6"
        dangerouslySetInnerHTML={{ __html: data?.desc || "" }}
      /> */}
      </div>
      <div className="w-full h-[40px]" />
    </div>
  );
};

export default BookAppointmentNow;
