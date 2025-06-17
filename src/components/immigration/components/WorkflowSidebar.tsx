"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  Circle, 
  AlertTriangle,
  ChevronRight,
  User,
  Calendar,
  FileText
} from "lucide-react";

import { 
  ExtendedApplicationStep, 
  WorkflowPhase
} from "../types/workflow.types";

interface WorkflowSidebarProps {
  currentPhase: WorkflowPhase;
  currentStep: number;
  stepsByPhase: Record<WorkflowPhase, ExtendedApplicationStep[]>;
  phaseConfig: Record<WorkflowPhase, {
    title: string;
    icon: any;
    color: string;
    description: string;
  }>;
  onPhaseChange: (phase: WorkflowPhase) => void;
  onStepChange: (step: number) => void;
  mode: 'create' | 'edit' | 'view';
}

const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  currentPhase,
  currentStep,
  stepsByPhase,
  phaseConfig,
  onPhaseChange,
  onStepChange,
  mode
}) => {
  const getStepIcon = (step: ExtendedApplicationStep, isCurrentStep: boolean) => {
    const iconSize = 16;

    switch (step.status) {
      case "completed":
        return <CheckCircle size={iconSize} className="text-green-600" />;
      case "in_progress":
        return <Clock size={iconSize} className="text-blue-600" />;
      case "pending":
        return <Circle size={iconSize} className="text-gray-400" />;
      case "blocked":
        return <AlertTriangle size={iconSize} className="text-red-600" />;
      case "not_applicable":
        return <Circle size={iconSize} className="text-gray-300" />;
      default:
        return <Circle size={iconSize} className="text-gray-400" />;
    }
  };

  const getStepStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
            Completed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-gray-600 text-xs">
            Pending
          </Badge>
        );
      case "blocked":
        return (
          <Badge variant="destructive" className="text-xs">
            Blocked
          </Badge>
        );
      case "not_applicable":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
            N/A
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStepTypeIcon = (stepType: string) => {
    switch (stepType) {
      case 'user_action':
        return <User size={12} className="text-blue-600" />;
      case 'professional_action':
        return <User size={12} className="text-purple-600" />;
      case 'system_action':
        return <FileText size={12} className="text-orange-600" />;
      case 'external_action':
        return <Calendar size={12} className="text-green-600" />;
      default:
        return null;
    }
  };

  const canNavigateToStep = (step: ExtendedApplicationStep): boolean => {
    // In create mode, only allow navigation to completed steps and current step
    if (mode === 'create') {
      return step.status === 'completed' || step.id === currentStep || step.id < currentStep;
    }
    // In view/edit mode, allow navigation to all steps
    return true;
  };

  const handleStepClick = (step: ExtendedApplicationStep) => {
    if (canNavigateToStep(step)) {
      onStepChange(step.id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Phase Navigation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Workflow Phases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(phaseConfig).map(([phase, config]) => {
            const phaseSteps = stepsByPhase[phase as WorkflowPhase] || [];
            const isActive = currentPhase === phase;
            const isCompleted = phaseSteps.every(step => step.status === 'completed');
            const hasSteps = phaseSteps.length > 0;

            // Don't show conditional phases if they're not applicable
            if (!hasSteps && phase !== 'creation') return null;

            return (
              <Button
                key={phase}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start gap-2 h-auto py-2 ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                } ${isCompleted ? 'border-l-4 border-green-500' : ''}`}
                onClick={() => onPhaseChange(phase as WorkflowPhase)}
              >
                {React.createElement(config.icon, { size: 16 })}
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{config.title}</div>
                  <div className="text-xs opacity-75">
                    {phaseSteps.length} step{phaseSteps.length !== 1 ? 's' : ''}
                  </div>
                </div>
                {isCompleted && <CheckCircle size={14} className="text-green-500" />}
                {isActive && <ChevronRight size={14} />}
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Current Phase Steps */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            {React.createElement(phaseConfig[currentPhase].icon, { size: 18 })}
            {phaseConfig[currentPhase].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {(stepsByPhase[currentPhase] || []).map((step) => {
            const isCurrentStep = step.id === currentStep;
            const canNavigate = canNavigateToStep(step);

            return (
              <div
                key={step.id}
                className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isCurrentStep
                    ? 'border-blue-300 bg-blue-50 shadow-sm'
                    : canNavigate
                      ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                }`}
                onClick={() => handleStepClick(step)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 mt-0.5">
                    {getStepIcon(step, isCurrentStep)}
                    {getStepTypeIcon(step.stepType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm text-gray-900 truncate">
                        {step.title}
                      </h4>
                      {getStepStatusBadge(step.status)}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {step.description}
                    </p>
                    
                    {/* Step metadata */}
                    <div className="mt-2 space-y-1">
                      {step.estimatedDuration && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={10} />
                          <span>{step.estimatedDuration}</span>
                        </div>
                      )}
                      {step.assignedTo && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <User size={10} />
                          <span>{step.assignedTo}</span>
                        </div>
                      )}
                      {step.scheduledDate && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={10} />
                          <span>{new Date(step.scheduledDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {step.completedDate && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle size={10} />
                          <span>Completed {new Date(step.completedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <FileText size={14} />
            View Documents
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Calendar size={14} />
            Schedule Call
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <User size={14} />
            Contact Specialist
          </Button>
        </CardContent>
      </Card>

      {/* Case Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Case Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Case ID:</span>
            <span className="font-medium">C001</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium">Critical Skills</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Priority:</span>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
              High
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Started:</span>
            <span className="font-medium">Jan 15, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Specialist:</span>
            <span className="font-medium">Sarah O'Connor</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowSidebar;
