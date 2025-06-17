// Central export file for all mock data
// This file provides a single import point for all mock data and API functions

// Type exports
export * from './types';

// Mock data exports
export * from './immigration-services.mock';
export * from './user-profiles.mock';
export * from './training-programs.mock';
export * from './applications.mock';
export * from './documents.mock';
export * from './api-responses.mock';

// Consolidated mock API object for easy access
import { mockImmigrationApi } from './immigration-services.mock';
import { mockUserApi } from './user-profiles.mock';
import { mockTrainingApi } from './training-programs.mock';
import { mockApplicationApi } from './applications.mock';
import { mockDocumentApi } from './documents.mock';
import { mockCommonApi } from './api-responses.mock';

export const mockApi = {
  immigration: mockImmigrationApi,
  user: mockUserApi,
  training: mockTrainingApi,
  application: mockApplicationApi,
  document: mockDocumentApi,
  common: mockCommonApi
};

// Mock data collections for easy access
import { mockVisaApplications, mockVisaTypes } from './immigration-services.mock';
import { mockUsers, mockAuthStates } from './user-profiles.mock';
import { mockTrainingPrograms, mockInstructors } from './training-programs.mock';
import { mockUploadedDocuments, mockDocumentRequirements } from './documents.mock';
import { mockServicePackages, mockLoadingStates } from './api-responses.mock';

export const mockData = {
  // Immigration data
  visaApplications: mockVisaApplications,
  visaTypes: mockVisaTypes,
  
  // User data
  users: mockUsers,
  authStates: mockAuthStates,
  
  // Training data
  trainingPrograms: mockTrainingPrograms,
  instructors: mockInstructors,
  
  // Document data
  documents: mockUploadedDocuments,
  documentRequirements: mockDocumentRequirements,
  
  // Service data
  servicePackages: mockServicePackages,
  
  // UI states
  loadingStates: mockLoadingStates
};

// Utility functions for mock data manipulation
export const mockUtils = {
  // Generate random delay for API simulation
  delay: (min: number = 500, max: number = 2000): Promise<void> => {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  },

  // Generate random ID
  generateId: (prefix: string = 'id'): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Generate random date within range
  randomDate: (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString();
  },

  // Simulate network error
  simulateNetworkError: (errorRate: number = 0.1): boolean => {
    return Math.random() < errorRate;
  },

  // Format file size
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Generate mock pagination
  paginate: <T>(data: T[], page: number = 1, limit: number = 10) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / limit);

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: data.length,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  },

  // Search through mock data
  search: <T>(data: T[], query: string, searchFields: (keyof T)[]): T[] => {
    if (!query.trim()) return data;
    
    return data.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(query.toLowerCase());
      });
    });
  },

  // Sort mock data
  sort: <T>(data: T[], field: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
    return [...data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  },

  // Filter mock data
  filter: <T>(data: T[], filters: Partial<T>): T[] => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        return item[key as keyof T] === value;
      });
    });
  }
};

// Mock environment configuration
export const mockConfig = {
  apiBaseUrl: 'https://api.careerireland.com',
  apiVersion: 'v1',
  defaultTimeout: 10000,
  retryAttempts: 3,
  enableMocking: process.env.NODE_ENV === 'development' || process.env.ENABLE_MOCKING === 'true',
  mockDelay: {
    min: 500,
    max: 2000
  },
  errorSimulation: {
    enabled: process.env.NODE_ENV === 'development',
    errorRate: 0.1 // 10% chance of simulated errors
  }
};

// Default export for convenience
export default {
  api: mockApi,
  data: mockData,
  utils: mockUtils,
  config: mockConfig
};
