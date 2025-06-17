import { Document, MockApiResponse } from './types';

// Mock document templates and requirements
export const mockDocumentRequirements = {
  'critical-skills': [
    {
      name: 'Passport and Current Visa',
      category: 'personal',
      required: true,
      description: 'Valid passport with current Irish visa/stamp',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5MB',
      notes: 'Must be clear and legible'
    },
    {
      name: 'Job Offer Letter',
      category: 'employment',
      required: true,
      description: 'Official job offer from Irish employer',
      acceptedFormats: ['PDF'],
      maxSize: '2MB',
      notes: 'Must include salary, start date, and job description'
    },
    {
      name: 'Educational Qualifications',
      category: 'education',
      required: true,
      description: 'Degree certificates and transcripts',
      acceptedFormats: ['PDF'],
      maxSize: '10MB',
      notes: 'May require QQI recognition for non-EU qualifications'
    },
    {
      name: 'CV/Resume',
      category: 'employment',
      required: true,
      description: 'Current curriculum vitae',
      acceptedFormats: ['PDF', 'DOC', 'DOCX'],
      maxSize: '2MB',
      notes: 'Should highlight relevant experience'
    },
    {
      name: 'Employment References',
      category: 'employment',
      required: false,
      description: 'Letters from previous employers',
      acceptedFormats: ['PDF'],
      maxSize: '5MB',
      notes: 'Recommended for stronger application'
    }
  ],
  'dependent-visa': [
    {
      name: 'Passport Copy',
      category: 'personal',
      required: true,
      description: 'Valid passport of applicant',
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5MB',
      notes: 'All pages including blank pages'
    },
    {
      name: 'Marriage Certificate',
      category: 'legal',
      required: true,
      description: 'Official marriage certificate',
      acceptedFormats: ['PDF'],
      maxSize: '2MB',
      notes: 'Must be apostilled if from outside Ireland'
    },
    {
      name: 'Birth Certificates',
      category: 'legal',
      required: true,
      description: 'Birth certificates for all children',
      acceptedFormats: ['PDF'],
      maxSize: '5MB',
      notes: 'Required for each dependent child'
    },
    {
      name: 'Sponsor\'s Employment Letter',
      category: 'employment',
      required: true,
      description: 'Employment confirmation from sponsor\'s employer',
      acceptedFormats: ['PDF'],
      maxSize: '2MB',
      notes: 'Must confirm current employment and salary'
    },
    {
      name: 'Bank Statements',
      category: 'financial',
      required: true,
      description: 'Recent bank statements (3 months)',
      acceptedFormats: ['PDF'],
      maxSize: '10MB',
      notes: 'Must show sufficient funds for family support'
    }
  ]
};

// Mock uploaded documents
export const mockUploadedDocuments: Document[] = [
  {
    id: 'doc-001',
    name: 'Passport Copy - John Doe.pdf',
    type: 'PDF',
    size: 2048576, // 2MB
    uploadDate: '2025-01-10T10:30:00Z',
    status: 'verified',
    url: '/documents/passport-john-doe.pdf',
    category: 'personal',
    expiryDate: '2030-05-01',
    notes: 'Valid Irish passport'
  },
  {
    id: 'doc-002',
    name: 'Marriage Certificate.pdf',
    type: 'PDF',
    size: 1024768, // 1MB
    uploadDate: '2025-01-10T11:15:00Z',
    status: 'verified',
    url: '/documents/marriage-certificate.pdf',
    category: 'legal',
    notes: 'Apostilled certificate from India'
  },
  {
    id: 'doc-003',
    name: 'Job Offer Letter - TechCorp.pdf',
    type: 'PDF',
    size: 512384, // 500KB
    uploadDate: '2025-01-12T09:20:00Z',
    status: 'pending',
    url: '/documents/job-offer-techcorp.pdf',
    category: 'employment',
    notes: 'Pending review by immigration specialist'
  },
  {
    id: 'doc-004',
    name: 'Educational Certificates.pdf',
    type: 'PDF',
    size: 3145728, // 3MB
    uploadDate: '2025-01-12T14:45:00Z',
    status: 'rejected',
    url: '/documents/educational-certificates.pdf',
    category: 'education',
    notes: 'Requires QQI recognition letter'
  },
  {
    id: 'doc-005',
    name: 'Bank Statements - January 2025.pdf',
    type: 'PDF',
    size: 1572864, // 1.5MB
    uploadDate: '2025-01-15T16:30:00Z',
    status: 'uploaded',
    url: '/documents/bank-statements-jan-2025.pdf',
    category: 'financial',
    notes: 'Recently uploaded, awaiting review'
  }
];

