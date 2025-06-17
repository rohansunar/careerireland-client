"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  Upload,
} from "lucide-react";

interface ApplicationStepType {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "pending" | "not_applicable";
  completedDate?: string;
  scheduledDate?: string;
  estimatedDate?: string;
  startedDate?: string;
  details: Record<string, any>;
}

interface ApplicationStepProps {
  step: ApplicationStepType;
  isCurrentStep: boolean;
}

const ApplicationStep: React.FC<ApplicationStepProps> = ({
  step,
  isCurrentStep,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderDateInfo = () => {
    const dates = [];

    if (step.completedDate) {
      dates.push(
        <div key="completed" className="flex items-center gap-2 text-green-700">
          <CheckCircle size={16} />
          <span className="text-sm">
            Completed: {formatDate(step.completedDate)}
          </span>
        </div>
      );
    }

    if (step.scheduledDate) {
      dates.push(
        <div key="scheduled" className="flex items-center gap-2 text-blue-700">
          <Calendar size={16} />
          <span className="text-sm">
            Scheduled: {formatDate(step.scheduledDate)}
          </span>
        </div>
      );
    }

    if (
      step.estimatedDate &&
      step.estimatedDate !== "TBD" &&
      step.estimatedDate !== "N/A"
    ) {
      dates.push(
        <div key="estimated" className="flex items-center gap-2 text-gray-600">
          <Clock size={16} />
          <span className="text-sm">
            Estimated: {formatDate(step.estimatedDate)}
          </span>
        </div>
      );
    }

    if (step.startedDate) {
      dates.push(
        <div key="started" className="flex items-center gap-2 text-blue-600">
          <Clock size={16} />
          <span className="text-sm">
            Started: {formatDate(step.startedDate)}
          </span>
        </div>
      );
    }

    return dates.length > 0 ? (
      <div className="flex flex-wrap gap-4 mb-4">{dates}</div>
    ) : null;
  };

  const renderStepDetails = () => {
    const { details } = step;

    // Handle different step types with specific rendering
    switch (step.id) {
      case 1: // Fill up Personal Details
        return (
          <div className="space-y-4">
            {details.formsCompleted && (
              <div>
                <span className="font-medium block mb-2">Forms Completed:</span>
                <div className="flex flex-wrap gap-2">
                  {details.formsCompleted.map((form: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      <CheckCircle size={12} className="mr-1" />
                      {form}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {details.documentsRequired && (
              <div>
                <span className="font-medium block mb-2">
                  Documents Required:
                </span>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {details.documentsRequired.map(
                    (doc: string, index: number) => (
                      <li key={index}>{doc}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        );

      case 2: // Uploading Documents
        return (
          <div className="space-y-6">
            {/* Document Management Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="font-medium text-green-800">Uploaded</span>
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {details.uploadedDocuments?.length || 0}
                </div>
                <div className="text-sm text-green-700">Documents approved</div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-orange-600" />
                  <span className="font-medium text-orange-800">Pending</span>
                </div>
                <div className="text-2xl font-bold text-orange-900">
                  {details.pendingDocuments?.length || 0}
                </div>
                <div className="text-sm text-orange-700">Awaiting upload</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-blue-600" />
                  <span className="font-medium text-blue-800">Required</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {details.totalDocuments || 0}
                </div>
                <div className="text-sm text-blue-700">Total documents</div>
              </div>
            </div>

            {/* Progress Bar */}
            {details.totalDocuments && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Upload Progress</span>
                  <span className="text-gray-600">
                    {details.uploadedDocuments?.length || 0} of{" "}
                    {details.totalDocuments} completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((details.uploadedDocuments?.length || 0) / details.totalDocuments) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Uploaded Documents */}
            {details.uploadedDocuments &&
              details.uploadedDocuments.length > 0 && (
                <div>
                  <span className="font-medium block mb-3 text-green-800">
                    ✓ Uploaded Documents
                  </span>
                  <div className="space-y-2">
                    {details.uploadedDocuments.map(
                      (doc: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-green-50 border border-green-200 rounded"
                        >
                          <CheckCircle
                            size={16}
                            className="text-green-600 flex-shrink-0"
                          />
                          <span className="text-sm font-medium">{doc}</span>
                          <Badge
                            variant="secondary"
                            className="ml-auto bg-green-100 text-green-800"
                          >
                            Approved
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Pending Documents */}
            {details.pendingDocuments &&
              details.pendingDocuments.length > 0 && (
                <div>
                  <span className="font-medium block mb-3 text-orange-800">
                    ⏳ Pending Documents
                  </span>
                  <div className="space-y-2">
                    {details.pendingDocuments.map(
                      (doc: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-orange-50 border border-orange-200 rounded"
                        >
                          <Clock
                            size={16}
                            className="text-orange-600 flex-shrink-0"
                          />
                          <span className="text-sm font-medium">{doc}</span>
                          <Badge
                            variant="outline"
                            className="ml-auto border-orange-300 text-orange-700"
                          >
                            Required
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 hover:bg-blue-50"
                          >
                            <Upload size={16} />
                            Upload Documents
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                  {details.uploadDeadline && (
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded">
                      <div className="flex items-center gap-2 text-orange-700">
                        <AlertTriangle size={16} />
                        <span className="text-sm font-medium">
                          Upload Deadline: {formatDate(details.uploadDeadline)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        );

      case 3: // Document Reviewed
        return (
          <div className="space-y-4">
            {details.reviewedBy && (
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <span className="font-medium">Reviewed by:</span>
                <span>{details.reviewedBy}</span>
              </div>
            )}
            {details.reviewNotes && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <span className="font-medium block mb-1">Review Notes:</span>
                <p className="text-sm text-gray-700">{details.reviewNotes}</p>
              </div>
            )}
            {details.additionalDocumentsRequired &&
              details.additionalDocumentsRequired.length === 0 && (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle size={16} />
                  <span className="text-sm">
                    No additional documents required
                  </span>
                </div>
              )}
          </div>
        );

      default:
        // Generic details rendering for other steps
        return (
          <div className="space-y-3">
            {Object.entries(details).map(([key, value]) => {
              if (Array.isArray(value)) {
                return (
                  <div key={key}>
                    <span className="font-medium block mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {value.map((item: any, index: number) => (
                        <li key={index}>
                          {typeof item === "string"
                            ? item
                            : JSON.stringify(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              } else if (typeof value === "object" && value !== null) {
                return (
                  <div key={key}>
                    <span className="font-medium block mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  </div>
                );
              } else {
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span className="text-sm">{String(value)}</span>
                  </div>
                );
              }
            })}
          </div>
        );
    }
  };

  return (
    <div className="border-t pt-4">
      {renderDateInfo()}
      {renderStepDetails()}

      {/* Action buttons for current step */}
      {isCurrentStep && step.status === "in_progress" && (
        <div className="mt-4 pt-4 border-t">
          {/* <div className="flex flex-wrap gap-2">
            {step.id === 2 && ( // Document upload step
              <>
                <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-blue-50">
                  <Upload size={16} />
                  Upload Documents
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600">
                  <FileText size={16} />
                  View Requirements
                </Button>
              </>
            )}
            {step.id === 1 && ( // Personal details step
              <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-blue-50">
                <FileText size={16} />
                Complete Forms
              </Button>
            )}
          </div> */}

          {/* Help text for current step */}
          <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="text-blue-600 mt-0.5">💡</div>
              <div className="text-sm text-gray-700">
                {step.id === 2 &&
                  "Upload all required documents to proceed. Ensure files are clear and in PDF format."}
                {step.id === 1 &&
                  "Complete all personal information forms accurately. Double-check all details before submission."}
                {![1, 2].includes(step.id) &&
                  "Follow the instructions provided to complete this step."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationStep;
