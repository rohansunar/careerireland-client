"use client";

import React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  url: string;
  subLinks: SubLink[];
}

interface SubLink {
  name: string;
  url: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: () => void;
}

const MobileNav = ({
  navLinks,
  isOpen,
  setIsOpen,
  onNavigate,
}: MobileNavProps) => {
  const pathname = usePathname();
  const pages = ["/trainings", "/about-us", "/visa-service"];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden p-2">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] pt-10">
        <nav className="flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <div key={i}>
              {link.subLinks.length > 0 ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${i}`} className="border-none">
                    <AccordionTrigger
                      className={`text-sm p-0 hover:no-underline ${
                        pathname === link.url
                          ? "text-gorgonzolaBlue font-semibold"
                          : `${
                              pages.includes(pathname)
                                ? "text-foreground"
                                : "text-foreground/70"
                            }`
                      }`}
                    >
                      {link.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 mt-2 ml-4">
                        {link.subLinks.map((subLink) => (
                          <SheetClose
                            key={subLink.url}
                            asChild
                            onClick={onNavigate}
                          >
                            <Link
                              href={subLink.url}
                              className="text-sm text-foreground/70 hover:text-foreground"
                            >
                              {subLink.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <SheetClose asChild onClick={onNavigate}>
                  <Link
                    href={link.url}
                    className={`text-sm ${
                      pathname === link.url
                        ? "text-gorgonzolaBlue font-semibold"
                        : `${
                            pages.includes(pathname)
                              ? "text-foreground"
                              : "text-foreground/70"
                          }`
                    }`}
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
