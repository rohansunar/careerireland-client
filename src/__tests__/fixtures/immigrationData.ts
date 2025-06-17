// Test fixtures for immigration-related components

export const mockApplicationData = {
  caseId: "C001",
  caseType: "Dependent Visas",
  userName: "John Doe",
  caseStatus: "Open",
  priority: "High",
  startDate: "2025-05-01",
  endDate: "2025-05-15",
  currentStep: 3,
  purchaseInfo: {
    packageName: "Dependent Visa Premium Package",
    amount: "€1,200",
    paymentMethod: "Credit Card",
    transactionId: "TXN-001-2025",
    completedDate: "2025-05-01",
  },
  checkpointCall: {
    callType: "Video Consultation",
    duration: "45 minutes",
    specialist: "Sarah O'Connor",
    status: "in_progress" as const,
    scheduledDate: "2025-05-06",
    agenda: [
      "Review application status",
      "Discuss timeline expectations",
      "Address any concerns",
      "Next steps overview",
    ],
    meetingLink: "https://meet.careerireland.com/checkpoint-C001",
  },
  steps: [
    {
      id: 1,
      title: "Fill up Personal Details",
      description: "Personal information and family details form submission",
      status: "completed" as const,
      completedDate: "2025-05-02",
      details: {
        formsCompleted: [
          "Personal Information",
          "Family Details",
          "Employment History",
        ],
        documentsRequired: [
          "Passport Copy",
          "Marriage Certificate",
          "Birth Certificates",
        ],
      },
    },
    {
      id: 2,
      title: "Uploading Documents",
      description: "Required documents uploaded to secure portal",
      status: "completed" as const,
      completedDate: "2025-05-03",
      details: {
        uploadedDocuments: [
          "Passport Copy - John Doe",
          "Marriage Certificate",
          "Birth Certificate - Child 1",
          "Employment Letter",
          "Bank Statements (3 months)",
        ],
        totalDocuments: 5,
        verificationStatus: "Pending Review",
      },
    },
    {
      id: 3,
      title: "Document Reviewed",
      description: "Initial document review by immigration specialist",
      status: "in_progress" as const,
      completedDate: "2025-05-04",
      details: {
        reviewedBy: "Sarah O'Connor - Senior Immigration Specialist",
        reviewNotes:
          "All documents are in order. Minor formatting adjustment needed for employment letter.",
        additionalDocumentsRequired: [],
      },
    },
  ],
};

export const mockCasesData = [
  {
    id: "C001",
    caseType: "Dependent Visas",
    userName: "John Doe",
    caseStatus: "Open",
    priority: "High",
    startDate: "2025-05-01",
    endDate: "2025-05-15",
  },
  {
    id: "C002",
    caseType: "Stamp Extensions",
    userName: "Jane Smith",
    caseStatus: "Closed",
    priority: "Medium",
    startDate: "2025-04-10",
    endDate: "2025-05-10",
  },
  {
    id: "C003",
    caseType: "Work Permit Applications",
    userName: "Muklesh",
    caseStatus: "Pending",
    priority: "Low",
    startDate: "2025-04-10",
    endDate: "2025-05-10",
  },
];

export const mockUserProfile = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  emailVerified: true,
  image: "https://example.com/avatar.jpg",
  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2024-01-15T10:30:00Z"),
  provider: "google",
  total_spent: "$2,450",
  reviews: [],
  services: [],
  packages: [],
  training: [],
  immigration_services: [
    {
      id: "1",
      amount: 850,
      status: "In Progress",
      progress: "75%",
      createdAt: "2024-01-15",
      immigration_service: {
        id: "1",
        name: "Work Permit Application",
        amount: 850,
      },
    },
  ],
};

export const mockPurchaseInfo = {
  packageName: "Premium Immigration Package",
  amount: "€1,500",
  paymentMethod: "Credit Card",
  transactionId: "TXN-TEST-2025",
  completedDate: "2025-01-15",
};

export const mockCheckpointCall = {
  callType: "Video Consultation",
  duration: "60 minutes",
  specialist: "Immigration Expert",
  status: "pending" as const,
  scheduledDate: "2025-02-01",
  agenda: [
    "Review application progress",
    "Discuss next steps",
    "Answer questions",
  ],
  meetingLink: "https://meet.example.com/test-call",
};

export const mockApplicationSteps = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "First meeting with immigration specialist",
    status: "completed" as const,
    completedDate: "2025-01-10",
    details: {
      consultant: "Sarah O'Connor",
      duration: "45 minutes",
      outcome: "Eligibility confirmed",
    },
  },
  {
    id: 2,
    title: "Document Collection",
    description: "Gathering required documentation",
    status: "in_progress" as const,
    startedDate: "2025-01-15",
    details: {
      requiredDocuments: ["Passport", "Birth Certificate", "Employment Letter"],
      collectedDocuments: ["Passport", "Birth Certificate"],
      pendingDocuments: ["Employment Letter"],
    },
  },
  {
    id: 3,
    title: "Application Submission",
    description: "Submit application to authorities",
    status: "pending" as const,
    estimatedDate: "2025-02-01",
    details: {
      submissionMethod: "Online Portal",
      requiredFee: "€300",
    },
  },
];
