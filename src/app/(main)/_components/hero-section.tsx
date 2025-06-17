import Image from "next/image";
import React from "react";
import HeroImage from "../../../../public/home/home-hero.jpg";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col w-full">
        {/* CV Section for Mobile - Image Above */}
        <div className="relative mt-4 mx-4">
          <Image
            src={HeroImage}
            alt="Professional woman"
            width={400}
            height={300}
            className="rounded-lg w-full"
          />
        </div>

        {/* Top Card Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mx-4 mt-4">
          <div className="text-center space-y-4 ">
            <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
              Get Connected With
              <div className="text-blue-600 ">Professional Mentors</div>
            </h3>

            <p className="text-gray-600 text-sm">
              Get practical advice on finding a job, exploring different career
              paths and succeed in the job.
            </p>

            <Link
              href="/book-appointment-now"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg text-center"
            >
              Book Appointment Now!
            </Link>

            <div className="pt-4 border-t text-sm text-gray-600 text-center">
              <p>For any Visa, Immigration and Training.</p>
              <p>
                We will personally guide you through the whole process of career
                in Ireland
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button className="bg-black text-white py-2 px-4 rounded-lg text-sm">
                Call Now
              </button>
              <button className="bg-[#25D366] text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"></path>
                </svg>
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative w-full h-[770px]">
        <Image
          src={HeroImage}
          fill
          className="object-cover"
          alt="Career guidance"
        />
        <div className="absolute inset-0 ">
          <div className="container h-full flex items-center justify-start px-4">
            <div className="bg-white/90 backdrop-blur-sm p-10 rounded-xl shadow-lg max-w-md space-y-6">
              <h3 className="text-3xl font-bold">
                Get Connected With
                <span className="block text-blue-600 mt-2">
                  Professional Mentors
                </span>
              </h3>

              <p className="text-gray-600">
                Get practical advice on finding a job, exploring different
                career paths and succeed in the job.
              </p>

              <Link
                href="/book-appointment-now"
                className="block w-full bg-blue-600 text-white py-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
              >
                Book Appointment Now!
              </Link>

              <div className="text-gray-600 space-y-2 border-t pt-4">
                <p>
                  For any Visa , Immigration and Training, Pls connect with us
                  at –
                </p>
                <p className="text-sm">
                  We will personally guide you through the whole process of
                  career in Ireland
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:+353 89 947 1396"
                  className="bg-gray-800 text-white py-3 rounded-lg text-center hover:bg-gray-900 transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/353899471396"
                  className="bg-[#25D366] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487"></path>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
