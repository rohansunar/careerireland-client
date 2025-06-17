"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={2} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. We&apos;ve sent a confirmation email with
          your order details.
        </p>

        <div className="border-t border-gray-100 pt-6">
          <Link href="/">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
