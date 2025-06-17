"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, FileText, AlertTriangle } from "lucide-react";

import { CaseFormData, ChecklistProgress } from "../../types/workflow.types";

interface AdditionalInfoFormProps {
  formData: CaseFormData;
  onFieldChange: (field: string, value: any) => void;
  onStepComplete: (stepData: any) => void;
  validationErrors: Record<string, string>;
  checklistProgress: ChecklistProgress;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({
  formData,
  onFieldChange,
  onStepComplete,
  validationErrors,
  checklistProgress
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
          <Info size={18} />
          Additional Information
        </h3>
        <p className="text-sm text-blue-700">
          Provide additional details about your application history and circumstances.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Info className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Information Form</h3>
            <p className="text-gray-600 mb-4">
              This form will collect additional details about your application.
            </p>
            <Badge variant="outline" className="mb-4">
              Coming Soon
            </Badge>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <FileText size={14} />
                <span>Previous Applications</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle size={14} />
                <span>Visa Refusals</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Info size={14} />
                <span>Additional Details</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalInfoForm;
