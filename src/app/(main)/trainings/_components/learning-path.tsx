import React from "react";

const learningPathData = [
  {
    title: "Online Live Coaching Classes",
    description: "Attend interactive live classes with industry experts",
  },
  {
    title: "Start of the Course",
    description: "Get introduced to the fundamentals of the program",
  },
  {
    title: "Workshops & Mock Interviews for Business Analytics",
    description: "Participate in hands-on workshops & sharpen interview skills",
  },
  {
    title: "Documentation for Business Analytics",
    description: "Learn to create and maintain professional documentation",
  },
  {
    title: "Real Life Case Studies",
    description: "Analyze real-world scenarios to build practical knowledge",
  },
  {
    title: "Project Deployment to Live & Course Refresher",
    description:
      "Deploy your projects to live environments and refresh core concepts",
  },
  {
    title: "Live Projects Demonstrations",
    description: "Showcase your projects in live demos to get feedback",
  },
  {
    title: "Internship Certification in Business Analytics",
    description:
      "Earn your internship certification upon successful course completion",
  },
];

/**
 * A reusable card that can optionally display:
 * - an arrow on the right (arrowRight)
 * - an arrow pointing downward (arrowDown)
 * - an arrow pointing left (arrowLeft)
 *
 * Both arrows remain inside the card for a cleaner look.
 * @param {Object} props - Component props
 * @param {number} props.stepNumber - Number to display in the circle
 * @param {string} props.title - Title of the step
 * @param {string} props.description - Description of the step
 * @param {boolean} [props.arrowRight] - Whether to show right arrow
 * @param {boolean} [props.arrowDown] - Whether to show down arrow
 * @param {boolean} [props.arrowLeft] - Whether to show left arrow
 * @return {JSX.Element} A card component with optional directional arrows
 */
const StepCard = ({
  stepNumber,
  title,
  description,
  arrowRight = false,
  arrowDown = false,
  arrowLeft = false,
}: {
  stepNumber: number;
  title: string;
  description: string;
  arrowRight?: boolean;
  arrowDown?: boolean;
  arrowLeft?: boolean;
}) => {
  return (
    <div
      className="relative flex flex-col items-center p-4 sm:p-6 bg-white shadow-md rounded-xl 
                    transition-transform hover:scale-105 min-h-[200px] w-full"
    >
      {/* Step Number Circle */}
      <div
        className="mb-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
                      bg-gradient-to-r from-red-500 to-pink-500 
                      text-white rounded-full font-bold text-base sm:text-lg shadow-md 
                      shrink-0"
      >
        {stepNumber}
      </div>

      {/* Title & Description */}
      <div className="flex-1 flex flex-col items-center justify-start w-full">
        <h3 className="text-sm sm:text-base font-semibold text-center mb-2 line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-gray-600 text-center line-clamp-3">
            {description}
          </p>
        )}
      </div>

      {/* Right Arrow */}
      {arrowRight && (
        <div className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 hidden md:flex items-center">
          <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-r from-gray-300 to-gray-400" />
          <div
            className="w-2.5 sm:w-3 h-2.5 sm:h-3 rotate-45 border-t-2 border-r-2 
                         border-gray-400 -ml-[2px] transform-gpu"
          />
        </div>
      )}

      {/* Left Arrow */}
      {arrowLeft && (
        <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 hidden md:flex items-center">
          <div
            className="w-2.5 sm:w-3 h-2.5 sm:h-3 rotate-45 border-l-2 border-b-2 
                         border-gray-400 -mr-[2px] transform-gpu"
          />
          <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-l from-gray-300 to-gray-400" />
        </div>
      )}

      {/* Down Arrow */}
      {arrowDown && (
        <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center">
          <div className="w-[2px] h-8 sm:h-12 bg-gradient-to-b from-gray-300 to-gray-400" />
          <div
            className="w-2.5 sm:w-3 h-2.5 sm:h-3 -rotate-45 border-b-2 border-l-2 
                         border-gray-400 -mt-[2px] transform-gpu"
          />
        </div>
      )}
    </div>
  );
};

const LearningPath = () => {
  const topRowIndices = [0, 1, 2, 3];
  const bottomRowIndices = [7, 6, 5, 4];

  return (
    <section
      className="container h-full lg:min-h-2 mt-[10rem] mx-auto px-4 py-10 mb-[10rem]"
      id="learning-path"
    >
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">
        Learning Path
      </h2>

      {/* Mobile View - Vertical Stack */}
      <div className="md:hidden space-y-8">
        {learningPathData.map((step, index) => (
          <StepCard
            key={index}
            stepNumber={index + 1}
            title={step.title}
            description={step.description}
            arrowDown={index !== learningPathData.length - 1}
            arrowRight={false}
            arrowLeft={false}
          />
        ))}
      </div>

      {/* Desktop View - Two Row Layout */}
      <div className="hidden md:flex flex-col gap-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {topRowIndices.map((i, idx) => (
            <StepCard
              key={i}
              stepNumber={i + 1}
              title={learningPathData[i].title}
              description={learningPathData[i].description}
              arrowRight={idx !== 3}
              arrowDown={idx === 3}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {bottomRowIndices.map((i, idx) => (
            <StepCard
              key={i}
              stepNumber={i + 1}
              title={learningPathData[i].title}
              description={learningPathData[i].description}
              arrowLeft={idx !== 0}
              arrowRight={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPath;
