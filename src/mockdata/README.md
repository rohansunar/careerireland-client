# Mock Data System Documentation

## Overview

The Career Ireland mock data system provides a comprehensive testing and development framework that simulates backend API responses and data structures. This system enables offline development, testing, and prototyping while maintaining compatibility with future backend integration.

## Directory Structure

```
src/mockdata/
├── README.md                    # This documentation
├── index.ts                     # Central export file
├── types.ts                     # TypeScript interfaces
├── file-mock.js                 # Static file mock for Jest
├── immigration-services.mock.ts # Immigration-related mock data
├── user-profiles.mock.ts        # User authentication and profiles
├── training-programs.mock.ts    # Training courses and enrollment
├── applications.mock.ts         # Application tracking and steps
├── documents.mock.ts            # Document management and vault
├── api-responses.mock.ts        # Common API responses and utilities
├── msw-handlers.ts              # Mock Service Worker handlers
├── msw-setup.ts                 # MSW configuration
└── mock-provider.tsx            # React context provider
```

## Features

### 🎯 **Comprehensive Data Coverage**
- **Immigration Services**: Visa applications, document requirements, process steps
- **User Management**: Authentication, profiles, permissions
- **Training Programs**: Courses, modules, progress tracking
- **Applications**: Case tracking, status updates, timelines
- **Documents**: Upload, verification, vault management
- **API Responses**: Success/error states, loading patterns

### 🔧 **Development Tools**
- **Mock Service Worker**: Intercepts HTTP requests in browser and tests
- **React Context Provider**: Easy access to mock data in components
- **TypeScript Support**: Fully typed interfaces matching API contracts
- **Utility Functions**: Pagination, search, sorting, filtering
- **Debug Panel**: Visual debugging tools for development

### 🧪 **Testing Integration**
- **Jest Configuration**: Automatic mock resolution
- **MSW Setup**: API mocking for integration tests
- **Test Utilities**: Helper functions for test scenarios
- **Coverage Support**: Excludes mock files from coverage reports

## Quick Start

### 1. Basic Usage

```typescript
import { mockApi, mockData } from '@/mockdata';

// Use mock API functions
const applications = await mockApi.immigration.getApplications();
const user = await mockApi.user.login('email@example.com', 'password');

// Access mock data directly
const visaTypes = mockData.visaTypes;
const trainingPrograms = mockData.trainingPrograms;
```

### 2. React Component Integration

```tsx
import { useMockApi, useMockData } from '@/mockdata/mock-provider';

function MyComponent() {
  const { api, isEnabled } = useMockApi();
  const { data } = useMockData();
  
  useEffect(() => {
    if (isEnabled) {
      // Use mock API
      api.immigration.getApplications().then(setApplications);
    } else {
      // Use real API
      fetch('/api/applications').then(res => res.json()).then(setApplications);
    }
  }, [isEnabled]);
  
  return <div>{/* Component content */}</div>;
}
```

### 3. Testing Setup

```typescript
// In your test file
import { setupMockServer } from '@/mockdata/msw-setup';

// Setup MSW for tests
setupMockServer();

describe('Component Tests', () => {
  test('should handle API responses', async () => {
    // Your test code here
    // API calls will be automatically mocked
  });
});
```

## Configuration

### Environment Variables

```bash
# Enable mocking in development
ENABLE_MOCKING=true

# Mock configuration
MOCK_API_DELAY_MIN=500
MOCK_API_DELAY_MAX=2000
MOCK_ERROR_RATE=0.1
```

### Jest Configuration

The mock system is automatically configured in `jest.config.js`:

```javascript
moduleNameMapper: {
  "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
    "<rootDir>/src/mockdata/file-mock.js",
}
```

## API Reference

### Mock API Functions

#### Immigration API
```typescript
mockApi.immigration.getApplications()
mockApi.immigration.getApplication(id)
mockApi.immigration.updateApplicationStep(id, stepId)
```

#### User API
```typescript
mockApi.user.login(email, password)
mockApi.user.register(userData)
mockApi.user.verifyEmail(token, otp)
mockApi.user.forgotPassword(email)
```

#### Training API
```typescript
mockApi.training.getPrograms()
mockApi.training.getProgram(id)
mockApi.training.enrollInProgram(trainingId, userId)
```

#### Document API
```typescript
mockApi.document.getDocuments(category?)
mockApi.document.uploadDocument(file, category, notes?)
mockApi.document.deleteDocument(id)
```

### Utility Functions

```typescript
import { mockUtils } from '@/mockdata';

// Generate delays
await mockUtils.delay(500, 2000);

// Paginate data
const paginated = mockUtils.paginate(data, page, limit);

// Search data
const results = mockUtils.search(data, query, ['name', 'email']);

// Sort data
const sorted = mockUtils.sort(data, 'createdAt', 'desc');
```

## Data Structures

### Visa Application
```typescript
interface VisaApplication {
  id: string;
  caseId: string;
  caseType: string;
  userName: string;
  caseStatus: 'Open' | 'Closed' | 'Pending' | 'Under Review';
  priority: 'High' | 'Medium' | 'Low';
  currentStep: number;
  totalSteps: number;
  steps: ApplicationStep[];
  documents: Document[];
  timeline: TimelineEvent[];
}
```

### User Profile
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: 'user' | 'admin' | 'specialist';
  createdAt: string;
  updatedAt: string;
}
```

### Training Program
```typescript
interface TrainingProgram {
  id: string;
  title: string;
  category: 'Initiator' | 'Accelerator';
  price: string;
  duration: string;
  modules: TrainingModule[];
  instructor: Instructor;
  rating: number;
}
```

## Best Practices

### 1. **Type Safety**
Always use TypeScript interfaces for mock data to ensure compatibility with real API contracts.

### 2. **Realistic Data**
Include realistic edge cases, error conditions, and data variations in mock responses.

### 3. **Performance Simulation**
Use appropriate delays to simulate real network conditions and loading states.

### 4. **Error Handling**
Test both success and error scenarios with comprehensive error response mocking.

### 5. **Data Consistency**
Maintain referential integrity between related mock data entities.

## Migration to Real API

When transitioning from mock to real API:

1. **Replace Mock Calls**: Update API calls to use real endpoints
2. **Verify Interfaces**: Ensure real API responses match TypeScript interfaces
3. **Update Tests**: Modify tests to use real API or continue using mocks
4. **Environment Configuration**: Use environment variables to toggle between mock and real APIs

## Troubleshooting

### Common Issues

1. **MSW Not Starting**: Ensure `mockServiceWorker.js` is in the public directory
2. **Type Errors**: Verify mock data matches TypeScript interfaces
3. **Test Failures**: Check MSW setup in test configuration
4. **Performance Issues**: Adjust mock delay settings

### Debug Tools

- Use the debug panel in development mode
- Check browser console for MSW logs
- Verify network tab shows intercepted requests
- Use TypeScript compiler to catch interface mismatches

## Contributing

When adding new mock data:

1. **Update Types**: Add new interfaces to `types.ts`
2. **Create Mock Data**: Add realistic mock data with variations
3. **Add API Functions**: Create corresponding mock API functions
4. **Update MSW Handlers**: Add new endpoint handlers
5. **Document Changes**: Update this README with new features
6. **Test Integration**: Ensure new mocks work in tests and development

---

For questions or issues, please refer to the project documentation or contact the development team.
