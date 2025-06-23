"use client";

import React, { useState } from "react";
import ImmigrationDashboard from "./ImmigrationDashboard";
import ImmigrationCard from "@/components/cards/immigration-card";
import DocumentVault from "./DocumentVault";
import { useImmigrationServices } from "@/hooks/use-query";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { id: "dashboard", label: "Applications" },
  { id: "documentVault", label: "Document Vault" },
  { id: "services", label: "Services" },
  //   { id: "notifications", label: "Notifications" },
  //   { id: "settings", label: "Settings" },
];

const ImmigrationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Fetch immigration services for the Services tab
  const { data: immigrationServices, isLoading: servicesLoading, error: servicesError, refetch: refetchServices } = useImmigrationServices();

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
          <div>
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">
                Our Immigration Services
              </h3>
              <p className="text-gray-600 mt-2">
                Explore our comprehensive immigration services designed to help you achieve your goals.
              </p>
            </div>

            {servicesError ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load services</h3>
                <p className="text-gray-500 mb-4">
                  There was an error loading immigration services. Please try again.
                </p>
                <Button onClick={() => refetchServices()} variant="outline">
                  <Loader2 className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            ) : servicesLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-16 h-16 text-blue-300 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Loading services...</h3>
                <p className="text-gray-500">Please wait while we fetch available services</p>
              </div>
            ) : immigrationServices && immigrationServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                {immigrationServices.map((packageDetails, i) => (
                  <ImmigrationCard
                    packageDetails={packageDetails}
                    index={i}
                    key={packageDetails.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services available</h3>
                <p className="text-gray-500">
                  Immigration services are currently not available. Please check back later.
                </p>
              </div>
            )}
          </div>
        )}
        {/* {activeTab === "notifications" && <div>Notifications Content</div>} */}
        {/* {activeTab === "settings" && <div>Settings Content</div>} */}
      </div>
    </div>
  );
};

export default ImmigrationTabs;
