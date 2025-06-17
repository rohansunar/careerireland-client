import Image from "next/image";
import React from "react";

const CompanyOverview = () => {
  return (
    <div className="container h-full lg:min-h-screen py-14 flex flex-col items-center justify-center  w-full">
      <div className=" grid grid-cols-1 sm:grid-cols-2 sm:py-10 gap-10">
        <div className="  h-full flex justify-center items-center mt-5 sm:mt-0 flex-col  ">
          <div className="h-[400px] w-full md:h-[460px] md:w-full lg:h-full lg:w-full relative">
            <Image
              src="/about-us/overview.png"
              fill
              className="object-contain h-full w-full rounded-lg"
              alt="hero image"
              unoptimized
            />
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center justify-center">
          <h3 className="text-xl md:text-4xl font-bold text-left w-full">
            Our Company Overview
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm text-center md:text-left sm:leading-relaxed">
            Career Ireland was founded after recognizing the challenges
            immigrants and international students face in securing desirable
            jobs due to visa restrictions, limited experience, and lack of
            awareness of the local job market. The founders tested various job
            search strategies—such as optimizing CV styles and refining
            interview responses—and successfully secured top roles in Ireland.
            Realizing the value of their experience, they decided to help fellow
            job seekers by sharing what works in the Irish market. The company
            now supports job seekers with ATS-ready CVs, effective job search
            strategies, interview preparation, and bridging gaps between
            profiles and market demands. We later created Facebook group of
            Career in Ireland which now has more than 5000 active members who
            support each other for job search referrals and other career related
            information ( https://www.facebook.com/groups/careerireland)
          </p>
          {/* <p className="text-gray-600 text-xs sm:text-sm text-center md:text-left sm:leading-relaxed">
            https://careerireland.com was then started and the team helped job
            seekers for best forms of CV with ATS readiness, Strategies for
            doing an effective job search, bringing out the gap in-between
            candidate’s profile and market demand. Weaker sections in the
            interview responses and provided overall guidance for securing the
            deserving job for all job seekers. We later created Facebook group
            of Career in Ireland which now has more than 5000 active members who
            support each other for job search referrals and other career related
            information ( https://www.facebook.com/groups/careerireland
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
