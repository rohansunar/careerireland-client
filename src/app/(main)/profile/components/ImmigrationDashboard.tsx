"use client";

import React, { useState } from "react";
import { useImmApplication } from "@/hooks/use-query";
import { Badge } from "@/components/ui/badge";

// Removed unused imports since we're no longer using the dashboard boxes and notifications
import CasesTable from "./CasesTable";

// Removed unused components: DashboardBox, QuickActions, NotificationsPanel
// These were removed as per requirements to eliminate dashboard sections

// Constants
const ITEMS_PER_PAGE = 5;

// Main dashboard component
const ImmigrationDashboard: React.FC = () => {
  const { data } = useImmApplication();

  // Process cases to include backend status and steps data
  const sampleCases = (data?.data || []).map((caseItem: any) => ({
    ...caseItem,
    // Ensure steps array is available for stage name display
    steps: caseItem.steps || [],
    // Keep numberOfSteps for backward compatibility
    numberOfSteps: caseItem.numberOfSteps ||
                   (caseItem.steps ? caseItem.steps.length : 5),
  }));

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-6 bg-gray-50 rounded-md min-h-[600px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Immigration Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage your immigration applications and track progress</p>
        </div>
        <Badge variant="outline" className="text-xs">
          Last updated: {new Date().toLocaleDateString()}
        </Badge>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-lg shadow-md border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track the status and progress of your immigration applications
          </p>
        </div>
        <CasesTable
          cases={sampleCases}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ImmigrationDashboard;
