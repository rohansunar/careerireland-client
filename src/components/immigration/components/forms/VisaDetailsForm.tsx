"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Passport } from "lucide-react";

import { CaseFormData, ChecklistProgress } from "../../types/workflow.types";

interface VisaDetailsFormProps {
  formData: CaseFormData;
  onFieldChange: (field: string, value: any) => void;
  onStepComplete: (stepData: any) => void;
  validationErrors: Record<string, string>;
  checklistProgress: ChecklistProgress;
}

const VisaDetailsForm: React.FC<VisaDetailsFormProps> = ({
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
          <FileText size={18} />
          Visa Details
        </h3>
        <p className="text-sm text-blue-700">
          Specify your visa type, travel dates, and passport information.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Visa Details Form</h3>
            <p className="text-gray-600 mb-4">
              This form will collect visa type, travel dates, and passport information.
            </p>
            <Badge variant="outline" className="mb-4">
              Coming Soon
            </Badge>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <Passport size={14} />
                <span>Passport Information</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar size={14} />
                <span>Travel Dates</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FileText size={14} />
                <span>Visa Type Selection</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisaDetailsForm;
