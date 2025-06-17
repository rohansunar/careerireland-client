"use client";
import React from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <XCircle className="w-16 h-16 text-red-500" strokeWidth={2} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Payment Failed
        </h1>

        <p className="text-gray-600 mb-6">
          We were unable to process your payment. Please check your payment
          details and try again. If the problem persists, contact your bank or
          our support team.
        </p>

        <div className="border-t border-gray-100 pt-6 space-y-4">
          <Link href="/contact-us">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