// Mock document vault organization
export const mockDocumentVault = {
  folders: [
    {
      id: 'folder-personal',
      name: 'Personal Documents',
      category: 'personal',
      documentCount: 3,
      lastUpdated: '2025-01-15T10:30:00Z'
    },
    {
      id: 'folder-employment',
      name: 'Employment Documents',
      category: 'employment',
      documentCount: 2,
      lastUpdated: '2025-01-12T09:20:00Z'
    },
    {
      id: 'folder-education',
      name: 'Educational Documents',
      category: 'education',
      documentCount: 1,
      lastUpdated: '2025-01-12T14:45:00Z'
    },
    {
      id: 'folder-financial',
      name: 'Financial Documents',
      category: 'financial',
      documentCount: 1,
      lastUpdated: '2025-01-15T16:30:00Z'
    },
    {
      id: 'folder-legal',
      name: 'Legal Documents',
      category: 'legal',
      documentCount: 1,
      lastUpdated: '2025-01-10T11:15:00Z'
    }
  ],
  totalDocuments: 8,
  totalSize: '12.5 MB',
  lastActivity: '2025-01-15T16:30:00Z'
};

// Mock document verification statuses
export const mockDocumentStatuses = {
  uploaded: {
    count: 2,
    description: 'Recently uploaded, awaiting initial review'
  },
  pending: {
    count: 1,
    description: 'Under review by immigration specialist'
  },
  verified: {
    count: 4,
    description: 'Approved and verified by specialist'
  },
  rejected: {
    count: 1,
    description: 'Requires correction or additional information'
  }
};

// Mock API responses
export const mockGetDocumentsResponse = (category?: string): MockApiResponse<Document[]> => {
  let documents = mockUploadedDocuments;
  
  if (category) {
    documents = documents.filter(doc => doc.category === category);
  }
  
  return {
    data: documents,
    success: true,
    message: 'Documents retrieved successfully',
    timestamp: new Date().toISOString()
  };
};

export const mockGetDocumentRequirementsResponse = (visaType: string): MockApiResponse<any[]> => {
  const requirements = mockDocumentRequirements[visaType as keyof typeof mockDocumentRequirements] || [];
  
  return {
    data: requirements,
    success: true,
    message: 'Document requirements retrieved successfully',
    timestamp: new Date().toISOString()
  };
};

// Mock functions for API simulation
export const mockDocumentApi = {
  getDocuments: async (category?: string): Promise<MockApiResponse<Document[]>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockGetDocumentsResponse(category);
  },

  getDocument: async (documentId: string): Promise<MockApiResponse<Document>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const document = mockUploadedDocuments.find(doc => doc.id === documentId);
    
    if (!document) {
      return {
        error: true,
        message: 'Document not found',
        statusCode: 404,
        success: false
      };
    }

    return {
      data: document,
      success: true,
      message: 'Document retrieved successfully',
      timestamp: new Date().toISOString()
    };
  },

  uploadDocument: async (file: File, category: string, notes?: string): Promise<MockApiResponse<Document>> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload time
    
    const newDocument: Document = {
      id: 'doc-' + Date.now(),
      name: file.name,
      type: file.type.split('/')[1].toUpperCase(),
      size: file.size,
      uploadDate: new Date().toISOString(),
      status: 'uploaded',
      category: category as any,
      notes: notes || 'Recently uploaded'
    };
    
    return {
      data: newDocument,
      success: true,
      message: 'Document uploaded successfully',
      timestamp: new Date().toISOString()
    };
  },

  deleteDocument: async (documentId: string): Promise<MockApiResponse<{ message: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const documentIndex = mockUploadedDocuments.findIndex(doc => doc.id === documentId);
    
    if (documentIndex === -1) {
      return {
        error: true,
        message: 'Document not found',
        statusCode: 404,
        success: false
      };
    }

    mockUploadedDocuments.splice(documentIndex, 1);
    
    return {
      data: { message: 'Document deleted successfully' },
      success: true,
      message: 'Document deleted successfully',
      timestamp: new Date().toISOString()
    };
  },

  updateDocumentStatus: async (documentId: string, status: string, notes?: string): Promise<MockApiResponse<Document>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const document = mockUploadedDocuments.find(doc => doc.id === documentId);
    
    if (!document) {
      return {
        error: true,
        message: 'Document not found',
        statusCode: 404,
        success: false
      };
    }

    document.status = status as any;
    if (notes) {
      document.notes = notes;
    }
    
    return {
      data: document,
      success: true,
      message: 'Document status updated successfully',
      timestamp: new Date().toISOString()
    };
  },

  getDocumentRequirements: async (visaType: string): Promise<MockApiResponse<any[]>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockGetDocumentRequirementsResponse(visaType);
  },

  getDocumentVault: async (): Promise<MockApiResponse<any>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: mockDocumentVault,
      success: true,
      message: 'Document vault retrieved successfully',
      timestamp: new Date().toISOString()
    };
  },

  downloadDocument: async (documentId: string): Promise<MockApiResponse<{ downloadUrl: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const document = mockUploadedDocuments.find(doc => doc.id === documentId);
    
    if (!document) {
      return {
        error: true,
        message: 'Document not found',
        statusCode: 404,
        success: false
      };
    }

    return {
      data: { downloadUrl: document.url || '/documents/download/' + documentId },
      success: true,
      message: 'Download URL generated successfully',
      timestamp: new Date().toISOString()
    };
  }
};
