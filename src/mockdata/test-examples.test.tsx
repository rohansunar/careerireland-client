// Test examples showing how to use the mock data system with Jest
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setupMockServer } from './msw-setup';
import { TestableComponent, FormSubmissionExample } from './usage-examples';
import { mockApi, mockData } from './index';

// Setup MSW for all tests
setupMockServer();

// Helper function to create a test wrapper with QueryClient
const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Mock Data System Tests', () => {
  describe('Direct Mock API Usage', () => {
    test('should fetch visa applications successfully', async () => {
      const response = await mockApi.immigration.getApplications();
      
      expect(response.success).toBe(true);
      expect(response.data).toHaveLength(2);
      expect(response.data[0]).toHaveProperty('caseId');
      expect(response.data[0]).toHaveProperty('caseType');
      expect(response.data[0]).toHaveProperty('userName');
    });

    test('should handle user login with valid credentials', async () => {
      const response = await mockApi.user.login('john.doe@example.com', 'Password123!');
      
      expect(response.success).toBe(true);
      expect(response.data.user.email).toBe('john.doe@example.com');
      expect(response.data.backendTokens).toBeDefined();
    });

    test('should handle user login with invalid credentials', async () => {
      const response = await mockApi.user.login('invalid@example.com', 'wrongpassword');
      
      expect(response.success).toBe(false);
      expect(response.error).toBe(true);
      expect(response.message).toContain('Invalid email or password');
    });

    test('should upload document successfully', async () => {
      const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      const response = await mockApi.document.uploadDocument(mockFile, 'personal', 'Test upload');
      
      expect(response.success).toBe(true);
      expect(response.data.name).toBe('test.pdf');
      expect(response.data.category).toBe('personal');
      expect(response.data.status).toBe('uploaded');
    });
  });

  describe('Component Integration Tests', () => {
    test('should render user profile when user exists', async () => {
      const Wrapper = createTestWrapper();
      
      render(
        <Wrapper>
          <TestableComponent userId="user-001" />
        </Wrapper>
      );

      // Should show loading initially
      expect(screen.getByTestId('loading')).toBeInTheDocument();

      // Wait for user data to load
      await waitFor(() => {
        expect(screen.getByTestId('user-profile')).toBeInTheDocument();
      });

      // Check user data is displayed correctly
      expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
      expect(screen.getByTestId('user-email')).toHaveTextContent('john.doe@example.com');
      expect(screen.getByTestId('user-role')).toHaveTextContent('user');
    });

    test('should show error when user does not exist', async () => {
      const Wrapper = createTestWrapper();
      
      render(
        <Wrapper>
          <TestableComponent userId="non-existent-user" />
        </Wrapper>
      );

      await waitFor(() => {
        expect(screen.getByTestId('error')).toBeInTheDocument();
      });

      expect(screen.getByTestId('error')).toHaveTextContent('User not found');
    });

    test('should submit contact form successfully', async () => {
      const Wrapper = createTestWrapper();
      
      render(
        <Wrapper>
          <FormSubmissionExample />
        </Wrapper>
      );

      // Fill out the form
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'Test User' }
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByLabelText(/mobile/i), {
        target: { value: '+353 89 123 4567' }
      });
      fireEvent.change(screen.getByLabelText(/message/i), {
        target: { value: 'Test message' }
      });

      // Submit the form
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      // Check loading state
      expect(screen.getByRole('button', { name: /submitting/i })).toBeInTheDocument();

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(/form submitted successfully/i)).toBeInTheDocument();
      });
    });
  });

  describe('Mock Data Validation', () => {
    test('should have valid visa application data structure', () => {
      const visaApp = mockData.visaApplications[0];
      
      expect(visaApp).toHaveProperty('id');
      expect(visaApp).toHaveProperty('caseId');
      expect(visaApp).toHaveProperty('caseType');
      expect(visaApp).toHaveProperty('userName');
      expect(visaApp).toHaveProperty('caseStatus');
      expect(visaApp).toHaveProperty('priority');
      expect(visaApp).toHaveProperty('steps');
      expect(visaApp).toHaveProperty('documents');
      expect(visaApp).toHaveProperty('timeline');
      
      expect(Array.isArray(visaApp.steps)).toBe(true);
      expect(Array.isArray(visaApp.documents)).toBe(true);
      expect(Array.isArray(visaApp.timeline)).toBe(true);
    });

    test('should have valid user data structure', () => {
      const user = mockData.users[0];
      
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('emailVerified');
      expect(user).toHaveProperty('role');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
      
      expect(typeof user.emailVerified).toBe('boolean');
      expect(['user', 'admin', 'specialist']).toContain(user.role);
    });

    test('should have valid training program data structure', () => {
      const program = mockData.trainingPrograms[0];
      
      expect(program).toHaveProperty('id');
      expect(program).toHaveProperty('title');
      expect(program).toHaveProperty('category');
      expect(program).toHaveProperty('price');
      expect(program).toHaveProperty('duration');
      expect(program).toHaveProperty('modules');
      expect(program).toHaveProperty('instructor');
      expect(program).toHaveProperty('rating');
      
      expect(['Initiator', 'Accelerator']).toContain(program.category);
      expect(Array.isArray(program.modules)).toBe(true);
      expect(typeof program.rating).toBe('number');
    });

    test('should have valid document data structure', () => {
      const document = mockData.documents[0];
      
      expect(document).toHaveProperty('id');
      expect(document).toHaveProperty('name');
      expect(document).toHaveProperty('type');
      expect(document).toHaveProperty('size');
      expect(document).toHaveProperty('uploadDate');
      expect(document).toHaveProperty('status');
      expect(document).toHaveProperty('category');
      
      expect(['uploaded', 'verified', 'rejected', 'pending']).toContain(document.status);
      expect(['personal', 'employment', 'education', 'financial', 'legal']).toContain(document.category);
      expect(typeof document.size).toBe('number');
    });
  });

  describe('Error Handling', () => {
    test('should handle API errors gracefully', async () => {
      // Test with invalid application ID
      const response = await mockApi.immigration.getApplication('invalid-id');
      
      expect(response.success).toBe(false);
      expect(response.error).toBe(true);
      expect(response.statusCode).toBe(404);
      expect(response.message).toContain('not found');
    });

    test('should handle document deletion errors', async () => {
      const response = await mockApi.document.deleteDocument('non-existent-doc');
      
      expect(response.success).toBe(false);
      expect(response.error).toBe(true);
      expect(response.statusCode).toBe(404);
    });

    test('should handle user registration with existing email', async () => {
      const response = await mockApi.user.register({
        name: 'Test User',
        email: 'existing@example.com',
        password: 'Password123!'
      });
      
      expect(response.success).toBe(false);
      expect(response.error).toBe(true);
      expect(response.statusCode).toBe(409);
      expect(response.message).toContain('already exists');
    });
  });

  describe('Performance and Timing', () => {
    test('should simulate realistic API delays', async () => {
      const startTime = Date.now();
      await mockApi.immigration.getApplications();
      const endTime = Date.now();
      
      const duration = endTime - startTime;
      expect(duration).toBeGreaterThan(500); // Minimum delay
      expect(duration).toBeLessThan(3000); // Maximum reasonable delay for tests
    });

    test('should handle concurrent API calls', async () => {
      const promises = [
        mockApi.user.getUserProfile('user-001'),
        mockApi.immigration.getApplications(),
        mockApi.training.getPrograms(),
        mockApi.document.getDocuments()
      ];
      
      const results = await Promise.all(promises);
      
      results.forEach(result => {
        expect(result.success).toBe(true);
      });
    });
  });
});
