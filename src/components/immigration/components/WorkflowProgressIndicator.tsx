"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  Send, 
  Clock, 
  MessageSquare, 
  CheckCircle,
  User,
  Info,
  Upload
} from "lucide-react";

import { 
  ExtendedApplicationStep, 
  WorkflowPhase, 
  ChecklistProgress
} from "../types/workflow.types";

interface WorkflowProgressIndicatorProps {
  currentPhase: WorkflowPhase;
  currentStep: number;
  workflowSteps: ExtendedApplicationStep[];
  stepsByPhase: Record<WorkflowPhase, ExtendedApplicationStep[]>;
  checklistProgress: ChecklistProgress;
  phaseConfig: Record<WorkflowPhase, {
    title: string;
    icon: any;
    color: string;
    description: string;
  }>;
}

const WorkflowProgressIndicator: React.FC<WorkflowProgressIndicatorProps> = ({
  currentPhase,
  currentStep,
  workflowSteps,
  stepsByPhase,
  checklistProgress,
  phaseConfig
}) => {
  // Calculate overall progress
  const completedSteps = workflowSteps.filter(step => step.status === 'completed').length;
  const totalSteps = workflowSteps.filter(step => !step.isConditional).length;
  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  // Creation phase specific steps for detailed progress
  const creationSteps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Visa Details", icon: FileText },
    { id: 3, title: "Additional Information", icon: Info },
    { id: 4, title: "Document Upload", icon: Upload },
    { id: 5, title: "Review & Submit", icon: CheckCircle }
  ];

  // Phase progress calculation
  const getPhaseProgress = (phase: WorkflowPhase) => {
    const phaseSteps = stepsByPhase[phase] || [];
    const completedPhaseSteps = phaseSteps.filter(step => step.status === 'completed').length;
    return phaseSteps.length > 0 ? Math.round((completedPhaseSteps / phaseSteps.length) * 100) : 0;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
      <CardContent className="p-6">
        {/* Header with Transaction Info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Immigration Case Workflow</h2>
            <p className="text-sm text-gray-600">Case ID: C001 | Transaction ID: TXN-{Date.now()}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {overallProgress}%
            </div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(phaseConfig).map(([phase, config]) => {
            const phaseSteps = stepsByPhase[phase as WorkflowPhase] || [];
            const isActive = currentPhase === phase;
            const isCompleted = phaseSteps.every(step => step.status === 'completed');
            const hasSteps = phaseSteps.length > 0;
            const phaseProgress = getPhaseProgress(phase as WorkflowPhase);

            // Don't show conditional phases if they're not applicable
            if (!hasSteps && phase !== 'creation') return null;

            return (
              <div key={phase} className="flex flex-col items-center">
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  className={`flex items-center gap-2 ${
                    isActive ? 'bg-blue-600 text-white' : ''
                  } ${isCompleted ? 'border-green-500' : ''}`}
                >
                  <config.icon size={16} />
                  {config.title}
                  {isCompleted && <CheckCircle size={14} className="text-green-500" />}
                </Button>
                {phaseProgress > 0 && (
                  <div className="text-xs text-gray-600 mt-1">
                    {phaseProgress}%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Current Phase Info */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            {React.createElement(phaseConfig[currentPhase].icon, {
              size: 20,
              className: "text-blue-600"
            })}
            <h3 className="font-semibold text-blue-900">
              {phaseConfig[currentPhase].title}
            </h3>
            <Badge variant="outline" className="text-xs">
              Step {currentStep}
            </Badge>
          </div>
          <p className="text-sm text-blue-700">
            {phaseConfig[currentPhase].description}
          </p>
        </div>

        {/* Detailed Progress for Creation Phase */}
        {currentPhase === 'creation' && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Creation Steps Progress</h4>
            <div className="flex items-center justify-between">
              {creationSteps.map((step, index) => {
                const stepData = workflowSteps.find(s => s.id === step.id);
                const isCompleted = stepData?.status === 'completed';
                const isCurrent = step.id === currentStep;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full border-2
                        ${isCurrent
                          ? 'border-blue-600 bg-blue-100'
                          : isCompleted
                            ? 'border-green-600 bg-green-100'
                            : 'border-gray-300 bg-white'
                        }
                      `}>
                        <Icon size={20} className={
                          isCurrent ? 'text-blue-600' :
                          isCompleted ? 'text-green-600' : 'text-gray-400'
                        } />
                      </div>
                      <div className="text-xs text-center mt-2 max-w-[80px]">
                        {step.title}
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < creationSteps.length - 1 && (
                      <div className={`
                        flex-1 h-0.5 mx-4
                        ${isCompleted ? 'bg-green-300' : 'bg-gray-200'}
                      `} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Checklist Summary */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-lg font-bold text-red-600">
              {checklistProgress.critical.filter(item => item.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-600">Critical Pending</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-lg font-bold text-yellow-600">
              {checklistProgress.recommended.filter(item => item.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-600">Recommended</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-lg font-bold text-blue-600">
              {checklistProgress.optional.filter(item => item.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-600">Optional</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-lg font-bold text-green-600">
              {checklistProgress.completionPercentage}%
            </div>
            <div className="text-xs text-gray-600">Complete</div>
          </div>
        </div>

        {/* Phase-specific Progress Details */}
        {currentPhase !== 'creation' && (
          <div className="mt-4 p-3 bg-white rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {phaseConfig[currentPhase].title} Progress
              </span>
              <span className="text-sm font-bold text-blue-600">
                {getPhaseProgress(currentPhase)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getPhaseProgress(currentPhase)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkflowProgressIndicator;
