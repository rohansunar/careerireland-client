// Mock data for 12-Step Immigration Workflow
// This file contains minimal mock data required for CaseWorkflowManager component

import {
  ExtendedApplicationStep,
  CaseFormData,
  ChecklistProgress,
} from "../components/immigration/types/workflow.types";

// Mock 12-Step Workflow Data
export const mock12StepWorkflow: ExtendedApplicationStep[] = [
  // Phase 1: Creation (Steps 1-5)
  {
    id: 1,
    title: "Personal Information",
    description: "Complete your personal details and contact information",
    phase: "creation",
    status: "completed",
    stepType: "user_action",
    estimatedDuration: "15 minutes",
    completedDate: "2025-01-15T10:30:00Z",
    details: {},
  },
  {
    id: 2,
    title: "Visa Details",
    description: "Specify visa type, purpose, and travel dates",
    phase: "creation",
    status: "completed",
    stepType: "user_action",
    estimatedDuration: "20 minutes",
    completedDate: "2025-01-15T11:00:00Z",
    details: {},
  },
  {
    id: 3,
    title: "Additional Information",
    description: "Provide additional details and declarations",
    phase: "creation",
    status: "in_progress",
    stepType: "user_action",
    estimatedDuration: "10 minutes",
    details: {},
  },
  {
    id: 4,
    title: "Document Upload",
    description: "Upload required documents and certificates",
    phase: "creation",
    status: "pending",
    stepType: "user_action",
    estimatedDuration: "30 minutes",
    details: {},
  },
  {
    id: 5,
    title: "Review & Submit",
    description: "Review all information and submit application",
    phase: "creation",
    status: "pending",
    stepType: "user_action",
    estimatedDuration: "15 minutes",
    details: {},
  },

  // Phase 2: Processing (Steps 6-8)
  {
    id: 6,
    title: "Professional Onboarding",
    description: "Initial consultation with immigration specialist",
    phase: "processing",
    status: "pending",
    stepType: "professional_action",
    estimatedDuration: "2-3 business days",
    details: {
      onboardingInfo: {
        assignedSpecialist: "Sarah O'Connor",
        onboardingDate: "2025-01-20T09:00:00Z",
        completionStatus: "pending",
        documentsProvided: [],
        nextSteps: [
          "Schedule initial consultation",
          "Review application documents",
        ],
      },
    },
  },
  {
    id: 7,
    title: "Checkpoint Call",
    description: "Video consultation with specialist",
    phase: "processing",
    status: "pending",
    stepType: "professional_action",
    estimatedDuration: "45 minutes",
    details: {
      checkpointCall: {
        callType: "Video Consultation",
        duration: "45 minutes",
        specialist: "Sarah O'Connor",
        status: "scheduled",
        scheduledDate: "2025-01-22T14:00:00Z",
        agenda: [
          "Review application completeness",
          "Discuss document requirements",
          "Address any questions or concerns",
        ],
        meetingLink: "https://meet.careerireland.com/room/abc123",
      },
    },
  },
  {
    id: 8,
    title: "Document Review",
    description: "Professional review of all submitted documents",
    phase: "processing",
    status: "pending",
    stepType: "professional_action",
    estimatedDuration: "3-5 business days",
    details: {
      documentReview: {
        reviewedBy: "Sarah O'Connor",
        reviewDate: "2025-01-25T10:00:00Z",
        status: "under_review",
        feedback: [],
        approvedDocuments: [],
        rejectedDocuments: [],
        missingDocuments: [],
      },
    },
  },

  // Phase 3: Application (Steps 9-10)
  {
    id: 9,
    title: "Application Filing",
    description: "Official filing of application with authorities",
    phase: "application",
    status: "pending",
    stepType: "professional_action",
    estimatedDuration: "1-2 business days",
    details: {
      filingInfo: {
        filedBy: "Career Ireland Team",
        filingDate: "2025-01-30T09:00:00Z",
        referenceNumber: "CI-2025-001234",
        status: "preparing",
      },
    },
  },
  {
    id: 10,
    title: "Submission Confirmation",
    description: "Confirmation of successful submission",
    phase: "application",
    status: "pending",
    stepType: "system_action",
    estimatedDuration: "Same day",
    details: {
      submissionInfo: {
        submittedBy: "Career Ireland System",
        submissionDate: "2025-01-30T15:00:00Z",
        confirmationNumber: "CONF-2025-001234",
        status: "submitted",
      },
    },
  },

  // Phase 4: Timeline (Step 11)
  {
    id: 11,
    title: "Processing Timeline",
    description: "Track application processing progress",
    phase: "timeline",
    status: "pending",
    stepType: "system_action",
    estimatedDuration: "8-12 weeks",
    details: {
      timelineInfo: {
        estimatedProcessingTime: "8-12 weeks",
        currentPhase: "Initial Review",
        milestones: [
          {
            id: "m1",
            title: "Application Received",
            description: "Application received by DETE",
            expectedDate: "2025-01-30",
            completed: false,
          },
          {
            id: "m2",
            title: "Initial Review",
            description: "Initial completeness check",
            expectedDate: "2025-02-06",
            completed: false,
          },
          {
            id: "m3",
            title: "Detailed Assessment",
            description: "Detailed review of application",
            expectedDate: "2025-02-20",
            completed: false,
          },
          {
            id: "m4",
            title: "Decision Made",
            description: "Final decision on application",
            expectedDate: "2025-03-15",
            completed: false,
          },
        ],
        expectedDecisionDate: "2025-03-15",
        lastUpdated: "2025-01-15T10:30:00Z",
      },
    },
  },

  // Phase 5: Queries (Step 12)
  {
    id: 12,
    title: "Query Management",
    description: "Handle any additional information requests",
    phase: "queries",
    status: "pending",
    stepType: "external_action",
    estimatedDuration: "As needed",
    details: {
      queries: [],
      responses: [],
    },
  },

  // Phase 6: Decision (Steps 13-15)
  {
    id: 13,
    title: "Decision Notification",
    description: "Receive official decision on application",
    phase: "decision",
    status: "pending",
    stepType: "external_action",
    estimatedDuration: "1-2 business days",
    details: {
      decision: {
        decisionType: "approved",
        decisionDate: "2025-03-15T10:00:00Z",
        decisionBy: "DETE Immigration Officer",
        appealEligible: true,
        appealDeadline: "2025-04-15",
        permitDetails: {
          permitNumber: "IRP-2025-001234",
          validFrom: "2025-06-01",
          validTo: "2026-06-01",
          conditions: ["Must register with local authorities within 30 days"],
        },
      },
    },
  },
];

