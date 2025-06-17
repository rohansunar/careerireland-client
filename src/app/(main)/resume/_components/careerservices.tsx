"use client";

import React from "react";
import { UserCheck, FileText, Mic, LifeBuoy } from "lucide-react";

const services = [
  {
    title: "Career Mentorship & Job Search Strategy",
    description:
      "Personalized advice to help you identify the right career path, optimize your job search, and land the ideal job.",
    icon: <UserCheck className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "CV & Resume Building",
    description:
      "We craft professional, standout CVs that highlight your experience, achievements, and skills, ensuring you are noticed by top employers.",
    icon: <FileText className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Interview Preparation & Coaching",
    description:
      "Gain the confidence to ace your interviews with our tailored coaching sessions, mock interviews, and real-time feedback.",
    icon: <Mic className="w-8 h-8 text-blue-600" />,
  },

  {
    title: "Career Coaching",
    description:
      "Ongoing mentorship to guide you through challenges, help you refine your professional goals, and maximize your potential.",
    icon: <LifeBuoy className="w-8 h-8 text-blue-600" />,
  },
];

const CareerServices = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Career Services: Empowering Your Professional Journey
          </h2>
          <p className="mt-4 text-gray-600">
            At Career Ireland, we focus on helping you build a successful career
            in Ireland. Our expert team provides tailored career services to
            guide you through the competitive job market. Whether you&apos;re
            just starting out or looking to climb the career ladder, we&apos;ll
            equip you with the tools and insights to succeed.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div>{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerServices;
