// TypeScript interfaces for mock data structures
// These interfaces mirror expected backend API contracts

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: 'user' | 'admin' | 'specialist';
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  backendTokens: AuthTokens;
  error?: boolean;
  message?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  timestamp: string;
}

export interface ApiError {
  error: boolean;
  message: string;
  statusCode: number;
  details?: Record<string, any>;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

// Immigration-specific types
export interface VisaApplication {
  id: string;
  caseId: string;
  caseType: string;
  userName: string;
  userEmail: string;
  caseStatus: 'Open' | 'Closed' | 'Pending' | 'Under Review';
  priority: 'High' | 'Medium' | 'Low';
  startDate: string;
  endDate?: string;
  currentStep: number;
  totalSteps: number;
  completionPercentage: number;
  purchaseInfo: PurchaseInfo;
  checkpointCall: CheckpointCall;
  steps: ApplicationStep[];
  documents: Document[];
  timeline: TimelineEvent[];
}

export interface PurchaseInfo {
  packageName: string;
  amount: string;
  paymentMethod: string;
  transactionId: string;
  completedDate: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface CheckpointCall {
  callType: 'Video Consultation' | 'Phone Call' | 'In-Person';
  duration: string;
  specialist: string;
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  scheduledDate: string;
  completedDate?: string;
  agenda: string[];
  meetingLink?: string;
  notes?: string;
}

export interface ApplicationStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'not_applicable';
  completedDate?: string;
  estimatedDate?: string;
  startedDate?: string;
  details: Record<string, any>;
  requiredDocuments?: string[];
  completedDocuments?: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  status: 'uploaded' | 'verified' | 'rejected' | 'pending';
  url?: string;
  category: 'personal' | 'employment' | 'education' | 'financial' | 'legal';
  expiryDate?: string;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'document' | 'communication' | 'payment';
  status: 'completed' | 'pending' | 'cancelled';
  actor: string; // Who performed the action
}

// Training-specific types
export interface TrainingProgram {
  id: string;
  title: string;
  category: 'Initiator' | 'Accelerator';
  description: string;
  price: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  highlights: string[];
  modules: TrainingModule[];
  instructor: Instructor;
  enrollmentCount: number;
  rating: number;
  reviews: Review[];
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: string;
  completed: boolean;
  url?: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  experience: string;
  specializations: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

// Service-specific types
export interface ServicePackage {
  id: string;
  name: string;
  price: string;
  discount?: number;
  category: 'CV' | 'Interview' | 'Mentorship' | 'Comprehensive';
  description: string;
  features: string[];
  duration: string;
  popular?: boolean;
  includes: ServiceInclude[];
}

export interface ServiceInclude {
  name: string;
  description: string;
  included: boolean;
}

// Contact and Communication types
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  submittedAt: string;
  assignedTo?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Appointment {
  id: string;
  userId: string;
  mentorId: string;
  serviceId: string;
  scheduledDate: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  meetingLink?: string;
  notes?: string;
}

// Mock API Response Wrappers
export interface MockApiSuccess<T> extends ApiResponse<T> {
  success: true;
  error?: never;
}

export interface MockApiError extends ApiError {
  success: false;
  data?: never;
}

export type MockApiResponse<T> = MockApiSuccess<T> | MockApiError;
