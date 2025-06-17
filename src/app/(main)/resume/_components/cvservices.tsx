import React from "react";
import { Briefcase, CheckCircle, FileText, Edit } from "lucide-react";

const services = [
  {
    title: "Personalized CV Creation",
    description:
      "We tailor your CV to reflect your strengths, skills, and career goals. Our experts highlight your key accomplishments and experiences in a way that appeals to recruiters and hiring managers.",
    icon: <Briefcase size={40} className="text-blue-600" />,
  },
  {
    title: "ATS Optimization",
    description:
      "In today's digital world, Applicant Tracking Systems (ATS) are a key part of the recruitment process. Our CVs are designed to pass ATS scans, ensuring that your resume reaches the hands of decision-makers.",
    icon: <CheckCircle size={40} className="text-blue-600" />,
  },
  {
    title: "Cover Letter Writing",
    description:
      "Complement your CV with a professional cover letter that sets you apart from other applicants and demonstrates your passion for the role.",
    icon: <FileText size={40} className="text-blue-600" />,
  },
  {
    title: "CV Review & Improvement",
    description:
      "If you already have a CV but feel it could be stronger, we offer in-depth reviews and optimization. We’ll help you fine-tune it, making sure it’s impactful, error-free, and tailored for your target roles.",
    icon: <Edit size={40} className="text-blue-600" />,
  },
];

const CVServices = () => {
  return (
    <section className="py-12 bg-gray-50 mb-[5rem]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Stand Out with a Professional CV & Resume
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Your CV is your personal brand. At Career Ireland, we help you craft a
          powerful first impression, ensuring your CV reflects your true
          potential.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg text-center transition transform hover:scale-105 hover:shadow-xl border border-gray-200 hover:border-blue-400"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CVServices;
