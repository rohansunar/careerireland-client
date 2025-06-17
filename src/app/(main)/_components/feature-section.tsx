import React from "react";

const FeaturesSection = () => {
  return (
    <div className="w-full py-8 px-4 bg-gray-100 p-6 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4">
            <span className="text-5xl font-bold">1</span>
            <div>
              <h3 className="font-semibold uppercase">Career Mentorship</h3>
              <p className="text-gray-600 text-sm">
                Available on Skype or Meetings
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4">
            <span className="text-5xl font-bold">2</span>
            <div>
              <h3 className="font-semibold uppercase">Training</h3>
              <p className="text-gray-600 text-sm">
                By Certified Industry Experts
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4">
            <span className="text-5xl font-bold">3</span>
            <div>
              <h3 className="font-semibold uppercase">Visa Service</h3>
              <p className="text-gray-600 text-sm">Step-by-Step Guide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
