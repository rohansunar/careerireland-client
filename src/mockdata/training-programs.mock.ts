import { TrainingProgram, TrainingModule, Lesson, Instructor, Review, MockApiResponse } from './types';

// Mock instructors
export const mockInstructors: Instructor[] = [
  {
    id: 'instructor-001',
    name: 'Raghav Dixit',
    title: 'Senior Business Analyst & Training Director',
    bio: 'Raghav has over 15 years of experience in business analysis and has trained over 500 professionals in Ireland.',
    image: '/instructors/raghav-dixit.jpg',
    experience: '15+ years',
    specializations: ['Business Analysis', 'Agile Methodologies', 'Project Management', 'Technical Analysis']
  },
  {
    id: 'instructor-002',
    name: 'Sarah O\'Connor',
    title: 'Immigration Specialist & Career Coach',
    bio: 'Sarah specializes in Irish immigration law and career development with 10 years of experience.',
    image: '/instructors/sarah-oconnor.jpg',
    experience: '10+ years',
    specializations: ['Immigration Law', 'Career Coaching', 'Professional Development', 'Interview Preparation']
  }
];

// Mock training modules
export const mockTrainingModules: TrainingModule[] = [
  {
    id: 'module-001',
    title: 'Fundamentals of Business Analysis',
    description: 'Introduction to Business Analysis, Business Analysis Concepts and Knowledge Areas',
    duration: '4 weeks',
    lessons: [
      {
        id: 'lesson-001',
        title: 'Introduction to Business Analysis',
        type: 'video',
        duration: '45 minutes',
        completed: false,
        url: '/lessons/ba-intro.mp4'
      },
      {
        id: 'lesson-002',
        title: 'Business Analysis Concepts and Knowledge Areas',
        type: 'video',
        duration: '60 minutes',
        completed: false,
        url: '/lessons/ba-concepts.mp4'
      },
      {
        id: 'lesson-003',
        title: 'Requirement Lifecycle Management',
        type: 'text',
        duration: '30 minutes',
        completed: false
      },
      {
        id: 'lesson-004',
        title: 'Knowledge Check Quiz',
        type: 'quiz',
        duration: '15 minutes',
        completed: false
      }
    ],
    completed: false
  },
  {
    id: 'module-002',
    title: 'Agile Methodologies for Project Management',
    description: 'Advanced Project Management using Agile-Scrum methodologies',
    duration: '3 weeks',
    lessons: [
      {
        id: 'lesson-005',
        title: 'Introduction to Agile-Scrum',
        type: 'video',
        duration: '50 minutes',
        completed: false
      },
      {
        id: 'lesson-006',
        title: 'Scrum Team and Artifacts',
        type: 'video',
        duration: '40 minutes',
        completed: false
      },
      {
        id: 'lesson-007',
        title: 'Project Management Using Jira',
        type: 'video',
        duration: '55 minutes',
        completed: false
      },
      {
        id: 'lesson-008',
        title: 'Practical Assignment',
        type: 'assignment',
        duration: '2 hours',
        completed: false
      }
    ],
    completed: false
  }
];

// Mock reviews
export const mockReviews: Review[] = [
  {
    id: 'review-001',
    userId: 'user-001',
    userName: 'John Doe',
    rating: 5,
    comment: 'Excellent training program! The content is comprehensive and the instructors are very knowledgeable.',
    date: '2025-01-10',
    verified: true
  },
  {
    id: 'review-002',
    userId: 'user-002',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Great course structure and practical examples. Helped me land my current job as a Business Analyst.',
    date: '2025-01-08',
    verified: true
  },
  {
    id: 'review-003',
    userId: 'user-003',
    userName: 'Michael Chen',
    rating: 5,
    comment: 'The hands-on approach and real-world projects made all the difference. Highly recommended!',
    date: '2025-01-05',
    verified: true
  }
];