// Mock Checklist Progress
export const mockChecklistProgress: ChecklistProgress = {
  critical: [
    {
      id: "c1",
      title: "Valid Passport",
      description: "Passport valid for at least 6 months",
      priority: "CRITICAL",
      status: "completed",
      documentType: "passport",
      required: true,
      conditional: false,
      riskOfOmission: "Application will be rejected",
    },
    {
      id: "c2",
      title: "Passport Photos",
      description: "Recent passport-sized photographs",
      priority: "CRITICAL",
      status: "pending",
      documentType: "photo",
      required: true,
      conditional: false,
      riskOfOmission: "Application will be rejected",
    },
  ],
  recommended: [
    {
      id: "r1",
      title: "Bank Statements",
      description: "3 months of bank statements",
      priority: "RECOMMENDED",
      status: "pending",
      documentType: "financial",
      required: false,
      conditional: true,
      riskOfOmission: "May delay processing",
    },
  ],
  optional: [],
  enhancement: [],
  completionPercentage: 25,
};

// Mock Case Form Data
export const mockCaseFormData: Partial<CaseFormData> = {
  personalInfo: {
    surname: "Doe",
    forename: "John",
    dateOfBirth: "15/03/1990",
    gender: "Male",
    countryOfBirth: "Nigeria",
    currentLocation: "Lagos, Nigeria",
    address: {
      line1: "123 Main Street",
      line2: "Victoria Island",
    },
    contactPhone: "+234 801 234 5678",
    contactEmail: "john.doe@example.com",
  },
  visaDetails: {
    countryOfNationality: "Nigeria",
    reasonForTravel: "Work",
    visaType: "Long Stay (D)",
    journeyType: "Single",
    purposeOfTravel: "Employment",
    passportType: "Ordinary",
    passportNumber: "A12345678",
    issuingAuthority: "Nigeria Immigration Service",
    dateOfIssue: "01/01/2020",
    dateOfExpiry: "01/01/2030",
    proposedDates: {
      from: "01/06/2025",
      to: "01/06/2026",
    },
  },
  additionalInfo: {
    previousApplications: false,
    refusedVisa: false,
    criminalConvictions: false,
    medicalConditions: false,
    additionalDetails: "",
  },
  documents: [],
  reviewData: {
    completionPercentage: 60,
    criticalItemsComplete: false,
    recommendedItemsComplete: false,
    readyForSubmission: false,
  },
};
