import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Accordian = ({
  items,
}: {
  items: {
    title: string;
    desc: string;
  }[];
}) => {
  return (
    <Accordion type="single" defaultValue="item-0">
      <div className="h-full w-full space-y-5">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="space-y-3 relative"
          >
            <div className="h-full bg-gorgonzolaBlue w-1 absolute z-0" />

            <AccordionTrigger className="text-lg text-gorgonzolaBlue pl-4 ">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-base pl-6 ">
              {item.desc}
            </AccordionContent>
          </AccordionItem>
        ))}
      </div>
    </Accordion>
  );
};

export default Accordian;
