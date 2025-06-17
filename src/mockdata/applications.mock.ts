import { VisaApplication, ApplicationStep, MockApiResponse } from './types';

// Extended mock application steps for different visa types
export const mockApplicationSteps: Record<string, ApplicationStep[]> = {
  'critical-skills': [
    {
      id: 1,
      title: 'Initial Consultation',
      description: 'Assessment of eligibility and requirements',
      status: 'completed',
      completedDate: '2025-01-05',
      details: {
        consultationType: 'Video Call',
        duration: '60 minutes',
        specialist: 'Sarah O\'Connor',
        outcome: 'Eligible for Critical Skills Work Permit'
      }
    },
    {
      id: 2,
      title: 'Document Collection',
      description: 'Gathering all required documents',
      status: 'in_progress',
      startedDate: '2025-01-06',
      details: {
        requiredDocuments: [
          'Passport and current visa',
          'Job offer letter',
          'Educational qualifications',
          'CV/Resume',
          'Employment references'
        ],
        collectedDocuments: [
          'Passport and current visa',
          'Job offer letter',
          'CV/Resume'
        ],
        pendingDocuments: [
          'Educational qualifications',
          'Employment references'
        ]
      }
    },
    {
      id: 3,
      title: 'Application Preparation',
      description: 'Preparing and reviewing application forms',
      status: 'pending',
      estimatedDate: '2025-01-20',
      details: {
        formsRequired: [
          'Employment Permit Application Form',
          'Employer Declaration',
          'Labour Market Needs Test (if applicable)'
        ]
      }
    },
    {
      id: 4,
      title: 'Application Submission',
      description: 'Submitting application to DETE',
      status: 'pending',
      estimatedDate: '2025-01-25',
      details: {
        submissionMethod: 'Online Portal',
        fee: '€1,000',
        processingTime: '8-12 weeks'
      }
    },
    {
      id: 5,
      title: 'Application Processing',
      description: 'DETE processing and review',
      status: 'pending',
      estimatedDate: '2025-02-01',
      details: {
        stage: 'Initial Review',
        expectedDecision: 'April 2025'
      }
    },
    {
      id: 6,
      title: 'Decision & Collection',
      description: 'Permit decision and collection process',
      status: 'pending',
      estimatedDate: '2025-04-15',
      details: {
        decisionTypes: ['Approved', 'Rejected', 'Additional Information Required'],
        collectionLocation: 'GNIB Office or Online'
      }
    }
  ],
  'dependent-visa': [
    {
      id: 1,
      title: 'Fill up Personal Details',
      description: 'Personal information and family details form submission',
      status: 'completed',
      completedDate: '2025-05-02',
      details: {
        formsCompleted: [
          'Personal Information',
          'Family Details',
          'Employment History'
        ],
        documentsRequired: [
          'Passport Copy',
          'Marriage Certificate',
          'Birth Certificates'
        ]
      }
    },
    {
      id: 2,
      title: 'Uploading Documents',
      description: 'Required documents uploaded to secure portal',
      status: 'completed',
      completedDate: '2025-05-03',
      details: {
        uploadedDocuments: [
          'Passport Copy - John Doe',
          'Marriage Certificate',
          'Birth Certificate - Child 1',
          'Employment Letter',
          'Bank Statements (3 months)'
        ],
        totalDocuments: 5,
        verificationStatus: 'Pending Review'
      }
    },
    {
      id: 3,
      title: 'Document Reviewed',
      description: 'Initial document review by immigration specialist',
      status: 'in_progress',
      completedDate: '2025-05-04',
      details: {
        reviewedBy: 'Sarah O\'Connor - Senior Immigration Specialist',
        reviewNotes: 'All documents are in order. Minor formatting adjustment needed for employment letter.',
        additionalDocumentsRequired: []
      }
    },
    {
      id: 4,
      title: 'Application Filing',
      description: 'Official application submission to DETE',
      status: 'pending',
      estimatedDate: '2025-05-07',
      details: {
        filingMethod: 'Online Portal',
        applicationReference: 'To be assigned',
        requiredFee: '€300 (Government Fee)'
      }
    }
  ]
};

// Mock application tracking data
export const mockApplicationTracking = {
  'C001': {
    lastUpdated: '2025-01-15T10:30:00Z',
    nextAction: 'Upload educational qualifications',
    estimatedCompletion: '2025-04-15',
    milestones: [
      {
        date: '2025-01-05',
        title: 'Application Started',
        description: 'Initial consultation completed',
        completed: true
      },
      {
        date: '2025-01-20',
        title: 'Documents Submitted',
        description: 'All required documents uploaded',
        completed: false
      },
      {
        date: '2025-01-25',
        title: 'Application Filed',
        description: 'Application submitted to DETE',
        completed: false
      },
      {
        date: '2025-04-15',
        title: 'Decision Received',
        description: 'Final decision on application',
        completed: false
      }
    ]
  }
};

