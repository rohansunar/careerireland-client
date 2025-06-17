"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Send } from "lucide-react";

import { CaseFormData, ChecklistProgress } from "../../types/workflow.types";

interface ReviewSubmitFormProps {
  formData: CaseFormData;
  onFieldChange: (field: string, value: any) => void;
  onStepComplete: (stepData: any) => void;
  validationErrors: Record<string, string>;
  checklistProgress: ChecklistProgress;
}

const ReviewSubmitForm: React.FC<ReviewSubmitFormProps> = ({
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
          <CheckCircle size={18} />
          Review and Submit
        </h3>
        <p className="text-sm text-blue-700">
          Review your application and submit for processing.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Review and Submit Form</h3>
            <p className="text-gray-600 mb-4">
              This form will provide a comprehensive review of your application.
            </p>
            <Badge variant="outline" className="mb-4">
              Coming Soon
            </Badge>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <FileText size={14} />
                <span>Application Summary</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={14} />
                <span>Final Validation</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Send size={14} />
                <span>Submit Application</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSubmitForm;
