// Mock data for 12-Step Immigration Workflow
// Extends existing mock data with comprehensive workflow support

import { 
  ExtendedApplicationStep, 
  WorkflowPhase, 
  ChecklistProgress,
  CaseFormData,
  ChecklistItem
} from '../components/immigration/types/workflow.types';

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
    details: {
      formData: {
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
          contactEmail: "john.doe@example.com"
        }
      }
    }
  },
  {
    id: 2,
    title: "Visa Details",
    description: "Specify visa type, travel dates, and passport information",
    phase: "creation",
    status: "completed",
    stepType: "user_action",
    estimatedDuration: "20 minutes",
    completedDate: "2025-01-15T11:00:00Z",
    details: {
      formData: {
        visaDetails: {
          countryOfNationality: "Nigeria",
          reasonForTravel: "Employment",
          visaType: "Long Stay (D)",
          journeyType: "Single",
          purposeOfTravel: "Critical Skills Work Permit",
          passportType: "Ordinary Passport",
          passportNumber: "A12345678",
          issuingAuthority: "Nigeria Immigration Service",
          dateOfIssue: "01/01/2020",
          dateOfExpiry: "01/01/2030",
          proposedDates: {
            from: "01/03/2025",
            to: "01/03/2027"
          }
        }
      }
    }
  },
  {
    id: 3,
    title: "Additional Information",
    description: "Provide additional details about your application",
    phase: "creation",
    status: "completed",
    stepType: "user_action",
    estimatedDuration: "10 minutes",
    completedDate: "2025-01-15T11:15:00Z",
    details: {
      formData: {
        additionalInfo: {
          previousApplications: false,
          refusedVisa: false,
          criminalConvictions: false,
          medicalConditions: false,
          additionalDetails: "First-time applicant for Irish visa"
        }
      }
    }
  },
  {
    id: 4,
    title: "Document Upload",
    description: "Upload required documents and verify checklist completion",
    phase: "creation",
    status: "in_progress",
    stepType: "user_action",
    estimatedDuration: "30 minutes",
    details: {
      formData: {
        documents: [
          {
            id: "doc-001",
            name: "passport-copy.pdf",
            type: "Passport Copy",
            size: 2048576,
            uploadDate: "2025-01-15T12:00:00Z",
            status: "verified"
          },
          {
            id: "doc-002",
            name: "job-offer-letter.pdf",
            type: "Job Offer Letter",
            size: 1024768,
            uploadDate: "2025-01-15T12:05:00Z",
            status: "verified"
          }
        ]
      }
    }
  },
  {
    id: 5,
    title: "Review and Submit",
    description: "Review your application and submit for processing",
    phase: "creation",
    status: "pending",
    stepType: "user_action",
    estimatedDuration: "15 minutes",
    details: {
      formData: {
        reviewData: {
          completionPercentage: 85,
          criticalItemsComplete: true,
          recommendedItemsComplete: false,
          readyForSubmission: false
        }
      }
    }
  },

  // Phase 2: Processing (Steps 6-8)
  {
    id: 6,
    title: "Onboarding",
    description: "Client orientation and case assignment to specialist",
    phase: "processing",
    status: "pending",
    stepType: "professional_action",
    estimatedDuration: "1-2 business days",
    assignedTo: "Immigration Specialist Team",
    details: {
      onboardingInfo: {
        assignedSpecialist: "Sarah O'Connor",
        onboardingDate: "2025-01-16T09:00:00Z",
        completionStatus: "pending",
        documentsProvided: [],
        nextSteps: [
          "Assign case to specialist",
          "Initial document review",
          "Schedule checkpoint call"
        ]
      }
    }
  },
  {
    id: 7,
    title: "Checkpoint Call",
    description: "Professional consultation and guidance session",
    phase: "processing",
    status: "pending",
    stepType: "professional_action",
    estimatedDuration: "45 minutes",
    scheduledDate: "2025-01-17T14:00:00Z",
    assignedTo: "Sarah O'Connor",
    dependencies: [6],
    details: {
      checkpointCall: {
        callType: "Video Consultation",
        duration: "45 minutes",
        specialist: "Sarah O'Connor",
        status: "scheduled",
        scheduledDate: "2025-01-17T14:00:00Z",
        agenda: [
          "Review application details",
          "Discuss document requirements",
          "Address any questions or concerns",
          "Outline next steps"
        ],
        meetingLink: "https://meet.example.com/checkpoint-call-123"
      }
    }
  },
  {
    id: 8,
    title: "Document Review",
    description: "Expert document validation and feedback",
    phase: "processing",
    status: "pending",
    stepType: "professional_action",
    estimatedDuration: "2-3 business days",
    assignedTo: "Document Review Team",
    dependencies: [7],
    details: {
      documentReview: {
        reviewedBy: "Document Review Team",
        reviewDate: "2025-01-18T10:00:00Z",
        status: "under_review",
        feedback: [],
        approvedDocuments: [],
        rejectedDocuments: [],
        missingDocuments: []
      }
    }
  },

  // Phase 3: Application (Steps 9-11)
  {
    id: 9,
    title: "Application Filing",
    description: "Official submission preparation and filing",
    phase: "application",
    status: "pending",
    stepType: "professional_action",
    estimatedDuration: "1-2 business days",
    assignedTo: "Filing Team",
    dependencies: [8],
    details: {
      filingInfo: {
        filedBy: "Filing Team",
        filingDate: "2025-01-20T09:00:00Z",
        referenceNumber: "IRE-2025-001234",
        status: "preparing"
      }
    }
  },
  {
    id: 10,
    title: "Application Review",
    description: "Internal processing and validation before submission",
    phase: "application",
    status: "pending",
    stepType: "system_action",
    estimatedDuration: "1 business day",
    dependencies: [9],
    details: {}
  },
  {
    id: 11,
    title: "Application Submission",
    description: "Final submission to DETE (Department of Enterprise, Trade and Employment)",
    phase: "application",
    status: "pending",
    stepType: "external_action",
    estimatedDuration: "1 business day",
    dependencies: [10],
    details: {
      submissionInfo: {
        submittedBy: "System",
        submissionDate: "2025-01-22T09:00:00Z",
        confirmationNumber: "DETE-2025-567890",
        status: "submitted"
      }
    }
  },

  // Phase 4: Timeline (Step 12)
  {
    id: 12,
    title: "Timeline to Expect Outcome",
    description: "Processing timeline and status tracking",
    phase: "timeline",
    status: "pending",
    stepType: "system_action",
    estimatedDuration: "8-12 weeks",
    dependencies: [11],
    details: {
      timelineInfo: {
        estimatedProcessingTime: "8-12 weeks",
        currentPhase: "Initial Review",
        milestones: [
          {
            id: "milestone-001",
            title: "Application Received",
            description: "DETE has received your application",
            expectedDate: "2025-01-22",
            completed: false
          },
          {
            id: "milestone-002",
            title: "Initial Review Complete",
            description: "Initial document review completed",
            expectedDate: "2025-02-05",
            completed: false
          },
          {
            id: "milestone-003",
            title: "Decision Made",
            description: "Final decision on application",
            expectedDate: "2025-04-15",
            completed: false
          }
        ],
        expectedDecisionDate: "2025-04-15",
        lastUpdated: "2025-01-15T12:00:00Z"
      }
    }
  },

  // Phase 5: Queries (Steps 13-14) - Conditional
  {
    id: 13,
    title: "Queries from DETE",
    description: "Handle additional information requests from authorities",
    phase: "queries",
    status: "not_applicable",
    stepType: "external_action",
    isConditional: true,
    estimatedDuration: "Variable",
    details: {
      queries: []
    }
  },
  {
    id: 14,
    title: "Queries Answered",
    description: "Response submission and tracking",
    phase: "queries",
    status: "not_applicable",
    stepType: "user_action",
    isConditional: true,
    estimatedDuration: "Variable",
    dependencies: [13],
    details: {
      responses: []
    }
  },

  // Phase 6: Decision (Steps 15-17)
  {
    id: 15,
    title: "Work Permits Decision",
    description: "Final decision notification (Approved or Rejected)",
    phase: "decision",
    status: "pending",
    stepType: "external_action",
    estimatedDuration: "1-2 business days",
    dependencies: [12],
    details: {}
  },
  {
    id: 16,
    title: "Appeal",
    description: "Appeal process initiation (if rejected)",
    phase: "decision",
    status: "not_applicable",
    stepType: "user_action",
    isConditional: true,
    estimatedDuration: "4-6 weeks",
    dependencies: [15],
    details: {}
  },
  {
    id: 17,
    title: "Appeal Decision",
    description: "Final appeal outcome",
    phase: "decision",
    status: "not_applicable",
    stepType: "external_action",
    isConditional: true,
    estimatedDuration: "8-12 weeks",
    dependencies: [16],
    details: {}
  }
];

