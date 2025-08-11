"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Eye,
  Info,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import {
  StepFormData,
  SubmissionPayload,
  useImmApplicationId,
  useSubmitApplicationDocument,
  useSubmitApplicationStep,
  useDeleteApplicationDocument,
} from "@/hooks/use-query";
import { formatStatusText } from "@/lib/utils";

type ApplicationStatus =
  | "Draft"
  | "Submitted"
  | "Under_Review"
  | "Additional_Info_Required"
  | "Approved"
  | "Rejected"
  | "Completed"
  | "Cancelled"
  | "On_Hold";

interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  required: boolean;
  status: ApplicationStatus;
  requestReason: string;
  uploadDate: string;
  updatedAt: string;
}

interface CustomFormField {
  id: string;
  fieldName: string;
  fieldType: string;
  required: boolean;
  fieldValue?: string;
  fieldOptions: string[];
  showToClient: boolean;
}

interface ApplicationStep {
  stageOrder: number;
  stageName: string;
  documentsRequired: boolean;
  customFormRequired: boolean;
  documents: Document[];
  customForm: CustomFormField[];
}

interface ApplicationData {
  id: string;
  application_number: string;
  service_type: string;
  status: ApplicationStatus;
  current_step: number;
  workflow_template: {
    id: string;
    name: string;
    description: string;
  };
  steps: ApplicationStep[];
  user: {
    id: string;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  estimated_completion?: string;
}

const ApplicationPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const caseId = params.caseId as string;
  const { data, isLoading, isError } = useImmApplicationId(caseId);

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>(
    {}
  );
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, { name: string; url: string; status: string }>
  >({});
  // Track if any upload is in progress to disable all upload functionality
  const [isAnyUploadInProgress, setIsAnyUploadInProgress] = useState<boolean>(false);

  const { mutate: submitDocument } = useSubmitApplicationDocument();
  const { mutate: deleteDocument } = useDeleteApplicationDocument();
  const [deletingDocuments, setDeletingDocuments] = useState<Record<string, boolean>>({});
  const [deletedDocuments, setDeletedDocuments] = useState<Set<string>>(new Set());

  // Helper function to check if any upload is in progress
  const checkAnyUploadInProgress = (uploadingState: Record<string, boolean>) => {
    return Object.values(uploadingState).some(isUploading => isUploading);
  };

