import { User, AuthResponse, AuthTokens, MockApiResponse } from './types';

// Mock user profiles
export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    emailVerified: true,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },
  {
    id: 'user-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    emailVerified: true,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    createdAt: '2025-01-02T00:00:00Z',
    updatedAt: '2025-01-14T15:45:00Z'
  },
  {
    id: 'user-003',
    name: 'Muklesh Patel',
    email: 'muklesh.patel@example.com',
    emailVerified: false,
    role: 'user',
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-10T00:00:00Z'
  },
  {
    id: 'specialist-001',
    name: 'Sarah O\'Connor',
    email: 'sarah.oconnor@careerireland.com',
    emailVerified: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    role: 'specialist',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2025-01-15T09:00:00Z'
  },
  {
    id: 'specialist-002',
    name: 'Michael Kelly',
    email: 'michael.kelly@careerireland.com',
    emailVerified: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'specialist',
    createdAt: '2024-08-15T00:00:00Z',
    updatedAt: '2025-01-14T16:20:00Z'
  }
];

// Mock authentication tokens
export const mockAuthTokens: AuthTokens = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTAwMSIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNzAyNDAwMCwiZXhwIjoxNzM3MTEwNDAwfQ.mock-signature',
  refreshToken: 'refresh-token-mock-12345',
  expiresIn: 1737110400000 // 24 hours from now
};

// Mock authentication states
export const mockAuthStates = {
  authenticated: {
    user: mockUsers[0],
    backendTokens: mockAuthTokens,
    error: false
  } as AuthResponse,
  
  unauthenticated: {
    user: null,
    backendTokens: null,
    error: true,
    message: 'User not authenticated'
  },
  
  invalidCredentials: {
    user: null,
    backendTokens: null,
    error: true,
    message: 'Invalid email or password'
  },
  
  emailNotVerified: {
    user: mockUsers[2],
    backendTokens: null,
    error: true,
    message: 'Please verify your email address'
  },
  
  accountLocked: {
    user: null,
    backendTokens: null,
    error: true,
    message: 'Account temporarily locked due to multiple failed login attempts'
  }
};

// Mock user registration data
export const mockRegistrationData = {
  success: {
    token: 'verification-token-12345',
    message: 'Registration successful. Please check your email for verification.'
  },
  emailExists: {
    error: true,
    message: 'An account with this email already exists'
  },
  weakPassword: {
    error: true,
    message: 'Password does not meet security requirements'
  }
};

// Mock password reset data
export const mockPasswordResetData = {
  success: {
    message: 'Password reset link sent to your email'
  },
  userNotFound: {
    error: true,
    message: 'No account found with this email address'
  },
  rateLimited: {
    error: true,
    message: 'Too many password reset attempts. Please try again later.'
  }
};

// Mock OTP verification data
export const mockOtpData = {
  success: {
    message: 'Email verified successfully'
  },
  invalidOtp: {
    error: true,
    message: 'Invalid or expired verification code'
  },
  expired: {
    error: true,
    message: 'Verification code has expired. Please request a new one.'
  }
};

// Mock API responses
export const mockLoginResponse = (email: string, password: string): MockApiResponse<AuthResponse> => {
  // Simulate different login scenarios
  if (email === 'john.doe@example.com' && password === 'Password123!') {
    return {
      data: mockAuthStates.authenticated,
      success: true,
      message: 'Login successful',
      timestamp: new Date().toISOString()
    };
  }
  
  if (email === 'muklesh.patel@example.com') {
    return {
      error: true,
      message: 'Please verify your email address before logging in',
      statusCode: 401,
      success: false
    };
  }
  
  return {
    error: true,
    message: 'Invalid email or password',
    statusCode: 401,
    success: false
  };
};

export const mockRegisterResponse = (email: string): MockApiResponse<{ token: string }> => {
  if (email === 'existing@example.com') {
    return {
      error: true,
      message: 'An account with this email already exists',
      statusCode: 409,
      success: false
    };
  }
  
  return {
    data: { token: 'verification-token-' + Date.now() },
    success: true,
    message: 'Registration successful. Please check your email for verification.',
    timestamp: new Date().toISOString()
  };
};

// Mock functions for API simulation
export const mockUserApi = {
  login: async (email: string, password: string): Promise<MockApiResponse<AuthResponse>> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return mockLoginResponse(email, password);
  },

  register: async (userData: { name: string; email: string; password: string }): Promise<MockApiResponse<{ token: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return mockRegisterResponse(userData.email);
  },

  verifyEmail: async (token: string, otp: string): Promise<MockApiResponse<{ message: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp === '123456') {
      return {
        data: { message: 'Email verified successfully' },
        success: true,
        message: 'Email verified successfully',
        timestamp: new Date().toISOString()
      };
    }
    
    return {
      error: true,
      message: 'Invalid or expired verification code',
      statusCode: 400,
      success: false
    };
  },

  forgotPassword: async (email: string): Promise<MockApiResponse<{ message: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const userExists = mockUsers.some(user => user.email === email);
    
    if (!userExists) {
      return {
        error: true,
        message: 'No account found with this email address',
        statusCode: 404,
        success: false
      };
    }
    
    return {
      data: { message: 'Password reset link sent to your email' },
      success: true,
      message: 'Password reset link sent to your email',
      timestamp: new Date().toISOString()
    };
  },

  resetPassword: async (token: string, password: string): Promise<MockApiResponse<{ message: string }>> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      data: { message: 'Password reset successfully' },
      success: true,
      message: 'Password reset successfully',
      timestamp: new Date().toISOString()
    };
  },

  refreshToken: async (refreshToken: string): Promise<MockApiResponse<AuthTokens>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newTokens: AuthTokens = {
      accessToken: 'new-access-token-' + Date.now(),
      refreshToken: 'new-refresh-token-' + Date.now(),
      expiresIn: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    };
    
    return {
      data: newTokens,
      success: true,
      message: 'Token refreshed successfully',
      timestamp: new Date().toISOString()
    };
  },

  getUserProfile: async (userId: string): Promise<MockApiResponse<User>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      return {
        error: true,
        message: 'User not found',
        statusCode: 404,
        success: false
      };
    }
    
    return {
      data: user,
      success: true,
      message: 'User profile retrieved successfully',
      timestamp: new Date().toISOString()
    };
  },

  updateUserProfile: async (userId: string, updates: Partial<User>): Promise<MockApiResponse<User>> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return {
        error: true,
        message: 'User not found',
        statusCode: 404,
        success: false
      };
    }
    
    const updatedUser = {
      ...mockUsers[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    mockUsers[userIndex] = updatedUser;
    
    return {
      data: updatedUser,
      success: true,
      message: 'User profile updated successfully',
      timestamp: new Date().toISOString()
    };
  }
};
