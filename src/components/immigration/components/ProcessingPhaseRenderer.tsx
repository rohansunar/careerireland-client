"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, FileText, CheckCircle } from "lucide-react";

import { ExtendedApplicationStep } from "../types/workflow.types";

interface ProcessingPhaseRendererProps {
  currentStep: number;
  workflowData: ExtendedApplicationStep[];
  onStatusUpdate: (stepId: number, status: any) => void;
}

const ProcessingPhaseRenderer: React.FC<ProcessingPhaseRendererProps> = ({
  currentStep,
  workflowData,
  onStatusUpdate
}) => {
  const currentStepData = workflowData.find(step => step.id === currentStep);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 border-2 border-purple-600">
            <Users size={24} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Professional Processing</h2>
            <p className="text-gray-600">Expert review and consultation services</p>
          </div>
        </div>
        <Badge variant="outline">
          Processing Phase
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            {currentStepData?.title || "Processing Step"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Processing Phase</h3>
            <p className="text-gray-600 mb-4">
              This phase includes onboarding, checkpoint calls, and document review.
            </p>
            <Badge variant="outline" className="mb-4">
              Coming Soon
            </Badge>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <Users size={14} />
                <span>Specialist Assignment</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar size={14} />
                <span>Checkpoint Calls</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FileText size={14} />
                <span>Document Review</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessingPhaseRenderer;
