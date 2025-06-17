import { VisaApplication, Document, TimelineEvent, MockApiResponse } from './types';

// Mock visa applications data
export const mockVisaApplications: VisaApplication[] = [
  {
    id: 'app-001',
    caseId: 'C001',
    caseType: 'Dependent Visas',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    caseStatus: 'Open',
    priority: 'High',
    startDate: '2025-05-01',
    endDate: '2025-05-15',
    currentStep: 3,
    totalSteps: 13,
    completionPercentage: 23,
    purchaseInfo: {
      packageName: 'Dependent Visa Premium Package',
      amount: '€1,200',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-001-2025',
      completedDate: '2025-05-01',
      status: 'completed'
    },
    checkpointCall: {
      callType: 'Video Consultation',
      duration: '45 minutes',
      specialist: 'Sarah O\'Connor',
      status: 'in_progress',
      scheduledDate: '2025-05-06',
      agenda: [
        'Review application status',
        'Discuss timeline expectations',
        'Address any concerns',
        'Next steps overview'
      ],
      meetingLink: 'https://meet.careerireland.com/checkpoint-C001'
    },
    steps: [
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
      }
    ],
    documents: [
      {
        id: 'doc-001',
        name: 'Passport Copy - John Doe',
        type: 'PDF',
        size: 2048576,
        uploadDate: '2025-05-02',
        status: 'verified',
        category: 'personal',
        expiryDate: '2030-05-01'
      },
      {
        id: 'doc-002',
        name: 'Marriage Certificate',
        type: 'PDF',
        size: 1024768,
        uploadDate: '2025-05-02',
        status: 'verified',
        category: 'legal'
      }
    ],
    timeline: [
      {
        id: 'timeline-001',
        date: '2025-05-01',
        title: 'Application Started',
        description: 'Dependent visa application initiated',
        type: 'milestone',
        status: 'completed',
        actor: 'John Doe'
      },
      {
        id: 'timeline-002',
        date: '2025-05-02',
        title: 'Documents Uploaded',
        description: 'Initial documents uploaded successfully',
        type: 'document',
        status: 'completed',
        actor: 'John Doe'
      }
    ]
  },
  {
    id: 'app-002',
    caseId: 'C002',
    caseType: 'Stamp Extensions',
    userName: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    caseStatus: 'Closed',
    priority: 'Medium',
    startDate: '2025-04-10',
    endDate: '2025-05-10',
    currentStep: 1,
    totalSteps: 1,
    completionPercentage: 100,
    purchaseInfo: {
      packageName: 'Stamp Extension Standard Package',
      amount: '€800',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-002-2025',
      completedDate: '2025-04-10',
      status: 'completed'
    },
    checkpointCall: {
      callType: 'Video Consultation',
      duration: '30 minutes',
      specialist: 'Michael Kelly',
      status: 'completed',
      scheduledDate: '2025-04-15',
      completedDate: '2025-04-15',
      agenda: [
        'Review stamp extension requirements',
        'Confirm documentation',
        'Timeline discussion'
      ],
      meetingLink: 'https://meet.careerireland.com/checkpoint-C002'
    },
    steps: [
      {
        id: 11,
        title: 'Work Permit: Approved or Rejected',
        description: 'Stamp extension approved successfully',
        status: 'completed',
        completedDate: '2025-05-08',
        details: {
          decision: 'Approved',
          newExpiryDate: '2026-05-08',
          stampType: 'Stamp 1G',
          collectionRequired: true
        }
      }
    ],
    documents: [],
    timeline: []
  }
];

// Mock visa types and requirements
export const mockVisaTypes = [
  {
    id: 'critical-skills',
    title: 'Critical Skills Work Permit',
    description: 'A highly sought‐after permit for skilled professionals in Ireland.',
    category: 'Work Permits',
    processingTime: '8-12 weeks',
    fee: '€1,000',
    requirements: [
      'Job offer for at least 2 years',
      'Minimum salary €38,000 with degree or €64,000 with experience',
      'Eligible occupation on Critical Skills List',
      'Employer registered with Revenue Commissioners'
    ],
    documents: [
      'Passport and visa',
      'Job offer letter',
      'Educational qualifications',
      'CV/Resume',
      'Employment references'
    ]
  },
  {
    id: 'general-work',
    title: 'General Employment Permit',
    description: 'A flexible work permit option covering a broader range of occupations.',
    category: 'Work Permits',
    processingTime: '10-16 weeks',
    fee: '€1,000',
    requirements: [
      'Job offer meeting minimum salary €34,000',
      'Labour Market Needs Test (unless exempt)',
      'Employer 50% EEA national requirement',
      'Qualification and experience requirements'
    ],
    documents: [
      'Passport and visa',
      'Job offer letter',
      'Educational qualifications',
      'CV/Resume',
      'Labour Market Needs Test evidence'
    ]
  }
];

// Mock API responses
export const mockGetVisaApplicationsResponse: MockApiResponse<VisaApplication[]> = {
  data: mockVisaApplications,
  success: true,
  message: 'Visa applications retrieved successfully',
  timestamp: new Date().toISOString()
};

export const mockGetVisaApplicationResponse = (id: string): MockApiResponse<VisaApplication> => {
  const application = mockVisaApplications.find(app => app.id === id);
  
  if (!application) {
    return {
      error: true,
      message: 'Visa application not found',
      statusCode: 404,
      success: false
    };
  }

  return {
    data: application,
    success: true,
    message: 'Visa application retrieved successfully',
    timestamp: new Date().toISOString()
  };
};

// Mock functions for API simulation
export const mockImmigrationApi = {
  getApplications: async (): Promise<MockApiResponse<VisaApplication[]>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockGetVisaApplicationsResponse;
  },

  getApplication: async (id: string): Promise<MockApiResponse<VisaApplication>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockGetVisaApplicationResponse(id);
  },

  updateApplicationStep: async (id: string, stepId: number): Promise<MockApiResponse<VisaApplication>> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const application = mockVisaApplications.find(app => app.id === id);
    if (!application) {
      return {
        error: true,
        message: 'Application not found',
        statusCode: 404,
        success: false
      };
    }

    // Update step status
    const step = application.steps.find(s => s.id === stepId);
    if (step) {
      step.status = 'completed';
      step.completedDate = new Date().toISOString().split('T')[0];
    }

    return {
      data: application,
      success: true,
      message: 'Application step updated successfully',
      timestamp: new Date().toISOString()
    };
  }
};
