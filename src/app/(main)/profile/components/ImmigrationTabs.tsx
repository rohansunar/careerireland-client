"use client";

import React, { useState } from "react";
import ImmigrationDashboard from "./ImmigrationDashboard";
import ImmigrationCard from "@/components/cards/immigration-card";
import DocumentVault from "./DocumentVault";

const tabs = [
  { id: "dashboard", label: "Applications" },
  { id: "documentVault", label: "Document Vault" },
  { id: "services", label: "Services" },
  //   { id: "notifications", label: "Notifications" },
  //   { id: "settings", label: "Settings" },
];

const ImmigrationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  // Note: This should be moved to a client component or use proper data fetching
  const data: any[] = []; // Placeholder for now

  return (
    <div>
      <div className="border-b border-gray-300 flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm rounded-t-md ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white border border-t-0 border-gray-300 rounded-b-md min-h-[200px]">
        {activeTab === "dashboard" && <ImmigrationDashboard />}
        {activeTab === "documentVault" && <DocumentVault />}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {data.map((packageDetails, i) => (
              <ImmigrationCard
                packageDetails={packageDetails}
                index={i}
                key={packageDetails.id}
              />
            ))}
          </div>
        )}
        {/* {activeTab === "notifications" && <div>Notifications Content</div>} */}
        {/* {activeTab === "settings" && <div>Settings Content</div>} */}
      </div>
    </div>
  );
};

export default ImmigrationTabs;
