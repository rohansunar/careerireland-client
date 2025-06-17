"use client";

import React, { useState, useEffect } from "react";

const CookiePopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const denyCookies = () => {
    localStorage.setItem("cookieConsent", "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[100%] max-w-2xl bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4 items-center text-center border border-gray-200 z-50">
      <p className="text-gray-800 md:w-[80%] text-sm font-medium">
        We use cookies to enhance your browsing experience. By continuing to use
        our website, you agree to our cookie policy.
      </p>
      <div className="flex items-center gap-3 w-full">
        <button
          onClick={denyCookies}
          className="w-full px-4 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Deny
        </button>
        <button
          onClick={acceptCookies}
          className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookiePopup;
