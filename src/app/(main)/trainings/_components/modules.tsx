import ModuleCard from "@/components/cards/module-card";
import { modules } from "@/util/data";
import React from "react";

const Modules = () => {
  return (
    <div id="modules" className="mb-[5rem]">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">
        Program Curriculum
      </h2>
      {modules.map((item, i) => (
        <ModuleCard
          key={i}
          type="module"
          module={{
            i,
            title: item.title,
            desc: item.desc,
            image: item.image,
            points: item.points,
            link: "/trainings/#consulting-plans",
            id: "modules",
          }}
        />
      ))}
    </div>
  );
};

export default Modules;
