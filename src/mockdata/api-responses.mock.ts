import { MockApiResponse, LoadingState, ContactSubmission, Appointment, ServicePackage } from './types';

// Mock loading states for different scenarios
export const mockLoadingStates: Record<string, LoadingState> = {
  idle: {
    isLoading: false,
    error: null,
    data: null
  },
  loading: {
    isLoading: true,
    error: null,
    data: null
  },
  success: {
    isLoading: false,
    error: null,
    data: { message: 'Operation completed successfully' }
  },
  error: {
    isLoading: false,
    error: 'An error occurred while processing your request',
    data: null
  },
  networkError: {
    isLoading: false,
    error: 'Network connection failed. Please check your internet connection.',
    data: null
  },
  serverError: {
    isLoading: false,
    error: 'Server is temporarily unavailable. Please try again later.',
    data: null
  },
  validationError: {
    isLoading: false,
    error: 'Please check your input and try again.',
    data: null
  }
};

// Mock service packages
export const mockServicePackages: ServicePackage[] = [
  {
    id: 'cv-clinic',
    name: 'CV Clinic',
    price: '€199',
    category: 'CV',
    description: 'Get expert CV Review',
    features: [
      'Turnaround CV',
      'Cover Letter',
      'Career Discovery Session',
      'CV Error Log',
      'Skill Gap and Market Expectation Analysis',
      'CV Showcase Session'
    ],
    duration: '2-3 weeks',
    includes: [
      { name: 'CV Review', description: 'Professional CV analysis', included: true },
      { name: 'Cover Letter', description: 'Tailored cover letter', included: true },
      { name: 'LinkedIn Optimization', description: 'Profile enhancement', included: false }
    ]
  },
  {
    id: 'interviews-only',
    name: 'Interviews Only',
    price: '€249',
    discount: 15,
    category: 'Interview',
    description: 'For the best Interview Prep',
    features: [
      '1 HR Coaching Session',
      '1 Technical Coaching Session',
      '2 Mock Interviews',
      'Personal Assessment & Competency questions',
      'Improvement Feedback'
    ],
    duration: '3-4 weeks',
    popular: true,
    includes: [
      { name: 'HR Coaching', description: 'Human resources interview prep', included: true },
      { name: 'Technical Coaching', description: 'Technical interview preparation', included: true },
      { name: 'Mock Interviews', description: '2 practice interview sessions', included: true }
    ]
  },
  {
    id: 'career-mentorship',
    name: 'Career Mentorship',
    price: '€299',
    discount: 15,
    category: 'Mentorship',
    description: 'The Value Deal',
    features: [
      'Skill Gap Analysis',
      'CV Showcase Session',
      '1 Interview Coaching',
      '1 Technical Coaching',
      'Personal Assessment & Competency Questions',
      'Improvement Feedback'
    ],
    duration: '4-6 weeks',
    includes: [
      { name: 'Skill Assessment', description: 'Comprehensive skill evaluation', included: true },
      { name: 'Career Planning', description: 'Personalized career roadmap', included: true },
      { name: 'Ongoing Support', description: '3 months follow-up', included: true }
    ]
  }
];

// Mock contact submissions
export const mockContactSubmissions: ContactSubmission[] = [
  {
    id: 'contact-001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    mobile: '+353 89 123 4567',
    message: 'I need help with my Critical Skills Work Permit application.',
    status: 'new',
    submittedAt: '2025-01-15T10:30:00Z',
    priority: 'high'
  },
  {
    id: 'contact-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    mobile: '+353 87 987 6543',
    message: 'Interested in the Business Analysis training program.',
    status: 'in_progress',
    submittedAt: '2025-01-14T14:20:00Z',
    assignedTo: 'Raghav Dixit',
    priority: 'medium'
  }
];

// Mock appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'appointment-001',
    userId: 'user-001',
    mentorId: 'specialist-001',
    serviceId: 'career-mentorship',
    scheduledDate: '2025-01-20T10:00:00Z',
    duration: 60,
    status: 'scheduled',
    meetingLink: 'https://meet.careerireland.com/appointment-001',
    notes: 'Initial career consultation session'
  },
  {
    id: 'appointment-002',
    userId: 'user-002',
    mentorId: 'specialist-002',
    serviceId: 'interviews-only',
    scheduledDate: '2025-01-18T14:30:00Z',
    duration: 45,
    status: 'completed',
    notes: 'Mock interview session completed successfully'
  }
];

