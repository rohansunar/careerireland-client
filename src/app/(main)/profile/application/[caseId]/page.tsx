"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, CheckCircle, XCircle, FileText, Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StepFormData, SubmissionPayload, useImmApplicationId, useSubmitApplicationDocument, useSubmitApplicationStep } from "@/hooks/use-query";
import { formatStatusText } from "@/lib/utils";

type ApplicationStatus = "Draft" | "Submitted" | "Under_Review" | "Additional_Info_Required" | "Approved" | "Rejected" | "Completed" | "Cancelled" | "On_Hold";

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
}

const ApplicationPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const caseId = params.caseId as string;
  const { data, isLoading, isError } = useImmApplicationId(caseId);

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, { name: string; url: string; status: string }>
  >({});

  const { mutate: submitDocument } = useSubmitApplicationDocument();

  const handleFieldChange = (stepId: number, fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [`${stepId}-${fieldId}`]: value }));
  };
  useEffect(() => {
    if (data && data.current_step) {
      setSelectedStep(Number(data.current_step));
    }
  }, [data]);

  const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "application/msword"];
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
  const handleFileValidation = (file: File, stepId: number, documentId: string, documentName: string) => {
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

    // Set loading state
    setUploadingFiles((prev) => ({ ...prev, [key]: true }));

    submitDocument(
      {
        applicationId: caseId,
        documentName,
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
          setUploadingFiles((prev) => ({ ...prev, [key]: false }));
        },
        onError: () => {
          // Handle upload error
          setFormErrors((prev) => ({
            ...prev,
            [key]: "Upload failed. Please try again.",
          }));
          setUploadingFiles((prev) => ({ ...prev, [key]: false }));
        },
      }
    );

  };



  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>("");
  const { mutate: submitStep } = useSubmitApplicationStep();

  const handleSaveForm = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return;

    // Build the formData array for saving (without validation)
    const fields = step.customForm.map((field) => ({
      fieldName: field.fieldName,
      fieldValue: formData[`${stepId}-${field.id}`] ?? field.fieldValue ?? "",
    }));

    const formDataArray: StepFormData[] = [{
      stageOrder: stepId,
      fields,
    }];

    const payload: SubmissionPayload = {
      applicationId: applicationData.id,
      formData: formDataArray,
      currentStep: String(applicationData.current_step), // Keep current step the same for save
    };

    setIsSaving(true);
    setSaveMessage("");

    submitStep(payload, {
      onSuccess: () => {
        setSaveMessage("Form saved successfully!");
        setIsSaving(false);
        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(""), 3000);
      },
      onError: () => {
        setSaveMessage("Failed to save form. Please try again.");
        setIsSaving(false);
        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(""), 3000);
      },
    });
  };

  const handleFormSubmit = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return;

    const errors: Record<string, string> = {};

    // ✅ Validate custom form fields (only validate fields shown to client)
    for (const field of step.customForm) {
      if (field.showToClient) {
        const fieldKey = `${stepId}-${field.id}`;
        const value = formData[fieldKey] ?? field.fieldValue;
        if (field.required && (value === undefined || value === null || value === "" || value === false)) {
          errors[fieldKey] = `${field.fieldName} is required.`;
        }
      }
    }

    // ✅ Validate documents
    for (const doc of step.documents) {
      const docKey = `${stepId}-${doc.id}`;
      const hasUploadedFile = uploadedFiles[docKey]?.name;
      const hasExistingFile = doc.fileUrl && doc.fileUrl !== "";

      if (doc.required && !hasUploadedFile && !hasExistingFile) {
        errors[docKey] = `${doc.fileName} is required.`;
      }
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.text-red-600');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // ✅ Create unique list of step IDs (no Set)
    const stepIdsToSubmit: number[] = [...completedSteps];
    if (!stepIdsToSubmit.includes(stepId)) {
      stepIdsToSubmit.push(stepId);
    }

    // ✅ Build the formData array
    const formDataArray: StepFormData[] = stepIdsToSubmit
      .map((id) => {
        const s = steps.find((step) => step.id === id);
        if (!s) return null;

        const fields = s.customForm.map((field) => ({
          fieldName: field.fieldName,
          fieldValue: formData[`${id}-${field.id}`] ?? field.fieldValue ?? "",
        }));

        return {
          stageOrder: id,
          fields,
        };
      })
      .filter((step): step is StepFormData => step !== null); // TS type guard
    if (formDataArray.length > 0) {
      const payload: SubmissionPayload = {
        applicationId: applicationData.id,
        formData: formDataArray,
        currentStep: `${stepId + 1}`,
      };

      setIsSubmitting(true);
      submitStep(payload, {
        onSuccess: () => {
          if (!completedSteps.includes(stepId)) {
            setCompletedSteps((prev) => [...prev, stepId]);
          }

          // Navigate to next step if available, otherwise stay on current step
          const nextStepIndex = steps.findIndex(s => s.id === stepId) + 1;
          if (nextStepIndex < steps.length) {
            setSelectedStep(steps[nextStepIndex].id);
          } else {
            // If this is the last step, application is completed
            // Could redirect to a completion page or show success message
          }
          setIsSubmitting(false);
        },
        onError: () => {
          // Handle submission error
          setFormErrors((prev) => ({
            ...prev,
            [`${stepId}-submit`]: "Submission failed. Please try again.",
          }));
          setIsSubmitting(false);
        },
      });
    }
  };

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (isError) return <div className="p-8">Error loading data</div>;
  if (!data) return <div className="p-8">No data found for Case ID: {caseId}</div>;

  const applicationData: ApplicationData = data;
  const steps = applicationData.steps.map((step) => ({
    id: step.stageOrder,
    title: step.stageName,
    description: "Complete the required info below.",
    documents: step.documents,
    customForm: step.customForm,
    documentsRequired: step.documentsRequired,
  }));

  const getStatusBadgeVariant = (status: ApplicationStatus) => {
    switch (status) {
      case "Draft":
        return "outline";
      case "Submitted":
        return "secondary";
      case "Under_Review":
        return "default";
      case "Additional_Info_Required":
        return "destructive";
      case "Approved":
        return "default";
      case "Rejected":
        return "destructive";
      case "Completed":
        return "default";
      case "Cancelled":
        return "outline";
      case "On_Hold":
        return "secondary";
      default:
        return "outline";
    }
  };
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
        <Button variant="outline" onClick={handleBackToDashboard} className="flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Dashboard
        </Button>
        <div className="h-6 w-px bg-gray-300" />
        <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold">Case ID: {applicationData.application_number}</CardTitle>
              <p className="text-gray-600 mt-1">{applicationData.service_type}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={getStatusBadgeVariant(applicationData.status)} className="text-sm px-3 py-1">
                {applicationData.status}
              </Badge>
              <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                Current Stage: Step {applicationData.current_step} of {applicationData.steps.length}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium">{new Date(applicationData.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Updated At</p>
                <p className="font-medium">{new Date(applicationData.updated_at).toLocaleDateString()}</p>
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
            return (
              <div key={step.id} className="flex-1 text-center relative">
                {index !== 0 && (
                  <div className={`absolute top-4 left-0 w-full h-0.5 z-0 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
                <div className="relative z-10 flex items-center justify-center mx-auto w-8 h-8 rounded-full border-2"
                  style={{
                    backgroundColor: isCompleted ? '#22c55e' : isActive ? '#3b82f6' : '#e5e7eb',
                    color: isCompleted || isActive ? '#fff' : '#6b7280',
                    borderColor: isCompleted ? '#22c55e' : isActive ? '#3b82f6' : '#e5e7eb'
                  }}>
                  {isCompleted ? "✓" : index + 1}
                </div>
                <div className="mt-2 text-sm text-gray-700">{step.title}</div>
              </div>
            );
          })}
        </div>
        <p className="text-center mt-4 text-gray-500">Step {selectedStep} of {steps.length}</p>
      </div>

      {/* Step Form Content */}
      {steps.map((step, index) => (
        selectedStep !== null && selectedStep === step.id && (
          <div key={step.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-in slide-in-from-right-5 duration-300">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h2>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
            <div className="p-6">

            {/* Custom Fields */}
            {step.customForm.map((form) => {
              // Only show fields that should be visible to client or have existing values
              if (!form.showToClient && !form.fieldValue) {
                return null;
              }

              return (
                <div key={form.id} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {form.fieldName} {form.required && form.showToClient && <span className="text-red-500">*</span>}
                  </label>
                  {(() => {
                    const fieldKey = `${step.id}-${form.id}`;
                    const currentValue = formData[fieldKey] ?? form.fieldValue ?? "";

                    // If field should not be shown to client but has a value, show as read-only
                    if (!form.showToClient && form.fieldValue) {
                      return (
                        <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                          {form.fieldValue}
                        </div>
                      );
                    }

                    // Show editable fields for client
                    if (form.showToClient) {
                      switch (form.fieldType) {
                        case "select":
                          return (
                            <>
                              <select
                                value={currentValue}
                                onChange={(e) => handleFieldChange(step.id, form.id, e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              >
                                <option value="">Select</option>
                                {form.fieldOptions.map((option, i) => (
                                  <option key={i} value={option}>{option}</option>
                                ))}
                              </select>
                              {formErrors[`${step.id}-${form.id}`] && (
                                <p className="text-sm text-red-600 mt-1">{formErrors[`${step.id}-${form.id}`]}</p>
                              )}
                            </>
                          );
                        case "textarea":
                          return (
                            <>
                              <textarea
                                value={currentValue}
                                onChange={(e) => handleFieldChange(step.id, form.id, e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                rows={4}
                              />
                              {formErrors[`${step.id}-${form.id}`] && (
                                <p className="text-sm text-red-600 mt-1">{formErrors[`${step.id}-${form.id}`]}</p>
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
                                    checked={formData[fieldKey] ?? form.fieldValue === "true"}
                                    onChange={(e) => handleFieldChange(step.id, form.id, e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                                </label>
                              </div>
                              {formErrors[`${step.id}-${form.id}`] && (
                                <p className="text-sm text-red-600 mt-1">{formErrors[`${step.id}-${form.id}`]}</p>
                              )}
                            </>
                          );
                        case "radio":
                          return (
                            <div className="mt-1">
                              {form.fieldOptions.map((option, i) => (
                                <label key={i} className="inline-flex items-center mr-4">
                                  <input
                                    type="radio"
                                    name={fieldKey}
                                    value={option}
                                    checked={(formData[fieldKey] ?? form.fieldValue) === option}
                                    onChange={(e) => handleFieldChange(step.id, form.id, e.target.value)}
                                    className="border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                                </label>
                              ))}
                              {formErrors[`${step.id}-${form.id}`] && (
                                <p className="text-sm text-red-600 mt-1">{formErrors[`${step.id}-${form.id}`]}</p>
                              )}
                            </div>
                          );
                        default:
                          return (
                            <>
                              <Input
                                type={form.fieldType || "text"}
                                value={currentValue}
                                onChange={(e) => handleFieldChange(step.id, form.id, e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              />
                              {formErrors[`${step.id}-${form.id}`] && (
                                <p className="text-sm text-red-600 mt-1">{formErrors[`${step.id}-${form.id}`]}</p>
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


            {/* Documents */}
            <div className="space-y-4">
              {step.documents.map((doc) => {
                const isApproved = doc.status === "Approved";
                const hasExistingFile = doc.fileUrl && doc.fileUrl !== "";
                const canUpload = !isApproved;
                const isUploading = uploadingFiles[`${step.id}-${doc.id}`];

                return (
                  <div key={doc.id} className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        {/* Document Info Section */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <label className="block text-sm font-semibold text-gray-900 mb-2" title={doc.fileName}>
                                {doc.fileName} {doc.required && <span className="text-red-500 ml-1">*</span>}
                              </label>
                              <p className="text-sm text-gray-600 leading-relaxed mb-3" title={doc.requestReason}>
                                {doc.requestReason}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              {statusIcon(doc.status)}
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="mb-4">
                            <Badge
                              variant={
                                doc.status === "Approved" ? "default" :
                                doc.status === "Completed" ? "secondary" :
                                doc.status === "Rejected" ? "destructive" :
                                doc.status === "Additional_Info_Required" ? "destructive" :
                                "outline"
                              }
                              className="text-sm px-3 py-1 font-medium"
                            >
                              {formatStatusText(doc.status)}
                            </Badge>
                          </div>

                          {/* Existing File Display */}
                          {hasExistingFile && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <CheckCircle size={16} className="text-green-600" />
                                  <span className="text-sm text-green-800 font-medium">File Uploaded</span>
                                </div>
                                <a
                                  href={`https://dilktbooxkxthvqspxge.supabase.co/storage/v1/object/public/${doc.fileUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 transition-colors hover:underline"
                                >
                                  <Eye size={16} />
                                  View Document
                                </a>
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
                              onDragOver={(e) => handleDragOver(e)}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, step.id, doc.id, doc.fileName)}
                              className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
                                isUploading ? "border-blue-400 bg-blue-50 animate-pulse" :
                                dragOver ? "border-blue-400 bg-blue-50" :
                                "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
                              } ${hasExistingFile ? "border-orange-300 bg-orange-50" : ""}`}
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
                                  {isUploading ? "Uploading..." :
                                   dragOver ? "Release to drop file" :
                                   hasExistingFile ? "Replace existing file" :
                                   "Drop file here or click to browse"}
                                </p>
                                <Input
                                  type="file"
                                  onChange={(e) => handleFileChange(step.id, doc.id, doc.fileName, e)}
                                  className="hidden"
                                  id={`file-input-${step.id}-${doc.id}`}
                                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                  disabled={isUploading}
                                />
                                <label
                                  htmlFor={`file-input-${step.id}-${doc.id}`}
                                  className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-lg transition-all duration-200 ${
                                    isUploading
                                      ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
                                      : "border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 cursor-pointer hover:shadow-md"
                                  }`}
                                >
                                  {isUploading ? "Uploading..." : hasExistingFile ? "Replace File" : "Choose File"}
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
                            <p className="text-sm text-red-700 font-medium">{formErrors[`${step.id}-${doc.id}`]}</p>
                          </div>
                        )}

                        {/* Success Messages */}
                        {uploadedFiles[`${step.id}-${doc.id}`]?.name && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700 flex items-center gap-2 font-medium">
                              <CheckCircle size={16} />
                              Successfully uploaded: {uploadedFiles[`${step.id}-${doc.id}`].name.substring(0, 30)}...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Save Form Button - Positioned in bottom-right (hidden for document upload steps) */}
            {!step.documentsRequired && (
              <div className="flex justify-end mb-4">
                <Button
                  onClick={() => handleSaveForm(step.id)}
                  disabled={isSaving}
                  className="bg-black hover:bg-gray-800 text-white px-4 py-2 transition-all duration-200 hover:scale-105 shadow-md"
                >
                  {isSaving ? "Saving..." : "Save Form"}
                </Button>
              </div>
            )}

            {/* Save Message */}
            {saveMessage && (
              <div className={`mb-4 p-2 rounded-md text-sm ${
                saveMessage.includes("successfully")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {saveMessage}
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
                  onClick={() => handleFormSubmit(step.id)}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  {isSubmitting ? "Submitting..." : (index === steps.length - 1 ? "Submit Application" : "Next Stage")}
                </Button>
              </div>
            </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default ApplicationPage;
