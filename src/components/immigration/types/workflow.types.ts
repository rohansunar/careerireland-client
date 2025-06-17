// Enhanced TypeScript interfaces for 12-Step Immigration Workflow
// Extends existing VisaApplication interface with comprehensive workflow support

export type WorkflowPhase = 'creation' | 'processing' | 'application' | 'timeline' | 'queries' | 'decision';

export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'not_applicable';

export type StepType = 'user_action' | 'professional_action' | 'system_action' | 'external_action';

export type Priority = 'CRITICAL' | 'RECOMMENDED' | 'OPTIONAL' | 'ENHANCEMENT';

// Extended ApplicationStep interface for 12-step workflow
export interface ExtendedApplicationStep {
  id: number;
  title: string;
  description: string;
  phase: WorkflowPhase;
  status: StepStatus;
  stepType: StepType;
  estimatedDuration?: string;
  actualDuration?: string;
  completedDate?: string;
  scheduledDate?: string;
  assignedTo?: string;
  details: WorkflowStepDetails;
  dependencies?: number[];
  isConditional?: boolean;
  conditionalLogic?: ConditionalLogic;
}

export interface WorkflowStepDetails {
  // Creation phase details
  formData?: CaseFormData;
  checklistProgress?: ChecklistProgress;
  validationErrors?: ValidationError[];

  // Processing phase details
  onboardingInfo?: OnboardingDetails;
  checkpointCall?: CheckpointCallDetails;
  documentReview?: DocumentReviewDetails;

  // Application phase details
  filingInfo?: FilingDetails;
  submissionInfo?: SubmissionDetails;

  // Timeline phase details
  timelineInfo?: TimelineDetails;

  // Query phase details
  queries?: QueryDetails[];
  responses?: QueryResponse[];

  // Decision phase details
  decision?: DecisionDetails;
  appealInfo?: AppealDetails;
}

// Creation Phase Types
export interface CaseFormData {
  personalInfo: PersonalInformation;
  visaDetails: VisaDetails;
  additionalInfo: AdditionalInformation;
  documents: DocumentUpload[];
  reviewData: ReviewData;
}

export interface PersonalInformation {
  surname: string;
  forename: string;
  otherName?: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
  countryOfBirth: string;
  currentLocation: string;
  address: {
    line1: string;
    line2?: string;
    line3?: string;
    line4?: string;
  };
  contactPhone: string;
  contactEmail: string;
}

export interface VisaDetails {
  countryOfNationality: string;
  reasonForTravel: string;
  visaType: 'Short Stay (C)' | 'Long Stay (D)';
  journeyType: 'Single' | 'Multiple';
  purposeOfTravel: string;
  passportType: string;
  passportNumber: string;
  issuingAuthority: string;
  dateOfIssue: string;
  dateOfExpiry: string;
  proposedDates: {
    from: string;
    to: string;
  };
}

export interface AdditionalInformation {
  previousApplications?: boolean;
  refusedVisa?: boolean;
  criminalConvictions?: boolean;
  medicalConditions?: boolean;
  additionalDetails?: string;
}

export interface DocumentUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'uploaded' | 'verified' | 'rejected';
  checklistItemId?: string;
}

export interface ReviewData {
  completionPercentage: number;
  criticalItemsComplete: boolean;
  recommendedItemsComplete: boolean;
  readyForSubmission: boolean;
}

// Processing Phase Types
export interface OnboardingDetails {
  assignedSpecialist: string;
  onboardingDate: string;
  completionStatus: 'pending' | 'completed';
  documentsProvided: string[];
  nextSteps: string[];
}

export interface CheckpointCallDetails {
  callType: 'Video Consultation' | 'Phone Call' | 'In-Person Meeting';
  duration: string;
  specialist: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'rescheduled';
  scheduledDate: string;
  completedDate?: string;
  agenda: string[];
  meetingLink?: string;
  notes?: string;
  actionItems?: ActionItem[];
}

export interface ActionItem {
  id: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

export interface DocumentReviewDetails {
  reviewedBy: string;
  reviewDate: string;
  status: 'under_review' | 'approved' | 'requires_changes' | 'rejected';
  feedback: ReviewFeedback[];
  approvedDocuments: string[];
  rejectedDocuments: string[];
  missingDocuments: string[];
}

export interface ReviewFeedback {
  documentId: string;
  feedback: string;
  severity: 'info' | 'warning' | 'error';
  actionRequired: boolean;
}

// Application Phase Types
export interface FilingDetails {
  filedBy: string;
  filingDate: string;
  referenceNumber: string;
  status: 'preparing' | 'filed' | 'acknowledged';
}

export interface SubmissionDetails {
  submittedBy: string;
  submissionDate: string;
  confirmationNumber: string;
  status: 'submitted' | 'acknowledged' | 'under_review';
}

// Timeline Phase Types
export interface TimelineDetails {
  estimatedProcessingTime: string;
  currentPhase: string;
  milestones: Milestone[];
  expectedDecisionDate: string;
  lastUpdated: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  expectedDate: string;
  completedDate?: string;
  completed: boolean;
}

// Query Phase Types
export interface QueryDetails {
  queryId: string;
  fromDETE: boolean;
  queryDate: string;
  subject: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'answered' | 'overdue';
  attachments?: string[];
}

export interface QueryResponse {
  queryId: string;
  responseDate: string;
  response: string;
  attachments?: string[];
  submittedBy: string;
}

// Decision Phase Types
export interface DecisionDetails {
  decisionType: 'approved' | 'rejected' | 'conditional_approval';
  decisionDate: string;
  decisionBy: string;
  reasonCode?: string;
  conditions?: string[];
  appealEligible: boolean;
  appealDeadline?: string;
  permitDetails?: PermitDetails;
}

export interface PermitDetails {
  permitNumber: string;
  validFrom: string;
  validTo: string;
  conditions: string[];
}

export interface AppealDetails {
  appealId: string;
  appealDate: string;
  appealReason: string;
  status: 'submitted' | 'under_review' | 'decided';
  appealDecision?: {
    decision: 'upheld' | 'overturned' | 'dismissed';
    decisionDate: string;
    reasoning: string;
  };
}

// Checklist Types
export interface ChecklistProgress {
  critical: ChecklistItem[];
  recommended: ChecklistItem[];
  optional: ChecklistItem[];
  enhancement: ChecklistItem[];
  completionPercentage: number;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: 'pending' | 'completed' | 'not_applicable';
  documentType: string;
  required: boolean;
  conditional: boolean;
  riskOfOmission: string;
  specifications?: DocumentSpecification;
}

export interface DocumentSpecification {
  acceptedFormats: string[];
  maxSize: string;
  validityRequirement?: string;
  minimumAmount?: number;
  notes?: string;
}

// Validation Types
export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ConditionalLogic {
  condition: string;
  dependsOn: number[];
  showIf: (stepData: any) => boolean;
}

// Component Props Types
export interface CaseWorkflowManagerProps {
  mode: 'create' | 'edit' | 'view';
  caseId?: string;
  onSave: (data: CaseFormData) => void;
  onSubmit: (data: CaseFormData) => void;
  onCancel: () => void;
}

export interface ChecklistValidatorProps {
  formData: Partial<CaseFormData>;
  visaType: string;
  onChecklistUpdate: (progress: ChecklistProgress) => void;
  mode: 'validation' | 'display';
}

export interface StepRendererProps {
  step: number;
  formData: CaseFormData;
  checklistProgress: ChecklistProgress;
  onFieldChange: (field: string, value: any) => void;
  onStepComplete: (stepData: any) => void;
  validationErrors: Record<string, string>;
}
