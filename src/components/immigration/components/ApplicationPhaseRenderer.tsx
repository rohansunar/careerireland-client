"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, FileText, CheckCircle, Clock } from "lucide-react";

import { ExtendedApplicationStep } from "../types/workflow.types";

interface ApplicationPhaseRendererProps {
  currentStep: number;
  applicationData: ExtendedApplicationStep[];
  onSubmissionUpdate: (submissionData: any) => void;
}

const ApplicationPhaseRenderer: React.FC<ApplicationPhaseRendererProps> = ({
  currentStep,
  applicationData,
  onSubmissionUpdate
}) => {
  const currentStepData = applicationData.find(step => step.id === currentStep);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-600">
            <Send size={24} className="text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Application Submission</h2>
            <p className="text-gray-600">Official filing and submission to authorities</p>
          </div>
        </div>
        <Badge variant="outline">
          Application Phase
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send size={20} />
            {currentStepData?.title || "Application Step"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Send className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Application Submission Phase</h3>
            <p className="text-gray-600 mb-4">
              This phase handles official filing and submission to DETE.
            </p>
            <Badge variant="outline" className="mb-4">
              Coming Soon
            </Badge>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <FileText size={14} />
                <span>Application Filing</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={14} />
                <span>Internal Review</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Send size={14} />
                <span>DETE Submission</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationPhaseRenderer;
