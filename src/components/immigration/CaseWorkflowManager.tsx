"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Users,
  Send,
  Clock,
  MessageSquare,
  CheckCircle
} from "lucide-react";

import { 
  ExtendedApplicationStep, 
  WorkflowPhase, 
  CaseFormData,
  ChecklistProgress,
  CaseWorkflowManagerProps
} from "./types/workflow.types";

import {
  mock12StepWorkflow,
  mockChecklistProgress,
  mockCaseFormData
} from "../../mockdata/workflow.mock";

import WorkflowProgressIndicator from "./components/WorkflowProgressIndicator";
import WorkflowSidebar from "./components/WorkflowSidebar";
import CreationPhaseRenderer from "./components/CreationPhaseRenderer";
import ProcessingPhaseRenderer from "./components/ProcessingPhaseRenderer";
import ApplicationPhaseRenderer from "./components/ApplicationPhaseRenderer";
import TimelinePhaseRenderer from "./components/TimelinePhaseRenderer";
import QueryPhaseRenderer from "./components/QueryPhaseRenderer";
import DecisionPhaseRenderer from "./components/DecisionPhaseRenderer";
import WorkflowNavigation from "./components/WorkflowNavigation";

const CaseWorkflowManager: React.FC<CaseWorkflowManagerProps> = ({
  mode = 'create',
  caseId,
  onSave,
  onSubmit,
  onCancel
}) => {
  const [currentPhase, setCurrentPhase] = useState<WorkflowPhase>('creation');
  const [currentStep, setCurrentStep] = useState(1);
  const [workflowSteps, setWorkflowSteps] = useState<ExtendedApplicationStep[]>(mock12StepWorkflow);
  const [formData, setFormData] = useState<CaseFormData>(mockCaseFormData as CaseFormData);
  const [checklistProgress, setChecklistProgress] = useState<ChecklistProgress>(mockChecklistProgress);
  const [isDirty, setIsDirty] = useState(false);

  // Group steps by phase for better organization
  const stepsByPhase = useMemo(() => {
    return workflowSteps.reduce((acc, step) => {
      if (!acc[step.phase]) acc[step.phase] = [];
      acc[step.phase].push(step);
      return acc;
    }, {} as Record<WorkflowPhase, ExtendedApplicationStep[]>);
  }, [workflowSteps]);

  // Phase configuration
  const phaseConfig = {
    creation: {
      title: 'Application Creation',
      icon: FileText,
      color: 'blue',
      description: 'Complete your application form and upload documents'
    },
    processing: {
      title: 'Professional Processing',
      icon: Users,
      color: 'purple',
      description: 'Expert review and consultation services'
    },
    application: {
      title: 'Application Submission',
      icon: Send,
      color: 'orange',
      description: 'Official filing and submission to authorities'
    },
    timeline: {
      title: 'Processing Timeline',
      icon: Clock,
      color: 'yellow',
      description: 'Track expected processing times and milestones'
    },
    queries: {
      title: 'Query Management',
      icon: MessageSquare,
      color: 'indigo',
      description: 'Handle additional information requests'
    },
    decision: {
      title: 'Decision & Appeals',
      icon: CheckCircle,
      color: 'green',
      description: 'Final decision and appeal process if needed'
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setIsDirty(true);
  };

  const handleStepComplete = (stepData: any) => {
    const updatedSteps = workflowSteps.map(step => 
      step.id === currentStep 
        ? { ...step, status: 'completed' as const, completedDate: new Date().toISOString(), details: { ...step.details, ...stepData } }
        : step
    );
    setWorkflowSteps(updatedSteps);
    setIsDirty(true);
  };

  const handleStatusUpdate = (stepId: number, status: any) => {
    const updatedSteps = workflowSteps.map(step => 
      step.id === stepId 
        ? { ...step, ...status }
        : step
    );
    setWorkflowSteps(updatedSteps);
    setIsDirty(true);
  };

  const handleSubmissionUpdate = (submissionData: any) => {
    // Handle submission updates for application phase
    // TODO: Implement submission update logic
  };

  const handleQueryResponse = (queryId: string, response: any) => {
    // Handle query responses
    // TODO: Implement query response logic
  };

  const handleAppealSubmit = (appealData: any) => {
    // Handle appeal submission
    // TODO: Implement appeal submission logic
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    const maxStep = stepsByPhase[currentPhase]?.length || 1;
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSave = async () => {
    try {
      await onSave(formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  const validateCurrentStep = (): boolean => {
    // Implement step-specific validation logic
    const currentStepData = workflowSteps.find(step => step.id === currentStep);
    if (!currentStepData) return false;

    // For creation phase, check if critical checklist items are complete
    if (currentPhase === 'creation' && currentStep === 4) {
      return checklistProgress.critical.every(item => item.status === 'completed');
    }

    return true;
  };

  const getTimelineData = () => {
    const timelineStep = workflowSteps.find(step => step.phase === 'timeline');
    return timelineStep?.details.timelineInfo;
  };

  const getMilestones = () => {
    const timelineData = getTimelineData();
    return timelineData?.milestones || [];
  };

  const getQueries = () => {
    const queryStep = workflowSteps.find(step => step.id === 13);
    return queryStep?.details.queries || [];
  };

  const getDecisionData = () => {
    const decisionStep = workflowSteps.find(step => step.id === 15);
    return decisionStep?.details.decision;
  };

  const getAppealOptions = () => {
    const appealStep = workflowSteps.find(step => step.id === 16);
    return appealStep?.details.appealInfo;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Enhanced Progress Header with Phase Navigation */}
      <WorkflowProgressIndicator
        currentPhase={currentPhase}
        currentStep={currentStep}
        workflowSteps={workflowSteps}
        stepsByPhase={stepsByPhase}
        checklistProgress={checklistProgress}
        phaseConfig={phaseConfig}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        {/* Enhanced Sidebar with Phase Navigation */}
        <div className="lg:col-span-1">
          <WorkflowSidebar
            currentPhase={currentPhase}
            currentStep={currentStep}
            stepsByPhase={stepsByPhase}
            phaseConfig={phaseConfig}
            onPhaseChange={setCurrentPhase}
            onStepChange={setCurrentStep}
            mode={mode}
          />
        </div>

        {/* Main Workflow Area */}
        <div className="lg:col-span-3">
          <Card className="min-h-[700px]">
            <CardContent className="p-6">
              {/* Phase-specific content rendering */}
              {currentPhase === 'creation' && (
                <CreationPhaseRenderer
                  currentStep={currentStep}
                  formData={formData}
                  checklistProgress={checklistProgress}
                  onFieldChange={handleFieldChange}
                  onStepComplete={handleStepComplete}
                  onChecklistUpdate={setChecklistProgress}
                />
              )}

              {currentPhase === 'processing' && (
                <ProcessingPhaseRenderer
                  currentStep={currentStep}
                  workflowData={stepsByPhase.processing || []}
                  onStatusUpdate={handleStatusUpdate}
                />
              )}

              {currentPhase === 'application' && (
                <ApplicationPhaseRenderer
                  currentStep={currentStep}
                  applicationData={stepsByPhase.application || []}
                  onSubmissionUpdate={handleSubmissionUpdate}
                />
              )}

              {currentPhase === 'timeline' && (
                <TimelinePhaseRenderer
                  timelineData={getTimelineData()}
                  milestones={getMilestones()}
                />
              )}

              {currentPhase === 'queries' && (
                <QueryPhaseRenderer
                  queries={getQueries()}
                  onQueryResponse={handleQueryResponse}
                />
              )}

              {currentPhase === 'decision' && (
                <DecisionPhaseRenderer
                  decisionData={getDecisionData()}
                  appealOptions={getAppealOptions()}
                  onAppealSubmit={handleAppealSubmit}
                />
              )}
            </CardContent>
          </Card>

          {/* Phase-specific Navigation Controls */}
          <WorkflowNavigation
            currentPhase={currentPhase}
            currentStep={currentStep}
            workflowSteps={workflowSteps}
            stepsByPhase={stepsByPhase}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSave={handleSave}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            canProceed={validateCurrentStep()}
            isDirty={isDirty}
            mode={mode}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseWorkflowManager;
