"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const BookingSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        <div className="p-8 md:p-12 text-center">
          {/* Animated Check Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex justify-center mb-6"
          >
            <CheckCircle2
              className="h-20 w-20 text-emerald-500"
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Booking Confirmed!
            </h1>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Your appointment has been successfully scheduled. We&apos;ve sent
              confirmation details to your email.
            </p>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gorgonzolaBlue  text-white px-8 py-3 rounded-lg font-medium hover:bg-blue700 transition-colors"
            >
              <Link href="/">Back to Home</Link>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
