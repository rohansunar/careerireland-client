import React from "react";
const immigrationServices = [
  {
    title: "Work Permit Application Assistance",
    description:
      "We provide expert support throughout the process of obtaining work permits, ensuring you meet all the requirements for employment in Ireland.",
  },
  {
    title: "Visa Extensions & Renewal",
    description:
      "If you're already in Ireland and need assistance with visa extensions or renewals, our team will guide you to ensure your application is processed smoothly.",
  },
  {
    title: "Dependent Visas",
    description:
      "We help you bring your family members to Ireland by managing the dependent visa process with clarity and precision.",
  },
  {
    title: "Citizenship & Naturalisation",
    description:
      "Our team will assist you with the steps necessary to apply for Irish citizenship, guiding you through documentation, forms, and eligibility requirements.",
  },
  {
    title: "Immigration Consultation",
    description:
      "Understand your rights and options under Ireland's immigration laws with a one-on-one consultation, tailored to your unique circumstances.",
  },
  {
    title: " Assessment",
    description:
      "We perform assessment of an immigration application by verifying an applicant's eligibility for work permits or citizenship. It involves reviewing personal, professional, financial information,and document verification.",
  },
];

const ImmigrationServices = () => {
  return (
    <section id="immigration-services" className="py-16 bg-gray-50 mb-[5rem]">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl mb-10">
          Immigration Support and Services
        </h3>
        <p className="text-gray-600 text-lg">
          Ireland is an exciting place to live and work, but the immigration
          process can be complex. Career Ireland offers expert guidance through
          every stage of your journey.
        </p>
      </div>

      {/* Services Grid */}
      <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {immigrationServices.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-[#404BD0]">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImmigrationServices;
