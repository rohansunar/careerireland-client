'use client';
import React, { useEffect, useState } from 'react';
import { Unplug } from 'lucide-react'; // Importing the Unplug icon from lucide-react

const MaintenancePage = () => {
//   const maintenanceTime = parseInt(process.env.MAINTENANCE_TIME || '15', 10) * 60;
//   const [timeLeft, setTimeLeft] = useState(maintenanceTime);

//   useEffect(() => {
//     if (timeLeft === 0) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="mb-8">
        <img src="/logo.png" alt="Logo" className="w-40 h-auto" /> {/* Logo centered at the top */}
      </div>

      {/* Maintenance Heading */}
      <h1 className="text-5xl font-bold text-gray-800 mb-4">We're Undergoing Maintenance</h1>
      <p className="text-xl text-gray-600 mb-6">We are working hard to improve the site. Please check back later.</p>
      
      {/* Container for Unplug Icon with Background Animation */}
      <div className="mt-6 text-2xl text-gray-700 relative flex items-center justify-center w-48 h-48">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-30 animate-pulse"></div>
        <Unplug
          className="z-10 text-white"
          width={80}
          height={80}
        />
      </div>

      {/* Countdown Timer */}
      {/* <div className="text-xl text-gray-700">
        {timeLeft > 0 ? (
          <p>
            Maintenance will end in: <span className="font-bold">{minutes}m {seconds}s</span>
          </p>
        ) : (
          <p>The maintenance period has ended. Thank you for your patience!</p>
        )}
      </div> */}

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-500">
        <p>If you have any questions, feel free to <a href="mailto:support@example.com" className="text-indigo-600">contact us</a>.</p>
      </div>
    </div>
  );
};

export default MaintenancePage;
