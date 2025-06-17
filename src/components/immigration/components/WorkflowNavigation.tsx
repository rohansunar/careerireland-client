"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Send, 
  X,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

import { 
  ExtendedApplicationStep, 
  WorkflowPhase
} from "../types/workflow.types";

interface WorkflowNavigationProps {
  currentPhase: WorkflowPhase;
  currentStep: number;
  workflowSteps: ExtendedApplicationStep[];
  stepsByPhase: Record<WorkflowPhase, ExtendedApplicationStep[]>;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  canProceed: boolean;
  isDirty: boolean;
  mode: 'create' | 'edit' | 'view';
}

const WorkflowNavigation: React.FC<WorkflowNavigationProps> = ({
  currentPhase,
  currentStep,
  workflowSteps,
  stepsByPhase,
  onPrevious,
  onNext,
  onSave,
  onSubmit,
  onCancel,
  canProceed,
  isDirty,
  mode
}) => {
  const currentStepData = workflowSteps.find(step => step.id === currentStep);
  const phaseSteps = stepsByPhase[currentPhase] || [];
  const isFirstStep = currentStep === 1;
  const isLastStepInPhase = currentStep === Math.max(...phaseSteps.map(s => s.id));
  const isCreationPhase = currentPhase === 'creation';
  const isLastCreationStep = currentStep === 5;

  const getNextButtonText = () => {
    if (isLastCreationStep) {
      return "Submit Application";
    }
    if (isLastStepInPhase) {
      return "Next Phase";
    }
    return "Next Step";
  };

  const getNextButtonIcon = () => {
    if (isLastCreationStep) {
      return <Send size={16} />;
    }
    return <ArrowRight size={16} />;
  };

  const canGoNext = () => {
    if (!canProceed) return false;
    if (currentPhase === 'creation' && currentStep < 5) return true;
    if (currentPhase === 'creation' && currentStep === 5) return canProceed;
    return true;
  };

  const canGoPrevious = () => {
    return !isFirstStep && isCreationPhase;
  };

  const showSaveButton = () => {
    return mode === 'create' && isCreationPhase && isDirty;
  };

  const getStepInfo = () => {
    const totalPhaseSteps = phaseSteps.length;
    const currentStepIndex = phaseSteps.findIndex(step => step.id === currentStep) + 1;
    
    return {
      current: currentStepIndex,
      total: totalPhaseSteps,
      stepTitle: currentStepData?.title || "Unknown Step"
    };
  };

  const stepInfo = getStepInfo();

  return (
    <div className="mt-6 space-y-4">
      {/* Step Information Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Phase
          </Badge>
          <div className="text-sm text-gray-600">
            Step {stepInfo.current} of {stepInfo.total}: {stepInfo.stepTitle}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {currentStepData?.status === 'completed' && (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <CheckCircle size={14} />
              <span>Completed</span>
            </div>
          )}
          {!canProceed && isCreationPhase && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <AlertTriangle size={14} />
              <span>Action Required</span>
            </div>
          )}
          {isDirty && (
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              Unsaved Changes
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Previous Button */}
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious()}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </Button>

          {/* Cancel Button */}
          <Button
            variant="ghost"
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <X size={16} />
            Cancel
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {/* Save Button */}
          {showSaveButton() && (
            <Button
              variant="outline"
              onClick={onSave}
              className="flex items-center gap-2"
              disabled={!isDirty}
            >
              <Save size={16} />
              Save Draft
            </Button>
          )}

          {/* Next/Submit Button */}
          <Button
            onClick={isLastCreationStep ? onSubmit : onNext}
            disabled={!canGoNext()}
            className={`flex items-center gap-2 ${
              isLastCreationStep 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {getNextButtonText()}
            {getNextButtonIcon()}
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      {isCreationPhase && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      )}

      {/* Help Text */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          {!canProceed && isCreationPhase && currentStep >= 4 && (
            "Complete all critical checklist items to proceed."
          )}
          {canProceed && isCreationPhase && currentStep < 5 && (
            "You can proceed to the next step or save your progress."
          )}
          {canProceed && isLastCreationStep && (
            "Review your application and submit when ready."
          )}
          {!isCreationPhase && (
            "This phase is managed by our immigration specialists."
          )}
        </p>
      </div>
    </div>
  );
};

export default WorkflowNavigation;
