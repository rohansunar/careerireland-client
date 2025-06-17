"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Circle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ApplicationStep from "./ApplicationStep";

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

interface ProcessStepsProps {
  steps: ApplicationStepType[];
  currentStep: number;
  caseStatus: string;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({
  steps,
  currentStep,
  caseStatus,
}) => {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(
    new Set([currentStep])
  );

  const toggleStepExpansion = (stepId: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId);
    } else {
      newExpanded.add(stepId);
    }
    setExpandedSteps(newExpanded);
  };

  const getStepIcon = (step: ApplicationStepType, isCurrentStep: boolean) => {
    const iconSize = 20;

    switch (step.status) {
      case "completed":
        return <CheckCircle size={iconSize} className="text-green-600" />;
      case "in_progress":
        return <Clock size={iconSize} className="text-blue-600" />;
      case "pending":
        return <Circle size={iconSize} className="text-gray-400" />;
      case "not_applicable":
        return <XCircle size={iconSize} className="text-gray-300" />;
      default:
        return <Circle size={iconSize} className="text-gray-400" />;
    }
  };

  const getStepStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-gray-600">
            Pending
          </Badge>
        );
      case "not_applicable":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-500">
            N/A
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getConnectorLine = (index: number, step: ApplicationStepType) => {
    if (index === steps.length - 1) return null;

    let lineColor = "bg-gray-200";
    if (step.status === "completed") {
      lineColor = "bg-green-300";
    } else if (step.status === "in_progress") {
      lineColor = "bg-blue-300";
    }

    return (
      <div className="flex justify-center">
        <div className={`w-0.5 h-8 ${lineColor}`} />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Process Steps</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpandedSteps(new Set(steps.map((s) => s.id)))}
          >
            Expand All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpandedSteps(new Set())}
          >
            Collapse All
          </Button>
        </div>
      </div>

      <div className="space-y-0">
        {steps.map((step, index) => {
          const isCurrentStep = step.id === currentStep;
          const isExpanded = expandedSteps.has(step.id);

          return (
            <div key={step.id} className="relative">
              {/* Step Card */}
              <Card
                className={`transition-all duration-200 ${
                  isCurrentStep
                    ? "border-blue-300 shadow-md bg-blue-50/30"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleStepExpansion(step.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                            isCurrentStep
                              ? "border-blue-600 bg-blue-100"
                              : step.status === "completed"
                                ? "border-green-600 bg-green-100"
                                : "border-gray-300 bg-white"
                          }`}
                        >
                          {getStepIcon(step, isCurrentStep)}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          Step {step.id}
                        </div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold">
                          {step.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStepStatusBadge(step.status)}
                      {isExpanded ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {/* Expanded Content */}
                {isExpanded && (
                  <CardContent className="pt-0">
                    <ApplicationStep
                      step={step}
                      isCurrentStep={isCurrentStep}
                    />
                  </CardContent>
                )}
              </Card>

              {/* Connector Line */}
              {getConnectorLine(index, step)}
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {steps.filter((s) => s.status === "completed").length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {steps.filter((s) => s.status === "in_progress").length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {steps.filter((s) => s.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-400">
                {steps.filter((s) => s.status === "not_applicable").length}
              </div>
              <div className="text-sm text-gray-600">N/A</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessSteps;
