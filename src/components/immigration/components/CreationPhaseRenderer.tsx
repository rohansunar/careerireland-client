"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  FileText, 
  Info, 
  Upload, 
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

import { 
  CaseFormData, 
  ChecklistProgress
} from "../types/workflow.types";

import PersonalInfoForm from "./forms/PersonalInfoForm";
import VisaDetailsForm from "./forms/VisaDetailsForm";
import AdditionalInfoForm from "./forms/AdditionalInfoForm";
import DocumentUploadForm from "./forms/DocumentUploadForm";
import ReviewSubmitForm from "./forms/ReviewSubmitForm";
import ChecklistValidator from "./ChecklistValidator";

interface CreationPhaseRendererProps {
  currentStep: number;
  formData: CaseFormData;
  checklistProgress: ChecklistProgress;
  onFieldChange: (field: string, value: any) => void;
  onStepComplete: (stepData: any) => void;
  onChecklistUpdate: (progress: ChecklistProgress) => void;
}

const CreationPhaseRenderer: React.FC<CreationPhaseRendererProps> = ({
  currentStep,
  formData,
  checklistProgress,
  onFieldChange,
  onStepComplete,
  onChecklistUpdate
}) => {
  const stepConfig = {
    1: {
      title: "Personal Information",
      description: "Complete your personal details and contact information",
      icon: User,
      component: PersonalInfoForm,
      estimatedTime: "15 minutes"
    },
    2: {
      title: "Visa Details",
      description: "Specify visa type, travel dates, and passport information",
      icon: FileText,
      component: VisaDetailsForm,
      estimatedTime: "20 minutes"
    },
    3: {
      title: "Additional Information",
      description: "Provide additional details about your application",
      icon: Info,
      component: AdditionalInfoForm,
      estimatedTime: "10 minutes"
    },
    4: {
      title: "Document Upload",
      description: "Upload required documents and verify checklist completion",
      icon: Upload,
      component: DocumentUploadForm,
      estimatedTime: "30 minutes"
    },
    5: {
      title: "Review and Submit",
      description: "Review your application and submit for processing",
      icon: CheckCircle,
      component: ReviewSubmitForm,
      estimatedTime: "15 minutes"
    }
  };

  const currentStepConfig = stepConfig[currentStep as keyof typeof stepConfig];
  const CurrentStepComponent = currentStepConfig?.component;

  if (!currentStepConfig || !CurrentStepComponent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Step Not Found</h3>
          <p className="text-gray-600">The requested step could not be found.</p>
        </div>
      </div>
    );
  }

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'pending';
  };

  const getCriticalItemsForStep = () => {
    // Return critical checklist items relevant to current step
    if (currentStep === 4) {
      return checklistProgress.critical.filter(item => item.status === 'pending');
    }
    return [];
  };

  const getValidationErrors = () => {
    // Return validation errors for current step
    const errors: Record<string, string> = {};
    
    if (currentStep === 1 && formData.personalInfo) {
      if (!formData.personalInfo.surname) errors.surname = "Surname is required";
      if (!formData.personalInfo.forename) errors.forename = "Forename is required";
      if (!formData.personalInfo.contactEmail) errors.contactEmail = "Email is required";
    }
    
    if (currentStep === 2 && formData.visaDetails) {
      if (!formData.visaDetails.visaType) errors.visaType = "Visa type is required";
      if (!formData.visaDetails.passportNumber) errors.passportNumber = "Passport number is required";
    }

    return errors;
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-600">
            {React.createElement(currentStepConfig.icon, {
              size: 24,
              className: "text-blue-600"
            })}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{currentStepConfig.title}</h2>
            <p className="text-gray-600">{currentStepConfig.description}</p>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="mb-2">
            Step {currentStep} of 5
          </Badge>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={14} />
            <span>{currentStepConfig.estimatedTime}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>

      {/* Critical Items Alert */}
      {currentStep === 4 && getCriticalItemsForStep().length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            You have {getCriticalItemsForStep().length} critical document(s) pending. 
            These must be completed before you can proceed.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(currentStepConfig.icon, { size: 20 })}
                {currentStepConfig.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CurrentStepComponent
                formData={formData}
                onFieldChange={onFieldChange}
                onStepComplete={onStepComplete}
                validationErrors={getValidationErrors()}
                checklistProgress={checklistProgress}
              />
            </CardContent>
          </Card>
        </div>

        {/* Checklist Sidebar */}
        <div className="lg:col-span-1">
          <ChecklistValidator
            formData={formData}
            visaType={formData.visaDetails?.purposeOfTravel || ""}
            currentStep={currentStep}
            checklistProgress={checklistProgress}
            onChecklistUpdate={onChecklistUpdate}
            mode="validation"
          />

          {/* Step Navigation Helper */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Step Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(stepConfig).map(([stepNum, config]) => {
                const stepNumber = parseInt(stepNum);
                const status = getStepStatus(stepNumber);
                
                return (
                  <div
                    key={stepNum}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      status === 'current' 
                        ? 'bg-blue-50 border border-blue-200' 
                        : status === 'completed'
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`
                      flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium
                      ${status === 'current' 
                        ? 'bg-blue-600 text-white' 
                        : status === 'completed'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      {status === 'completed' ? (
                        <CheckCircle size={14} />
                      ) : (
                        stepNumber
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${
                        status === 'current' ? 'text-blue-900' : 
                        status === 'completed' ? 'text-green-900' : 'text-gray-700'
                      }`}>
                        {config.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {config.estimatedTime}
                      </div>
                    </div>
                    {status === 'completed' && (
                      <CheckCircle size={16} className="text-green-600" />
                    )}
                    {status === 'current' && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                If you need assistance with this step, our immigration specialists are here to help.
              </p>
              <div className="space-y-2">
                <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  📞 Schedule a consultation call
                </button>
                <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  💬 Chat with support
                </button>
                <button className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  📚 View help documentation
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreationPhaseRenderer;
