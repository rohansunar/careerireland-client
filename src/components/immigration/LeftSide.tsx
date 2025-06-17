import React, { ChangeEvent, FormEvent } from "react";
import Register from "@/components/immigration/RegisterImm";
import Login from "@/components/immigration/LoginImm";
import GuestImm from "@/components/immigration/GuestImm";

type Tab = "register" | "guest" | "login";

interface FormData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LeftSideProps {
  status: string;
  errorMessage: string | null;
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
  setLoginError: (msg: string | null) => void;
  formData: FormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function LeftSide({
  status,
  errorMessage,
  selectedTab,
  setSelectedTab,
  setLoginError,
  formData,
  onChange,
  onSubmit,
}: LeftSideProps) {
  const tabs: Tab[] = ["register", "guest", "login"];

  return (
    <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-300">
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {status === "authenticated" ? (
        <div
          className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded"
          role="alert"
          aria-live="polite"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block mt-1">You are logged in successfully!</span>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <nav
            className="flex bg-gray-200 rounded p-2 mb-6 gap-4"
            role="tablist"
            aria-label="Checkout tabs"
          >
            {tabs.map((tab) => {
              const isActive = selectedTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedTab(tab);
                    setLoginError(null); // Clear error on tab change
                  }}
                  className={`
                    flex-1 text-center rounded px-6 py-2 font-medium
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isActive ? "bg-blue-600 text-white shadow" : "bg-white text-gray-700 hover:bg-gray-100"}
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              );
            })}
          </nav>

          {/* Tab Content */}
          <section role="tabpanel" aria-live="polite">
            {selectedTab === "register" && (
              <Register
                formData={formData}
                onChange={onChange}
                onSubmit={onSubmit}
              />
            )}
            {selectedTab === "login" && <Login setLoginError={setLoginError} />}
            {selectedTab === "guest" && <GuestImm />}
          </section>
        </>
      )}
    </div>
  );
}