// Mock Checklist Progress Data
export const mockChecklistProgress: ChecklistProgress = {
  critical: [
    {
      id: "critical-001",
      title: "Valid Passport",
      description: "Passport valid for at least 6 months beyond intended stay",
      priority: "CRITICAL",
      status: "completed",
      documentType: "Identity Document",
      required: true,
      conditional: false,
      riskOfOmission: "Automatic rejection",
      specifications: {
        acceptedFormats: ["PDF", "JPG", "PNG"],
        maxSize: "5MB",
        validityRequirement: "6 months beyond stay",
        notes: "Must have at least 2 blank pages"
      }
    },
    {
      id: "critical-002",
      title: "Job Offer Letter",
      description: "Official job offer from Irish employer",
      priority: "CRITICAL",
      status: "completed",
      documentType: "Employment Document",
      required: true,
      conditional: false,
      riskOfOmission: "Automatic rejection",
      specifications: {
        acceptedFormats: ["PDF"],
        maxSize: "2MB",
        notes: "Must include salary, start date, and job description"
      }
    },
    {
      id: "critical-003",
      title: "Financial Evidence",
      description: "Proof of sufficient funds for stay",
      priority: "CRITICAL",
      status: "pending",
      documentType: "Financial Document",
      required: true,
      conditional: false,
      riskOfOmission: "Automatic rejection",
      specifications: {
        acceptedFormats: ["PDF"],
        maxSize: "5MB",
        minimumAmount: 3000,
        notes: "Bank statements for last 6 months"
      }
    }
  ],
  recommended: [
    {
      id: "recommended-001",
      title: "Employment References",
      description: "References from previous employers",
      priority: "RECOMMENDED",
      status: "pending",
      documentType: "Employment Document",
      required: false,
      conditional: false,
      riskOfOmission: "May delay processing or affect approval chances",
      specifications: {
        acceptedFormats: ["PDF"],
        maxSize: "2MB",
        notes: "Letters from previous employers"
      }
    }
  ],
  optional: [
    {
      id: "optional-001",
      title: "Travel Insurance",
      description: "Comprehensive travel insurance coverage",
      priority: "OPTIONAL",
      status: "not_applicable",
      documentType: "Insurance Document",
      required: false,
      conditional: true,
      riskOfOmission: "No impact on application",
      specifications: {
        acceptedFormats: ["PDF"],
        maxSize: "2MB",
        notes: "Recommended for short-stay visas"
      }
    }
  ],
  enhancement: [
    {
      id: "enhancement-001",
      title: "Property Documents",
      description: "Evidence of property ownership in home country",
      priority: "ENHANCEMENT",
      status: "not_applicable",
      documentType: "Property Document",
      required: false,
      conditional: false,
      riskOfOmission: "No impact on application",
      specifications: {
        acceptedFormats: ["PDF"],
        maxSize: "5MB",
        notes: "Strengthens ties to home country"
      }
    }
  ],
  completionPercentage: 67
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
    contactEmail: "john.doe@example.com"
  },
  visaDetails: {
    countryOfNationality: "Nigeria",
    reasonForTravel: "Employment",
    visaType: "Long Stay (D)",
    journeyType: "Single",
    purposeOfTravel: "Critical Skills Work Permit",
    passportType: "Ordinary Passport",
    passportNumber: "A12345678",
    issuingAuthority: "Nigeria Immigration Service",
    dateOfIssue: "01/01/2020",
    dateOfExpiry: "01/01/2030",
    proposedDates: {
      from: "01/03/2025",
      to: "01/03/2027"
    }
  },
  additionalInfo: {
    previousApplications: false,
    refusedVisa: false,
    criminalConvictions: false,
    medicalConditions: false,
    additionalDetails: "First-time applicant for Irish visa"
  },
  documents: [
    {
      id: "doc-001",
      name: "passport-copy.pdf",
      type: "Passport Copy",
      size: 2048576,
      uploadDate: "2025-01-15T12:00:00Z",
      status: "verified"
    },
    {
      id: "doc-002",
      name: "job-offer-letter.pdf",
      type: "Job Offer Letter",
      size: 1024768,
      uploadDate: "2025-01-15T12:05:00Z",
      status: "verified"
    }
  ]
};

