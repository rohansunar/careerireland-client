"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, CheckCircle, XCircle, FileText, Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StepFormData, SubmissionPayload, useImmApplicationId, useSubmitApplicationDocument, useSubmitApplicationStep } from "@/hooks/use-query";

interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  required: boolean;
  status: "pending" | "completed" | "failed" | "Rejected" | "Under_Review" | "Requires_Revision" | "Expired";
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
  status: string;
  priority_level: string;
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
  const maxSize = 500 * 1024;
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
        [key]: "File size exceeds 500KB limit.",
      }));
      return;
    }
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });

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
        },
        onError: () => {
          // Handle upload error
          setFormErrors((prev) => ({
            ...prev,
            [key]: "Upload failed. Please try again.",
          }));
        },
      }
    );

  };



  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { mutate: submitStep } = useSubmitApplicationStep();

  const handleFormSubmit = (stepId: number) => {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return;

    const errors: Record<string, string> = {};

    // ✅ Validate custom form fields
    for (const field of step.customForm) {
      const fieldKey = `${stepId}-${field.id}`;
      const value = formData[fieldKey] ?? field.fieldValue;
      if (field.required && (value === undefined || value === null || value === "" || value === false)) {
        errors[fieldKey] = `${field.fieldName} is required.`;
      }
    }

    // ✅ Validate documents
    // for (const doc of step.documents) {
    //   const docKey = `${stepId}-${doc.id}`;
    //   const file = fileData[docKey];
    //   if (doc.required && !file && !doc.fileUrl) {
    //     errors[docKey] = `${doc.fileName} is required.`;
    //   }
    // }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

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

      submitStep(payload, {
        onSuccess: () => {
          if (!completedSteps.includes(stepId)) {
            setCompletedSteps((prev) => [...prev, stepId]);
          }
          setSelectedStep(stepId + 1);
        },
        onError: () => {
          // Handle submission error
          setFormErrors((prev) => ({
            ...prev,
            [`${stepId}-submit`]: "Submission failed. Please try again.",
          }));
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
  }));

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return "default";
      case "completed":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "default";
    }
  };
  const statusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} className="text-yellow-500" />;
      case "completed":
        return <CheckCircle size={16} className="text-green-500" />;
      case "failed":
        return <XCircle size={16} className="text-red-500" />;
      case "rejected":
        return <XCircle size={16} className="text-red-500" />;
      case "under_review":
        return <FileText size={16} className="text-blue-500" />;
      case "requires_revision":
        return <FileText size={16} className="text-orange-500" />;
      case "expired":
        return <XCircle size={16} className="text-gray-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };
  const reasonIcon = () => {
    return <Info size={16} className="text-gray-500 ml-2" />;
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Applicant</p>
                <p className="font-medium">{applicationData.user.name}</p>
              </div>
            </div>
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
          <div key={step.id} className="p-4 border rounded-lg bg-white">
            <h2 className="text-lg font-semibold mb-2">{step.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{step.description}</p>

            {/* Custom Fields */}
            {step.customForm.map((form) => (
              <div key={form.id} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {form.fieldName} {form.required && <span className="text-red-500">*</span>}
                </label>
                {(() => {
                  const fieldKey = `${step.id}-${form.id}`;
                  const currentValue = formData[fieldKey] ?? form.fieldValue ?? "";

                  switch (form.fieldType) {
                    case "select":
                      return (
                        <>
                          <select
                            value={currentValue}
                            onChange={(e) => handleFieldChange(step.id, form.id, e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                          <input
                            type="checkbox"
                            checked={formData[fieldKey] ?? form.fieldValue === "true"}
                            onChange={(e) => handleFieldChange(step.id, form.id, e.target.checked)}
                            className="mt-1"
                          />
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
                                className="mr-1"
                              />
                              {option}
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
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                          />
                          {formErrors[`${step.id}-${form.id}`] && (
                            <p className="text-sm text-red-600 mt-1">{formErrors[`${step.id}-${form.id}`]}</p>
                          )}
                        </>
                      );
                  }
                })()}
              </div>
            ))}


            {/* Documents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {step.documents.map((doc) => (
                <div key={doc.id} className="mb-6 border p-3 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {doc.fileName} {doc.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="ml-2">
                      {statusIcon(doc.status)}
                      {(doc.status === 'pending' || doc.status === 'Under_Review' || doc.status === 'Requires_Revision' || doc.status === 'Expired') && (
                        <div className="ml-2 group-hover:block">
                          {reasonIcon()}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Reason: {doc.requestReason}</p>
                  <div
                    onDragOver={(e) => handleDragOver(e)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, step.id, doc.id, doc.fileName)}
                    className={`border-2 border-dashed p-6 ${dragOver ? "bg-gray-100" : "bg-white"}`}
                  >
                    <p className="text-center text-gray-500">
                      {dragOver ? "Release to drop" : "Drag & drop your file here, or click to select."}
                    </p>
                    <Input
                      type="file"
                      onChange={(e) => handleFileChange(step.id, doc.id, doc.fileName, e)}
                      className="hidden"
                      id={`file-input-${step.id}-${doc.id}`}
                    />
                    <label
                      htmlFor={`file-input-${step.id}-${doc.id}`}
                      className="block text-center text-blue-500 cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                  {formErrors[`${step.id}-${doc.id}`] && (
                    <p className="text-sm text-red-600 mt-1">{formErrors[`${step.id}-${doc.id}`]}</p>
                  )}
                  {uploadedFiles[`${step.id}-${doc.id}`]?.name && (
                    <p className="text-sm text-green-600 mt-2">
                      ✅ Uploaded: {uploadedFiles[`${step.id}-${doc.id}`].name}
                    </p>
                  )}
                  {doc.fileUrl !== "" && (
                    <a
                      href={`https://dilktbooxkxthvqspxge.supabase.co/storage/v1/object/public/${doc.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-sm"
                    >
                      <Eye size={16} className="inline-block mr-1" />
                      View uploaded file
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  const prev = steps[index - 1];
                  if (prev) setSelectedStep(prev.id);
                }}
              >
                Previous Stage
              </Button>
              <div className="flex gap-2">
                <Button onClick={() => handleFormSubmit(step.id)} className="bg-black text-white">
                  Next Stage
                </Button>
                <Button variant="default">Save All Changes</Button>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default ApplicationPage;
