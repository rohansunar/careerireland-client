"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, CheckCircle, XCircle, FileText } from "lucide-react";

interface CaseStep {
  stageOrder: number;
  stageName: string;
  documentsRequired: boolean;
  customFormRequired: boolean;
}

interface Case {
  id: string;
  application_number: string;
  service_type: string;
  status?: string; // Backend status field
  current_stage_name?: string; // New field from API response
  steps?: CaseStep[]; // Backend steps array with stage names
  created_at: string;
  updated_at: string;
  service_name: string,
  user: {
    name: string;
    email: string;
  };
}

interface CasesTableProps {
  cases: Case[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}



/**
 * Get badge class for backend application status
 * Uses actual backend status instead of frontend derivation
 * @param {string} status - The backend application status
 * @return {string} CSS classes for status badge
 */
const getBackendStatusBadgeClass = (status?: string) => {
  if (!status) return "bg-gray-100 text-gray-800 border-gray-200";

  switch (status.toLowerCase()) {
    case "draft":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "submitted":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "under_review":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

/**
 * Get icon for backend application status
 * Uses actual backend status instead of frontend derivation
 * @param {string} status - The backend application status
 * @return {JSX.Element} React icon component for status
 */
const getBackendStatusIcon = (status?: string) => {
  if (!status) return <Clock className="w-4 h-4" />;

  switch (status.toLowerCase()) {
    case "draft":
      return <FileText className="w-4 h-4" />;
    case "submitted":
      return <CheckCircle className="w-4 h-4" />;
    case "under_review":
      return <Clock className="w-4 h-4" />;
    case "approved":
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    case "rejected":
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

/**
 * Get display text for current stage
 * Uses new current_stage_name field from API response
 * @param {string} currentStageName - The current stage name from API
 * @return {string} The stage name or fallback text
 */
const getCurrentStageDisplay = (currentStageName?: string) => {
  return currentStageName || "Not Started";
};



const CasesTable: React.FC<CasesTableProps> = ({
  cases,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const router = useRouter();

  const handleViewDetails = (caseId: string) => {
    router.push(`/profile/application/${caseId}`);
  };

  const totalPages = Math.ceil(cases.length / itemsPerPage);
  const paginatedCases = cases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timeline</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedCases.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{c.application_number}</span>
                </div>
              </td>

              <td className="px-6 py-4">
                {c.service_name && (
                  <Badge
                    variant="outline"
                    className="w-fit text-xs flex items-center gap-1 bg-blue-100 text-blue-800 border-blue-200"
                  >
                    <FileText className="w-4 h-4" />
                    {c.service_name}
                  </Badge>
                )}
              </td>

              <td className="px-6 py-4">
                {c.status ? (
                  <Badge
                    variant="outline"
                    className={`w-fit text-xs flex items-center gap-1 ${getBackendStatusBadgeClass(c.status)}`}
                  >
                    {getBackendStatusIcon(c.status)}
                    {c.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="w-fit text-xs flex items-center gap-1 bg-gray-100 text-gray-800 border-gray-200"
                  >
                    <Clock className="w-4 h-4" />
                    Pending
                  </Badge>
                )}
              </td>

              <td className="px-6 py-4">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">
                    {getCurrentStageDisplay(c.current_stage_name)}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-col gap-1 text-sm">
                  <span>
                    <span className="text-gray-500">Created:</span>{" "}
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                  <span>
                    <span className="text-gray-500">Updated:</span>{" "}
                    {new Date(c.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4">
                <Button
                  onClick={() => handleViewDetails(c.id)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Eye size={16} />
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant={currentPage === 1 ? "outline" : "default"}
          size="sm"
        >
          Previous
        </Button>

        <span className="text-sm text-gray-700 font-medium">
          Page {currentPage} of {totalPages} ({cases.length} total applications)
        </span>

        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          variant={currentPage === totalPages ? "outline" : "default"}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CasesTable;
