"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import NavItem from "@/components/globals/navbar/nav-item";
import MobileNav from "@/components/globals/navbar/mobile-nav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  const navLinks = [
    {
      name: "Home",
      url: "/",
      subLinks: [],
    },
    {
      name: "Career Services",
      url: "/resume",
      subLinks: [],
    },
    {
      name: "Immigration Service",
      url: "/visa-service",
      subLinks: [
        { name: "Home", url: "/visa-service" },
        { name: "Start New Application", url: "/profile/application/new" },
        {
          name: "Immigration Support and Services",
          url: "/visa-service/#immigration-services",
        },
        {
          name: "Packages",
          url: "/visa-service/#immigration-packages",
        },
        {
          name: "Critical Skill Work Permit",
          url: "/visa-service/#critical-skills",
        },
        {
          name: "General Employment Permit",
          url: "/visa-service/#general-work",
        },
        { name: "Dependent Visa", url: "/visa-service/#dependent-visa" },
        { name: "Stamp 0", url: "/visa-service/#stamp" },
        { name: "Naturalization", url: "/visa-service/#naturalization" },
        { name: "Stamp Extensions", url: "/visa-service/#stamp-extensions" },
      ],
    },
    {
      name: "Trainings",
      url: "/trainings",
      subLinks: [
        { name: "Home", url: "/trainings" },
        { name: "Training Programs", url: "/trainings/#consulting-plans" },
        { name: "Who Can Join", url: "/trainings/#who-can-join" },
        { name: "Program Pedagogy", url: "/trainings/#program-pedagogy" },
        { name: "Modules", url: "/trainings/#modules" },
        {
          name: "Mastering the Art of Selling",
          url: "/trainings/#mastering-the-art-of-selling",
        },
        { name: "Tools", url: "/trainings/#tools" },
      ],
    },
    {
      name: "About Us",
      url: "/about-us",
      subLinks: [],
    },
    {
      name: "Contact Us",
      url: "/contact-us",
      subLinks: [],
    },
    {
      name: "Blog",
      url: "/blog",
      subLinks: [],
    },
    {
      name: "Customer Reviews",
      url: "/customer-reviews",
      subLinks: [],
    },
  ];

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/20">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-16">
                <Image
                  src="/logo.png"
                  fill
                  className="object-contain"
                  alt="Career Ireland logo"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link, i) => (
                <NavItem key={i} link={link} onNavigate={handleNavigate} />
              ))}
            </nav>
          </div>

          <MobileNav
            navLinks={navLinks}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
