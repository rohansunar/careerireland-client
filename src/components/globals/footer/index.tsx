import { footerLinks, socialLinks, contactInfo } from "@/util/data";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const socialIconMap = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};

const Footer = () => {
  return (
    <div className="w-full p-6 pt-16 bg-[#2B2B2B]">
      <div className="container space-y-10 lg:p-10">
        <div className="flex flex-col md:flex-row items-start gap-10 justify-between">
          <div className="flex flex-col gap-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={120}
              height={120}
              quality={100}
            />

            <p className="text-white text-sm sm:text-base">
              Get Connected with professional mentors Get practical advice on
              finding a job, exploring different career paths and succeed in the
              job.
            </p>

            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => {
                const IconComponent =
                  socialIconMap[
                    social.name.toLowerCase() as keyof typeof socialIconMap
                  ];

                return (
                  <Link
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {IconComponent ? (
                      <IconComponent
                        size={24}
                        strokeWidth={1.5}
                        className="hover:scale-110 transition-transform"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 w-full gap-2 sm:gap-8 mx-auto text-xs sm:text-sm lg:text-[14px]">
            {footerLinks.map((item, index) => (
              <div className="text-white space-y-1" key={index}>
                <p className="font-bold text-base sm:text-lg">{item.title}</p>
                {item.linkItems?.map((link, linkIndex) => (
                  <div key={linkIndex}>
                    {link.link ? (
                      <Link
                        href={link.link}
                        className="list-none hover:font-semibold transition-all duration-200"
                      >
                        {link.item}
                      </Link>
                    ) : (
                      <span>{link.item}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-white text-lg font-bold">Contact Us</h3>

            <p className="text-white/70 text-sm">{contactInfo.address}</p>
            <p className="text-white/70 text-sm">Email: {contactInfo.email}</p>
            <p className="text-white/70 text-sm">Phone: {contactInfo.phone}</p>
          </div>
        </div>
      </div>

      <hr className="border-white border-opacity-20 my-10 mx-14" />

      <div className="mb-24 mt-4 sm:mb-10">
        <p className="text-white text-center">
          © 2024 Career Ireland. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
