"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const NavItem = ({
  link,
  onNavigate,
}: {
  link: {
    url: string;
    name: string;
    subLinks: {
      name: string;
      url: string;
    }[];
  };
  onNavigate?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const pages = ["/trainings", "/about-us", "/visa-service"];
  const isCurrentPage = pathname.toLowerCase() === link.url.toLowerCase();

  const handleNavigation = (url: string) => {
    router.push(url);
    setIsOpen(false);
    if (onNavigate) onNavigate();
  };

  return (
    <>
      {link.subLinks.length > 0 ? (
        <div
          className="relative group"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
            <DropdownMenuTrigger asChild>
              <Link
                href={link.url}
                onClick={() => handleNavigation(link.url)}
                className={`text-sm hover:text-gorgonzolaBlue transition-colors ${
                  isCurrentPage
                    ? "text-gorgonzolaBlue font-semibold underline underline-offset-4 underline-solid underline-gorgonzolaBlue"
                    : `${pages.includes(pathname) ? "text-gray-600" : "text-foreground/70"}`
                }`}
              >
                {link.name}
              </Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={8}
              className="w-56"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              {link.subLinks.map((subLink) => (
                <DropdownMenuItem
                  key={subLink.url}
                  className="text-gray-600 hover:text-gorgonzolaBlue focus:text-gorgonzolaBlue"
                  onClick={() => handleNavigation(subLink.url)}
                >
                  {subLink.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link
          href={link.url}
          onClick={() => handleNavigation(link.url)}
          className={`text-sm hover:text-gorgonzolaBlue transition-colors ${
            isCurrentPage
              ? "text-gorgonzolaBlue font-semibold underline underline-offset-4 underline-solid underline-gorgonzolaBlue"
              : `${pages.includes(pathname) ? "text-gray-600" : "text-foreground/70"}`
          }`}
        >
          {link.name}
        </Link>
      )}
    </>
  );
};

export default NavItem;