// Mock training programs
export const mockTrainingPrograms: TrainingProgram[] = [
  {
    id: 'training-001',
    title: 'Business Analysis Initiator Program',
    category: 'Initiator',
    description: 'Learn With Real Challenges + Online Training + Live Project + 3 Months Internship',
    price: '€1,099',
    duration: '6 months',
    level: 'Beginner',
    image: '/trainings/initiator.jpeg',
    highlights: [
      '90 Contact Hrs of Coaching',
      'Case Studies and Industry Projects',
      'Individual Sessions with Industry Mentor',
      '45 Hrs of Industrial Training on Live Projects',
      'For Freshers & Career Switchers',
      'Taught By Certified Industry Experts + 3 Months Internship Certification'
    ],
    modules: mockTrainingModules,
    instructor: mockInstructors[0],
    enrollmentCount: 245,
    rating: 4.8,
    reviews: mockReviews
  },
  {
    id: 'training-002',
    title: 'Business Analysis Accelerator Program',
    category: 'Accelerator',
    description: 'For People with more than 3 Years of Experience',
    price: '€599',
    duration: '3 months',
    level: 'Advanced',
    image: '/trainings/accelerator.jpeg',
    highlights: [
      'Interview and Career Support',
      'CV Preparations and Job Assistance',
      'Focused on Technical Business Analysis',
      'Dedicated Session for Technical Interview',
      '10 Coaching Sessions + 10 Advance Coaching Lessons on Technical Business Analysis',
      'High Impact Advance Knowledge on Technical Tools + Real Life Problems & Case Studies'
    ],
    modules: [mockTrainingModules[1]], // Only advanced modules
    instructor: mockInstructors[0],
    enrollmentCount: 156,
    rating: 4.9,
    reviews: mockReviews.slice(0, 2)
  }
];

// Mock enrollment data
export const mockEnrollmentData = {
  userId: 'user-001',
  enrollments: [
    {
      id: 'enrollment-001',
      trainingId: 'training-001',
      enrolledDate: '2025-01-01',
      status: 'active',
      progress: 35,
      completedModules: 0,
      totalModules: 2,
      certificateEarned: false,
      paymentStatus: 'completed'
    }
  ]
};

// Mock API responses
export const mockGetTrainingProgramsResponse: MockApiResponse<TrainingProgram[]> = {
  data: mockTrainingPrograms,
  success: true,
  message: 'Training programs retrieved successfully',
  timestamp: new Date().toISOString()
};

export const mockGetTrainingProgramResponse = (id: string): MockApiResponse<TrainingProgram> => {
  const program = mockTrainingPrograms.find(p => p.id === id);
  
  if (!program) {
    return {
      error: true,
      message: 'Training program not found',
      statusCode: 404,
      success: false
    };
  }

  return {
    data: program,
    success: true,
    message: 'Training program retrieved successfully',
    timestamp: new Date().toISOString()
  };
};

// Mock functions for API simulation
export const mockTrainingApi = {
  getPrograms: async (): Promise<MockApiResponse<TrainingProgram[]>> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockGetTrainingProgramsResponse;
  },

  getProgram: async (id: string): Promise<MockApiResponse<TrainingProgram>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockGetTrainingProgramResponse(id);
  },

  enrollInProgram: async (trainingId: string, userId: string): Promise<MockApiResponse<{ enrollmentId: string; paymentUrl: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const program = mockTrainingPrograms.find(p => p.id === trainingId);
    if (!program) {
      return {
        error: true,
        message: 'Training program not found',
        statusCode: 404,
        success: false
      };
    }

    return {
      data: {
        enrollmentId: 'enrollment-' + Date.now(),
        paymentUrl: 'https://payment.careerireland.com/checkout/' + trainingId
      },
      success: true,
      message: 'Enrollment initiated successfully',
      timestamp: new Date().toISOString()
    };
  },

  getEnrollments: async (userId: string): Promise<MockApiResponse<any[]>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      data: mockEnrollmentData.enrollments,
      success: true,
      message: 'Enrollments retrieved successfully',
      timestamp: new Date().toISOString()
    };
  },

  updateProgress: async (enrollmentId: string, moduleId: string, lessonId: string): Promise<MockApiResponse<{ progress: number }>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate progress update
    const newProgress = Math.min(100, Math.floor(Math.random() * 20) + 35);
    
    return {
      data: { progress: newProgress },
      success: true,
      message: 'Progress updated successfully',
      timestamp: new Date().toISOString()
    };
  },

  submitReview: async (trainingId: string, review: { rating: number; comment: string }): Promise<MockApiResponse<Review>> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newReview: Review = {
      id: 'review-' + Date.now(),
      userId: 'user-001',
      userName: 'Current User',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };
    
    return {
      data: newReview,
      success: true,
      message: 'Review submitted successfully',
      timestamp: new Date().toISOString()
    };
  }
};
