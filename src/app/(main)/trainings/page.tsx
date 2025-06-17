import React from "react";
import HeroSection from "./_components/hero-section";
import Initiator from "./_components/initiator";
import WhoCanJoin from "./_components/who-can-join";
import ProgramPedagogy from "./_components/program-pedagogy";
import Modules from "./_components/modules";
import Tools from "@/components/common/tools";
import LearningPath from "./_components/learning-path";
import MasteringSales from "./_components/mastering-sales";
export default async function TrainingsPage() {
  return (
    <div>
      <HeroSection />
      <Initiator />
      <WhoCanJoin />
      <ProgramPedagogy />
      <LearningPath />
      <Modules />
      <MasteringSales />
      <Tools />
    </div>
  );
}