// Mock error responses for different scenarios
export const mockErrorResponses = {
  unauthorized: {
    error: true,
    message: 'Authentication required. Please log in to continue.',
    statusCode: 401,
    success: false
  },
  forbidden: {
    error: true,
    message: 'You do not have permission to access this resource.',
    statusCode: 403,
    success: false
  },
  notFound: {
    error: true,
    message: 'The requested resource was not found.',
    statusCode: 404,
    success: false
  },
  validationError: {
    error: true,
    message: 'Validation failed. Please check your input.',
    statusCode: 422,
    success: false,
    details: {
      email: 'Please enter a valid email address',
      password: 'Password must be at least 8 characters long'
    }
  },
  serverError: {
    error: true,
    message: 'Internal server error. Please try again later.',
    statusCode: 500,
    success: false
  },
  rateLimited: {
    error: true,
    message: 'Too many requests. Please try again in a few minutes.',
    statusCode: 429,
    success: false
  },
  maintenanceMode: {
    error: true,
    message: 'System is under maintenance. Please try again later.',
    statusCode: 503,
    success: false
  }
};

// Mock success responses
export const mockSuccessResponses = {
  created: {
    success: true,
    message: 'Resource created successfully',
    timestamp: new Date().toISOString()
  },
  updated: {
    success: true,
    message: 'Resource updated successfully',
    timestamp: new Date().toISOString()
  },
  deleted: {
    success: true,
    message: 'Resource deleted successfully',
    timestamp: new Date().toISOString()
  },
  emailSent: {
    success: true,
    message: 'Email sent successfully',
    timestamp: new Date().toISOString()
  },
  paymentProcessed: {
    success: true,
    message: 'Payment processed successfully',
    timestamp: new Date().toISOString()
  }
};

// Mock API response generators
export const mockApiResponseGenerator = {
  // Generate paginated response
  paginated: <T>(data: T[], page: number = 1, limit: number = 10): MockApiResponse<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / limit);

    return {
      data: {
        data: paginatedData,
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      },
      success: true,
      message: 'Data retrieved successfully',
      timestamp: new Date().toISOString()
    };
  },

  // Generate search response
  search: <T>(data: T[], query: string, searchFields: string[]): MockApiResponse<{
    results: T[];
    query: string;
    total: number;
    searchTime: number;
  }> => {
    const searchTime = Math.random() * 100 + 50; // 50-150ms
    
    // Simple search simulation
    const results = data.filter(item => {
      return searchFields.some(field => {
        const value = (item as any)[field];
        return value && value.toString().toLowerCase().includes(query.toLowerCase());
      });
    });

    return {
      data: {
        results,
        query,
        total: results.length,
        searchTime: Math.round(searchTime)
      },
      success: true,
      message: 'Search completed successfully',
      timestamp: new Date().toISOString()
    };
  },

  // Generate random delay response
  withDelay: async <T>(response: MockApiResponse<T>, minDelay: number = 500, maxDelay: number = 2000): Promise<MockApiResponse<T>> => {
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    await new Promise(resolve => setTimeout(resolve, delay));
    return response;
  },

  // Generate random error response
  randomError: (successRate: number = 0.8): MockApiResponse<any> => {
    if (Math.random() < successRate) {
      return mockSuccessResponses.created;
    }
    
    const errors = Object.values(mockErrorResponses);
    const randomError = errors[Math.floor(Math.random() * errors.length)];
    return randomError;
  }
};

// Mock functions for common API operations
export const mockCommonApi = {
  getServicePackages: async (): Promise<MockApiResponse<ServicePackage[]>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      data: mockServicePackages,
      success: true,
      message: 'Service packages retrieved successfully',
      timestamp: new Date().toISOString()
    };
  },

  submitContactForm: async (formData: Omit<ContactSubmission, 'id' | 'status' | 'submittedAt' | 'priority'>): Promise<MockApiResponse<ContactSubmission>> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newSubmission: ContactSubmission = {
      id: 'contact-' + Date.now(),
      ...formData,
      status: 'new',
      submittedAt: new Date().toISOString(),
      priority: 'medium'
    };
    
    return {
      data: newSubmission,
      success: true,
      message: 'Contact form submitted successfully. We will get back to you within 24 hours.',
      timestamp: new Date().toISOString()
    };
  },

  scheduleAppointment: async (appointmentData: Omit<Appointment, 'id' | 'status'>): Promise<MockApiResponse<Appointment>> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const newAppointment: Appointment = {
      id: 'appointment-' + Date.now(),
      ...appointmentData,
      status: 'scheduled'
    };
    
    return {
      data: newAppointment,
      success: true,
      message: 'Appointment scheduled successfully',
      timestamp: new Date().toISOString()
    };
  },

  getAppointments: async (userId: string): Promise<MockApiResponse<Appointment[]>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const userAppointments = mockAppointments.filter(apt => apt.userId === userId);
    
    return {
      data: userAppointments,
      success: true,
      message: 'Appointments retrieved successfully',
      timestamp: new Date().toISOString()
    };
  }
};