// Mock case status updates
export const mockCaseStatusUpdates = [
  {
    id: 'update-001',
    caseId: 'C001',
    date: '2025-01-15T10:30:00Z',
    title: 'Document Review Completed',
    description: 'All submitted documents have been reviewed. Minor formatting adjustment needed for employment letter.',
    type: 'document_review',
    priority: 'medium',
    actionRequired: false
  },
  {
    id: 'update-002',
    caseId: 'C001',
    date: '2025-01-10T14:20:00Z',
    title: 'Additional Document Required',
    description: 'Please upload your educational qualification certificates.',
    type: 'document_request',
    priority: 'high',
    actionRequired: true
  },
  {
    id: 'update-003',
    caseId: 'C002',
    date: '2025-01-08T09:15:00Z',
    title: 'Stamp Extension Approved',
    description: 'Your stamp extension has been approved. New expiry date: 2026-05-08',
    type: 'decision',
    priority: 'high',
    actionRequired: false
  }
];

// Mock application statistics
export const mockApplicationStats = {
  totalApplications: 156,
  activeApplications: 89,
  completedApplications: 52,
  pendingReview: 15,
  averageProcessingTime: '10-12 weeks',
  successRate: 94.2,
  byType: {
    'Critical Skills': 45,
    'General Work Permit': 38,
    'Dependent Visa': 32,
    'Stamp Extension': 28,
    'Other': 13
  },
  byStatus: {
    'Open': 89,
    'Under Review': 15,
    'Pending': 24,
    'Closed': 28
  }
};

// Mock API responses
export const mockGetApplicationStepsResponse = (caseType: string): MockApiResponse<ApplicationStep[]> => {
  const steps = mockApplicationSteps[caseType] || mockApplicationSteps['dependent-visa'];
  
  return {
    data: steps,
    success: true,
    message: 'Application steps retrieved successfully',
    timestamp: new Date().toISOString()
  };
};

export const mockGetApplicationTrackingResponse = (caseId: string): MockApiResponse<any> => {
  const tracking = mockApplicationTracking[caseId as keyof typeof mockApplicationTracking];
  
  if (!tracking) {
    return {
      error: true,
      message: 'Application tracking not found',
      statusCode: 404,
      success: false
    };
  }

  return {
    data: tracking,
    success: true,
    message: 'Application tracking retrieved successfully',
    timestamp: new Date().toISOString()
  };
};

// Mock functions for API simulation
export const mockApplicationApi = {
  getApplicationSteps: async (caseType: string): Promise<MockApiResponse<ApplicationStep[]>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockGetApplicationStepsResponse(caseType);
  },

  updateApplicationStep: async (caseId: string, stepId: number, updates: Partial<ApplicationStep>): Promise<MockApiResponse<ApplicationStep>> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const caseType = caseId.startsWith('C001') ? 'critical-skills' : 'dependent-visa';
    const steps = mockApplicationSteps[caseType];
    const step = steps.find(s => s.id === stepId);
    
    if (!step) {
      return {
        error: true,
        message: 'Application step not found',
        statusCode: 404,
        success: false
      };
    }

    const updatedStep = { ...step, ...updates };
    
    return {
      data: updatedStep,
      success: true,
      message: 'Application step updated successfully',
      timestamp: new Date().toISOString()
    };
  },

  getApplicationTracking: async (caseId: string): Promise<MockApiResponse<any>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockGetApplicationTrackingResponse(caseId);
  },

  getStatusUpdates: async (caseId: string): Promise<MockApiResponse<any[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updates = mockCaseStatusUpdates.filter(update => update.caseId === caseId);
    
    return {
      data: updates,
      success: true,
      message: 'Status updates retrieved successfully',
      timestamp: new Date().toISOString()
    };
  },

  getApplicationStats: async (): Promise<MockApiResponse<any>> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return {
      data: mockApplicationStats,
      success: true,
      message: 'Application statistics retrieved successfully',
      timestamp: new Date().toISOString()
    };
  },

  submitApplication: async (applicationData: any): Promise<MockApiResponse<{ caseId: string; referenceNumber: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const caseId = 'C' + String(Date.now()).slice(-3);
    const referenceNumber = 'REF-' + Date.now();
    
    return {
      data: {
        caseId,
        referenceNumber
      },
      success: true,
      message: 'Application submitted successfully',
      timestamp: new Date().toISOString()
    };
  }
};