// Helper functions for mock data
export const getStepsByPhase = (phase: WorkflowPhase): ExtendedApplicationStep[] => {
  return mock12StepWorkflow.filter(step => step.phase === phase);
};

export const getCurrentStep = (): ExtendedApplicationStep | undefined => {
  return mock12StepWorkflow.find(step => step.status === 'in_progress');
};

export const getCompletedSteps = (): ExtendedApplicationStep[] => {
  return mock12StepWorkflow.filter(step => step.status === 'completed');
};

export const getPendingSteps = (): ExtendedApplicationStep[] => {
  return mock12StepWorkflow.filter(step => step.status === 'pending');
};

export const getChecklistForStep = (stepId: number, checklistProgress?: ChecklistProgress): ChecklistItem[] => {
  if (!checklistProgress) return [];
  
  // Map specific checklist items to workflow steps
  const stepChecklistMapping: Record<number, string[]> = {
    1: [], // Personal info - no specific checklist items
    2: [], // Visa details - no specific checklist items
    3: [], // Additional info - no specific checklist items
    4: ['critical-001', 'critical-002', 'critical-003', 'recommended-001'], // Document upload
    5: [], // Review - all items
  };
  
  const itemIds = stepChecklistMapping[stepId] || [];
  const allItems = [
    ...checklistProgress.critical,
    ...checklistProgress.recommended,
    ...checklistProgress.optional,
    ...checklistProgress.enhancement
  ];
  
  return allItems.filter(item => itemIds.includes(item.id));
};
