import { getProfile } from "@/hooks/use-server";
import React from "react";
import Profile from "./components/profile";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Briefcase, Star, Building, BookOpenText } from "lucide-react";
import Services from "./components/services";
import Immigration from "./components/immigration";
import Packages from "./components/packages";
import Reviews from "./components/reviews";

import Training from "./components/training";

const ProfilePage = async () => {
  const data = await getProfile();
  return (
    <div className="mx-auto px-4 lg:px-0  py-24 max-w-[73rem]">
      {data && <Profile user={data} />}
      <Tabs defaultValue="services" className="space-y-4 ">
        <div className="relative rounded-sm overflow-x-scroll  scrollbar scrollbar-h-0">
          <TabsList className="bg-white border border-[#404bd0]/20 ">
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-[#404bd0] data-[state=active]:text-white"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="data-[state=active]:bg-[#404bd0] data-[state=active]:text-white"
            >
              <Package className="w-4 h-4 mr-2" />
              Packages
            </TabsTrigger>
            <TabsTrigger
              value="immigration"
              className="data-[state=active]:bg-[#404bd0] data-[state=active]:text-white"
            >
              <Building className="w-4 h-4 mr-2" />
              Immigration
            </TabsTrigger>
            <TabsTrigger
              value="training"
              className="data-[state=active]:bg-[#404bd0] data-[state=active]:text-white"
            >
              <BookOpenText className="w-4 h-4 mr-2" />
              Training
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-[#404bd0] data-[state=active]:text-white"
            >
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
          </TabsList>
        </div>
        {data && <Services user={data} />}
        {data && <Immigration user={data} />}
        {data && <Packages user={data} />}
        {data && <Training user={data} />}
        {data && <Reviews user={data} />}
      </Tabs>
    </div>
  );
};

export default ProfilePage;