  const handleFieldChange = (stepId: number, fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [`${stepId}-${fieldId}`]: value }));
  };
  useEffect(() => {
    if (data && data.current_step) {
      setSelectedStep(Number(data.current_step));
    }
  }, [data]);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (saveMessageTimeoutRef.current) {
        clearTimeout(saveMessageTimeoutRef.current);
      }
    };
  }, []);

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const maxSize = 25 * 1024 * 1024; // 25MB
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => {
    setDragOver(false);
  };
  const handleDrop = (
    e: React.DragEvent,
    stepId: number,
    documentId: string,
    documentName: string
  ) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileValidation(file, stepId, documentId, documentName);
  };
  const handleFileChange = (
    stepId: number,
    documentId: string,
    documentName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) handleFileValidation(file, stepId, documentId, documentName);
  };
  const handleFileValidation = (
    file: File,
    stepId: number,
    documentId: string,
    documentName: string
  ) => {
    const key = `${stepId}-${documentId}`;
    if (!allowedTypes.includes(file.type)) {
      setFormErrors((prev) => ({
        ...prev,
        [key]: "Invalid file type. Allowed: PDF, JPG, JPEG, PNG, DOC.",
      }));
      return;
    }
    if (file.size > maxSize) {
      setFormErrors((prev) => ({
        ...prev,
        [key]: "File size exceeds 25MB limit.",
      }));
      return;
    }
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });

    // Set loading state and update global upload progress
    setUploadingFiles((prev) => {
      const newState = { ...prev, [key]: true };
      setIsAnyUploadInProgress(checkAnyUploadInProgress(newState));
      return newState;
    });

    submitDocument(
      {
        applicationId: caseId,
        documentName,
        documentId,
        file,
        stageOrder: String(stepId),
      },
      {
        onSuccess: (res) => {
          // Upload successful
          setUploadedFiles((prev) => ({
            ...prev,
            [key]: {
              name: res.data.document_name,
              url: res.data.file_path,
              status: res.data.status,
            },
          }));

          // Remove from deleted documents set since we have a new upload
          setDeletedDocuments((prev) => {
            const newSet = new Set(Array.from(prev));
            newSet.delete(key);
            return newSet;
          });

          // Clear loading state and update global upload progress
          setUploadingFiles((prev) => {
            const newState = { ...prev, [key]: false };
            setIsAnyUploadInProgress(checkAnyUploadInProgress(newState));
            return newState;
          });
        },
        onError: (error: any) => {
          // Handle upload error with user-friendly message
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Upload failed. Please check your internet connection and try again.";

          setFormErrors((prev) => ({
            ...prev,
            [key]: errorMessage,
          }));

          // Clear loading state and update global upload progress
          setUploadingFiles((prev) => {
            const newState = { ...prev, [key]: false };
            setIsAnyUploadInProgress(checkAnyUploadInProgress(newState));
            return newState;
          });

          // Auto-reload page after 3 seconds if system error
          if (errorMessage.includes("Document upload failed due to a system error")) {
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        },
      }
    );
  };

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>("");
  const { mutate: submitStep } = useSubmitApplicationStep();

  // Ref to track timeout for cleanup
  const saveMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Confirmation dialog state for document deletion
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const handleSaveForm = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return;

    // Build the formData array for saving (without validation)
    const fields = step.customForm.map((field) => ({
      fieldName: field.fieldName,
      fieldValue: formData[`${stepId}-${field.id}`] ?? field.fieldValue ?? "",
    }));

    const formDataArray: StepFormData[] = [
      {
        stageOrder: stepId,
        fields,
      },
    ];

    const payload: SubmissionPayload = {
      applicationId: applicationData.id,
      formData: formDataArray,
      // Removed currentStep field - stage progression handled by backend only
    };

    setIsSaving(true);
    setSaveMessage("");

    submitStep(payload, {
      onSuccess: () => {
        setSaveMessage("Form saved successfully!");
        setIsSaving(false);
        // Clear any existing timeout
        if (saveMessageTimeoutRef.current) {
          clearTimeout(saveMessageTimeoutRef.current);
        }
        // Clear message after 3 seconds
        saveMessageTimeoutRef.current = setTimeout(
          () => setSaveMessage(""),
          3000
        );
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          "Unable to save form. Please check your internet connection and try again.";
        setSaveMessage(errorMessage);
        setIsSaving(false);
        // Clear any existing timeout
        if (saveMessageTimeoutRef.current) {
          clearTimeout(saveMessageTimeoutRef.current);
        }
        // Clear message after 3 seconds
        saveMessageTimeoutRef.current = setTimeout(
          () => setSaveMessage(""),
          3000
        );
      },
    });
  };

  /**
   * Handle document deletion for immigration applications
   *
   * This function manages the complete document deletion workflow:
   * 1. Shows confirmation dialog to prevent accidental deletions
   * 2. Sets loading state during deletion process
   * 3. Calls API to delete document from backend
   * 4. Updates UI state to reflect deletion
   * 5. Shows success/error messages to user
   *
   * @param {number} stepId - The step/stage ID where the document belongs
   * @param {string} documentId - Unique identifier for the document to delete
   * @param {string} documentName - Display name of the document for confirmation dialog
   */
  const handleDeleteDocument = (stepId: number, documentId: string, documentName: string) => {
    // Show confirmation dialog to prevent accidental deletions
    setConfirmDialog({
      isOpen: true,
      title: "Delete Document",
      description: `Are you sure you want to delete "${documentName}"? This action cannot be undone.`,
      onConfirm: () => performDocumentDeletion(stepId, documentId),
    });
  };

  /**
   * Perform the actual document deletion after confirmation
   *
   * @param {number} stepId - The step/stage ID where the document belongs
   * @param {string} documentId - Unique identifier for the document to delete
   */
  const performDocumentDeletion = (stepId: number, documentId: string) => {
    const key = `${stepId}-${documentId}`;

    // Close confirmation dialog
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));

    // Set loading state for this specific document
    setDeletingDocuments((prev) => ({ ...prev, [key]: true }));

    // Call API to delete document
    deleteDocument(
      {
        applicationId: caseId,
        documentId,
      },
      {
        onSuccess: (response) => {
          // Track that this document was deleted to hide upload button properly
          setDeletedDocuments((prev) => new Set([...Array.from(prev), key]));

          // Remove document from uploaded files state to update UI
          setUploadedFiles((prev) => {
            const newFiles = { ...prev };
            delete newFiles[key];
            return newFiles;
          });

          // Clear any form errors for this document
          setFormErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[key];
            return newErrors;
          });

          // Clear loading state
          setDeletingDocuments((prev) => ({ ...prev, [key]: false }));

          // No persistent success message - deletion is immediately reflected in UI
          // Document removal from the list serves as confirmation
        },
        onError: (error: any) => {
          // Extract error message from API response or use fallback
          const errorMessage =
            error?.response?.data?.message ||
            "Unable to delete document. Please check your internet connection and try again.";
          setSaveMessage(errorMessage);

          // Clear loading state
          setDeletingDocuments((prev) => ({ ...prev, [key]: false }));

          // Auto-clear error message after 3 seconds
          if (saveMessageTimeoutRef.current) {
            clearTimeout(saveMessageTimeoutRef.current);
          }
          saveMessageTimeoutRef.current = setTimeout(
            () => setSaveMessage(""),
            3000
          );
        },
      }
    );
  };



  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading application details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error Loading Application
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn&apos;t load the application details. Please try again.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Application Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              No application found for Case ID: {caseId}
            </p>
            <Button
              onClick={() => router.push("/profile?selectedMenu=immigration")}
              variant="outline"
            >
              Back to Applications
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const applicationData: ApplicationData = data;
  const steps = applicationData.steps.map((step) => ({
    id: step.stageOrder,
    title: step.stageName,
    description: "Complete the required info below.",
    documents: step.documents,
    customForm: step.customForm,
    documentsRequired: step.documentsRequired,
  }));

  const statusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case "Draft":
        return <Clock size={16} className="text-gray-500" />;
      case "Submitted":
        return <CheckCircle size={16} className="text-blue-500" />;
      case "Under_Review":
        return <FileText size={16} className="text-blue-500" />;
      case "Additional_Info_Required":
        return <Info size={16} className="text-orange-500" />;
      case "Approved":
        return <CheckCircle size={16} className="text-green-500" />;
      case "Rejected":
        return <XCircle size={16} className="text-red-500" />;
      case "Completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "Cancelled":
        return <XCircle size={16} className="text-gray-500" />;
      case "On_Hold":
        return <Clock size={16} className="text-yellow-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const handleBackToDashboard = () => {
    router.push("/profile?selectedMenu=immigration");
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={handleBackToDashboard}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Button>
        <div className="h-6 w-px bg-gray-300" />
        <h1 className="text-2xl font-bold text-gray-900">
          Application Details
        </h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold">
                Case ID: {applicationData.application_number}
              </CardTitle>
              <p className="text-gray-600 mt-1">
                {applicationData.service_type}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                className="text-sm px-3 py-1"
              >
                Current Stage:{" "}
                {(() => {
                  const currentStage = applicationData.steps.find(
                    (step) => step.stageOrder == applicationData.current_step
                  );
                  return currentStage
                    ? currentStage.stageName
                    : `Step ${applicationData.current_step}`;
                })()}
              </Badge>
              <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                Current Step: ({applicationData.current_step} of{" "}
                {applicationData.steps.length})
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium">
                  {new Date(applicationData.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Updated At</p>
                <p className="font-medium">
                  {new Date(applicationData.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Estimated Completion</p>
                <p className="font-medium">
                  {applicationData.estimated_completion
                    ? new Date(
                        applicationData.estimated_completion
                      ).toLocaleDateString()
                    : "7 working days from the date of document upload completion"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Step Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const isCompleted = step.id < applicationData.current_step;
            const isActive = selectedStep === step.id;
            const isLastStepAndActive = index === steps.length - 1 && isActive;
            return (
              <div key={step.id} className="flex-1 text-center relative">
                {index !== 0 && (
                  <div
                    className={`absolute top-4 left-0 w-full h-0.5 z-0 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
                  />
                )}
                <div
                  className="relative z-10 flex items-center justify-center mx-auto w-8 h-8 rounded-full border-2"
                  style={{
                    backgroundColor: isCompleted
                      ? "#22c55e"
                      : isActive
                        ? "#3b82f6"
                        : "#e5e7eb",
                    color: isCompleted || isActive ? "#fff" : "#6b7280",
                    borderColor: isCompleted
                      ? "#22c55e"
                      : isActive
                        ? "#3b82f6"
                        : "#e5e7eb",
                  }}
                >
                  {isCompleted ? "✓" : isLastStepAndActive ? "✓" : index + 1}
                </div>
                <div className="mt-2 text-sm text-gray-700">{step.title}</div>
              </div>
            );
          })}
        </div>
        <p className="text-center mt-4 text-gray-500">
          {(() => {
            const currentStage = steps.find((step) => step.id === selectedStep);
            return currentStage
              ? `${currentStage.title} (${selectedStep} of ${steps.length})`
              : `Step ${selectedStep} of ${steps.length}`;
          })()}
        </p>
      </div>

      {/* Step Form Content */}
      {steps.map(
        (step, index) =>
          selectedStep !== null &&
          selectedStep === step.id && (
            <div
              key={step.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in slide-in-from-right-5 duration-300"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {step.title}
                </h2>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              <div className="p-6">
                {/* Custom Fields */}
                {step.customForm.map((form) => {
                  const fieldKey = `${step.id}-${form.id}`;
                  const currentValue = formData[fieldKey] ?? form.fieldValue ?? "";

                  return (
                    <div key={form.id} className="mb-4">
                      {/* Always show field name as label */}
                      <label className="block text-sm font-medium text-gray-700">
                        {form.fieldName}{" "}
                        {form.required && form.showToClient && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>

                      {(() => {
                        // If field should not be shown to client but has a value, show as read-only
                        if (!form.showToClient && form.fieldValue) {
                          return (
                            <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                              {form.fieldValue}
                            </div>
                          );
                        }

                        // If field should not be shown to client and has no value, hide completely
                        if (!form.showToClient && !form.fieldValue) {
                          return null;
                        }

                        // Show editable fields for client
                        if (form.showToClient) {
                          switch (form.fieldType) {
                            case "select":
                              return (
                                <>
                                  <select
                                    value={currentValue}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        step.id,
                                        form.id,
                                        e.target.value
                                      )
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                  >
                                    <option value="">Select</option>
                                    {form.fieldOptions.map((option, i) => (
                                      <option key={i} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                  {formErrors[`${step.id}-${form.id}`] && (
                                    <p className="text-sm text-red-600 mt-1">
                                      {formErrors[`${step.id}-${form.id}`]}
                                    </p>
                                  )}
                                </>
                              );
                            case "textarea":
                              return (
                                <>
                                  <textarea
                                    value={currentValue}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        step.id,
                                        form.id,
                                        e.target.value
                                      )
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    rows={4}
                                  />
                                  {formErrors[`${step.id}-${form.id}`] && (
                                    <p className="text-sm text-red-600 mt-1">
                                      {formErrors[`${step.id}-${form.id}`]}
                                    </p>
                                  )}
                                </>
                              );
                            case "checkbox":
                              return (
                                <>
                                  <div className="mt-1">
                                    <label className="inline-flex items-center">
                                      <input
                                        type="checkbox"
                                        checked={
                                          formData[fieldKey] ??
                                          form.fieldValue === "true"
                                        }
                                        onChange={(e) =>
                                          handleFieldChange(
                                            step.id,
                                            form.id,
                                            e.target.checked
                                          )
                                        }
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                      />
                                      <span className="ml-2 text-sm text-gray-700">
                                        Yes
                                      </span>
                                    </label>
                                  </div>
                                  {formErrors[`${step.id}-${form.id}`] && (
                                    <p className="text-sm text-red-600 mt-1">
                                      {formErrors[`${step.id}-${form.id}`]}
                                    </p>
                                  )}
                                </>
                              );
                            case "radio":
                              return (
                                <div className="mt-1">
                                  {form.fieldOptions.map((option, i) => (
                                    <label
                                      key={i}
                                      className="inline-flex items-center mr-4"
                                    >
                                      <input
                                        type="radio"
                                        name={fieldKey}
                                        value={option}
                                        checked={
                                          (formData[fieldKey] ??
                                            form.fieldValue) === option
                                        }
                                        onChange={(e) =>
                                          handleFieldChange(
                                            step.id,
                                            form.id,
                                            e.target.value
                                          )
                                        }
                                        className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                      />
                                      <span className="ml-2 text-sm text-gray-700">
                                        {option}
                                      </span>
                                    </label>
                                  ))}
                                  {formErrors[`${step.id}-${form.id}`] && (
                                    <p className="text-sm text-red-600 mt-1">
                                      {formErrors[`${step.id}-${form.id}`]}
                                    </p>
                                  )}
                                </div>
                              );
                            default:
                              return (
                                <>
                                  <Input
                                    type={form.fieldType || "text"}
                                    value={currentValue}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        step.id,
                                        form.id,
                                        e.target.value
                                      )
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                  />
                                  {formErrors[`${step.id}-${form.id}`] && (
                                    <p className="text-sm text-red-600 mt-1">
                                      {formErrors[`${step.id}-${form.id}`]}
                                    </p>
                                  )}
                                </>
                              );
                          }
                        }

                        return null;
                      })()}
                    </div>
                  );
                })}

                {/* Save Form Button - Show only when fields have showToClient: true */}
                {(() => {
                  const hasClientVisibleFields = step.customForm.some(field => field.showToClient);
                  return hasClientVisibleFields && (
                    <div className="flex justify-end mb-6">
                      <Button
                        onClick={() => handleSaveForm(step.id)}
                        disabled={isSaving}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 transition-all duration-200 hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            <span>Saving...</span>
                          </div>
                        ) : (
                          "Save Form"
                        )}
                      </Button>
                    </div>
                  );
                })()}

                {/* Documents */}
                <div className="space-y-4">
                  {step.documents.length > 0 && (
                    step.documents.map((doc) => {
                    const isApproved = doc.status.charAt(0).toUpperCase() + doc.status.slice(1) === "Approved";
                    const key = `${step.id}-${doc.id}`;

                    // Check if document was deleted locally
                    const wasDeletedLocally = deletedDocuments.has(key);

                    // Check if file exists: backend file OR local upload, but NOT if deleted locally
                    const hasBackendFile = doc.fileUrl && doc.fileUrl !== "";
                    const hasLocalUpload = uploadedFiles[key]?.name;
                    const hasExistingFile = !wasDeletedLocally && (hasBackendFile || hasLocalUpload);

                    const canUpload = !isApproved;
                    const isUploading = uploadingFiles[key];
                    // Disable upload if this document is uploading OR any other upload is in progress
                    const isUploadDisabled = isUploading || isAnyUploadInProgress;

                    return (
                      <div
                        key={doc.id}
                        className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300"
                      >
                        <div className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                            {/* Document Info Section */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <label
                                    className="block text-sm font-semibold text-gray-900 mb-2"
                                    title={doc.fileName}
                                  >
                                    {doc.fileName}{" "}
                                    {doc.required && (
                                      <span className="text-red-500 ml-1">
                                        *
                                      </span>
                                    )}
                                  </label>
                                  <p
                                    className="text-sm text-gray-600 leading-relaxed mb-3"
                                    title={doc.requestReason}
                                  >
                                    {doc.requestReason}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  {statusIcon(doc.status)}
                                </div>
                              </div>

                              {/* Status Badge - Show for backend files or locally uploaded files */}
                              <div className="mb-4">
                                {(doc.fileUrl || uploadedFiles[key]) && (
                                <Badge
                                  variant={
                                    uploadedFiles[key] && !doc.fileUrl
                                      ? "secondary" // Newly uploaded, pending review
                                      : doc.status === "Approved"
                                        ? "default"
                                        : doc.status === "Completed"
                                          ? "secondary"
                                          : doc.status === "Rejected"
                                            ? "destructive"
                                            : doc.status ===
                                                "Additional_Info_Required"
                                              ? "destructive"
                                              : "outline"
                                  }
                                  className="text-sm px-3 py-1 font-medium"
                                >
                                  {uploadedFiles[key] && !doc.fileUrl
                                    ? "Upload Status: Uploaded - Pending Review"
                                    : `Review Status: ${formatStatusText(doc.status)}`}
                                </Badge>
                                )}
                              </div>

                              {/* Existing File Display */}
                              {hasExistingFile && (
                                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle
                                        size={16}
                                        className="text-green-600"
                                      />
                                      <span className="text-sm text-green-800 font-medium">
                                        File Uploaded
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <a
                                        href={`https://dilktbooxkxthvqspxge.supabase.co/storage/v1/object/public/${doc.fileUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 transition-colors hover:underline"
                                      >
                                        <Eye size={16} />
                                        View Document
                                      </a>
                                      {/* Delete Button - Only show for non-approved documents */}
                                      {!isApproved && (
                                        <button
                                          onClick={() => handleDeleteDocument(step.id, doc.id, doc.fileName)}
                                          disabled={deletingDocuments[`${step.id}-${doc.id}`]}
                                          className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1 transition-colors hover:bg-red-50 px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                          title="Delete document"
                                        >
                                          {deletingDocuments[`${step.id}-${doc.id}`] ? (
                                            <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                                          ) : (
                                            <Trash2 size={16} />
                                          )}
                                          {deletingDocuments[`${step.id}-${doc.id}`] ? "Deleting..." : "Delete"}
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  {isApproved && (
                                    <p className="text-sm text-green-700 mt-2 flex items-center gap-1">
                                      <CheckCircle size={14} />
                                      Approved - cannot be changed
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Upload Section */}
                            <div className="lg:w-80 lg:flex-shrink-0">
                              {canUpload && (
                                <div
                                  onDragOver={!isUploadDisabled ? (e) => handleDragOver(e) : undefined}
                                  onDragLeave={!isUploadDisabled ? handleDragLeave : undefined}
                                  onDrop={!isUploadDisabled ? (e) =>
                                    handleDrop(e, step.id, doc.id, doc.fileName) : undefined
                                  }
                                  className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
                                    isUploadDisabled
                                      ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
                                      : isUploading
                                        ? "border-blue-400 bg-blue-50 animate-pulse"
                                        : dragOver
                                          ? "border-blue-400 bg-blue-50"
                                          : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
                                  } ${hasExistingFile && !isUploadDisabled ? "border-orange-300 bg-orange-50" : ""}`}
                                >
                                  <div className="text-center">
                                    <div className="mb-4">
                                      {isUploading ? (
                                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-3 border-blue-500 border-t-transparent"></div>
                                      ) : (
                                        <FileText className="mx-auto h-8 w-8 text-gray-400" />
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-700 mb-4 font-medium">
                                      {isUploadDisabled && !isUploading
                                        ? "Upload in progress - please wait..."
                                        : isUploading
                                          ? "Uploading..."
                                          : dragOver
                                            ? "Release to drop file"
                                            : hasExistingFile
                                              ? "Replace existing file"
                                              : wasDeletedLocally
                                                ? doc.required
                                                  ? "Required document deleted - Please upload a new file"
                                                  : "Optional document deleted - Upload a new file if needed"
                                                : "Drop file here or click to browse"}
                                    </p>
                                    <Input
                                      type="file"
                                      onChange={(e) =>
                                        handleFileChange(
                                          step.id,
                                          doc.id,
                                          doc.fileName,
                                          e
                                        )
                                      }
                                      className="hidden"
                                      id={`file-input-${step.id}-${doc.id}`}
                                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                      disabled={isUploadDisabled}
                                    />
                                    <label
                                      htmlFor={`file-input-${step.id}-${doc.id}`}
                                      className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-lg transition-all duration-200 ${
                                        isUploadDisabled
                                          ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
                                          : "border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 cursor-pointer hover:shadow-md"
                                      }`}
                                    >
                                      {isUploadDisabled && !isUploading
                                        ? "Upload in progress..."
                                        : isUploading
                                          ? "Uploading..."
                                          : hasExistingFile
                                            ? "Replace File"
                                            : "Choose File"}
                                    </label>
                                    <p className="text-xs text-gray-500 mt-3">
                                      PDF, JPG, PNG, DOC (25MB max)
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Error and Success Messages */}
                          <div className="mt-4">
                            {/* Error Messages */}
                            {formErrors[`${step.id}-${doc.id}`] && (
                              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-700 font-medium">
                                  {formErrors[`${step.id}-${doc.id}`]}
                                </p>
                              </div>
                            )}

                            {/* Success Messages */}
                            {uploadedFiles[`${step.id}-${doc.id}`]?.name && (
                              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-700 flex items-center gap-2 font-medium">
                                  <CheckCircle size={16} />
                                  Successfully uploaded:{" "}
                                  {uploadedFiles[
                                    `${step.id}-${doc.id}`
                                  ].name.substring(0, 30)}
                                  ...
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                  )}
                </div>



                {/* Enhanced Save Message with Icons */}
                {saveMessage && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
                      saveMessage.includes("successfully")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {saveMessage.includes("successfully") ? (
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span>{saveMessage}</span>
                  </div>
                )}

                {/* Loading Indicator for Form Save */}
                {isSaving && (
                  <div className="mb-4 p-3 rounded-lg text-sm flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200">
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent flex-shrink-0"></div>
                    <span>Saving your form data...</span>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between items-center bg-gray-50 px-6 py-4 rounded-lg">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const prev = steps[index - 1];
                      if (prev) setSelectedStep(prev.id);
                    }}
                    disabled={index === 0}
                    className="flex items-center gap-2 px-6 py-2 transition-all duration-200 hover:scale-105"
                  >
                    <ArrowLeft size={16} />
                    Previous Stage
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        // Navigate to next stage without submitting to backend
                        const nextStepIndex = steps.findIndex((s) => s.id === step.id) + 1;
                        if (nextStepIndex < steps.length) {
                          setSelectedStep(steps[nextStepIndex].id);
                        } else {
                          // If this is the last step, stay on current step
                          // Progress bar will show completion status
                        }
                      }}
                      disabled={index === steps.length - 1}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {index === steps.length - 1 ? "Completed" : "Next Stage"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
      )}

      {/* Confirmation Dialog for Document Deletion */}
      <ConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        isLoading={false}
      />
    </div>
  );
};

export default ApplicationPage;
