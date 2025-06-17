// Mock Service Worker setup for browser and Node.js environments
import { setupWorker } from 'msw/browser';
import { setupServer } from 'msw/node';
import { handlers } from './msw-handlers';

// Browser setup for development
export const worker = setupWorker(...handlers);

// Node.js setup for testing
export const server = setupServer(...handlers);

// Setup function for browser environment
export const setupMockWorker = async () => {
  if (typeof window !== 'undefined') {
    // Only run in browser environment
    try {
      await worker.start({
        onUnhandledRequest: 'warn',
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      });
      console.log('🔧 Mock Service Worker started');
    } catch (error) {
      console.error('Failed to start Mock Service Worker:', error);
    }
  }
};

// Setup function for test environment
export const setupMockServer = () => {
  // Start server before all tests
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'error'
    });
  });

  // Reset handlers after each test
  afterEach(() => {
    server.resetHandlers();
  });

  // Clean up after all tests
  afterAll(() => {
    server.close();
  });
};

// Utility to enable/disable mocking based on environment
export const enableMocking = async () => {
  const shouldMock = 
    process.env.NODE_ENV === 'development' || 
    process.env.ENABLE_MOCKING === 'true' ||
    process.env.NODE_ENV === 'test';

  if (shouldMock) {
    if (typeof window !== 'undefined') {
      // Browser environment
      await setupMockWorker();
    } else {
      // Node.js environment (tests)
      setupMockServer();
    }
  }
};

export default {
  worker,
  server,
  setupMockWorker,
  setupMockServer,
  enableMocking
};
