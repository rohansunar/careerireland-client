import React from "react";
import ContactUsForm from "./_components/contact-us-form";
import Image from "next/image";

const ContactUsPage = () => {
  return (
    <div className="px-6 lg:px-14 pt-20 mb-20  ">
      <div className="md:white-blue-bg">
        <ContactUsForm />

        <div className="w-full h-full ">
          <div className="relative w-full h-[500px]">
            <Image
              src="/contact-us/map.png"
              alt="contact-us"
              fill
              className="object-cover rounded-xl"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
