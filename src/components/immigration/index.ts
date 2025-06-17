// Main exports for Immigration components
export { default as CaseWorkflowManager } from './CaseWorkflowManager';

// Component exports
export { default as WorkflowProgressIndicator } from './components/WorkflowProgressIndicator';
export { default as WorkflowSidebar } from './components/WorkflowSidebar';
export { default as CreationPhaseRenderer } from './components/CreationPhaseRenderer';
export { default as ProcessingPhaseRenderer } from './components/ProcessingPhaseRenderer';
export { default as ApplicationPhaseRenderer } from './components/ApplicationPhaseRenderer';
export { default as TimelinePhaseRenderer } from './components/TimelinePhaseRenderer';
export { default as QueryPhaseRenderer } from './components/QueryPhaseRenderer';
export { default as DecisionPhaseRenderer } from './components/DecisionPhaseRenderer';
export { default as WorkflowNavigation } from './components/WorkflowNavigation';
export { default as ChecklistValidator } from './components/ChecklistValidator';

// Form component exports
export { default as PersonalInfoForm } from './components/forms/PersonalInfoForm';
export { default as VisaDetailsForm } from './components/forms/VisaDetailsForm';
export { default as AdditionalInfoForm } from './components/forms/AdditionalInfoForm';
export { default as DocumentUploadForm } from './components/forms/DocumentUploadForm';
export { default as ReviewSubmitForm } from './components/forms/ReviewSubmitForm';

// Type exports
export type {
  WorkflowPhase,
  StepStatus,
  StepType,
  Priority,
  ExtendedApplicationStep,
  WorkflowStepDetails,
  CaseFormData,
  PersonalInformation,
  VisaDetails,
  AdditionalInformation,
  DocumentUpload,
  ReviewData,
  OnboardingDetails,
  CheckpointCallDetails,
  DocumentReviewDetails,
  FilingDetails,
  SubmissionDetails,
  TimelineDetails,
  Milestone,
  QueryDetails,
  QueryResponse,
  DecisionDetails,
  AppealDetails,
  ChecklistProgress,
  ChecklistItem,
  DocumentSpecification,
  ValidationError,
  ConditionalLogic,
  CaseWorkflowManagerProps,
  ChecklistValidatorProps,
  StepRendererProps
} from './types/workflow.types';

// Schema exports
export {
  personalInfoSchema,
  visaDetailsSchema,
  additionalInfoSchema,
  documentUploadSchema,
  reviewDataSchema,
  caseFormSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  checkpointCallSchema,
  documentReviewSchema,
  querySchema,
  queryResponseSchema,
  decisionSchema,
  appealSchema,
  checklistItemSchema,
  checklistProgressSchema,
  extendedApplicationStepSchema
} from './schemas/case-form.schemas';

// Schema type exports
export type {
  PersonalInfoFormData,
  VisaDetailsFormData,
  AdditionalInfoFormData,
  CaseFormData as CaseFormSchemaData,
  CheckpointCallFormData,
  DocumentReviewFormData,
  QueryFormData,
  QueryResponseFormData,
  DecisionFormData,
  AppealFormData,
  ChecklistItemFormData,
  ChecklistProgressFormData,
  ExtendedApplicationStepFormData
} from './schemas/case-form.schemas';
