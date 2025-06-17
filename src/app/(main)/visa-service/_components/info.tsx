import ModuleCard from "@/components/cards/module-card";
import { visaInfo } from "@/util/data";
import React from "react";

const Info = () => {
  return (
    <div>
      {visaInfo.map((item, i) => (
        <ModuleCard
          key={i}
          type="visa-info"
          module={{
            i,
            title: item.title,
            desc: item.desc,
            link: item.link,
            id: item.id,
            image: item.image,
            points: item.points,
          }}
        />
      ))}
    </div>
  );
};

export default Info;
