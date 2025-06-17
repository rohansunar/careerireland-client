'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { mockApi, mockData, mockConfig } from './index';

// Mock context type
interface MockContextType {
  isEnabled: boolean;
  isLoading: boolean;
  api: typeof mockApi;
  data: typeof mockData;
  config: typeof mockConfig;
  toggleMocking: () => void;
  resetData: () => void;
}

// Create context
const MockContext = createContext<MockContextType | undefined>(undefined);

// Provider props
interface MockProviderProps {
  children: ReactNode;
  enableByDefault?: boolean;
  showDebugInfo?: boolean;
}

// Mock provider component
export const MockProvider: React.FC<MockProviderProps> = ({
  children,
  enableByDefault = false,
  showDebugInfo = false
}) => {
  const [isEnabled, setIsEnabled] = useState(enableByDefault);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize mocking on mount
  useEffect(() => {
    const initializeMocking = async () => {
      if (isEnabled && typeof window !== 'undefined') {
        setIsLoading(true);
        try {
          // Dynamic import to avoid SSR issues
          const { enableMocking } = await import('./msw-setup');
          await enableMocking();
          
          if (showDebugInfo) {
            console.log('🔧 Mock data provider initialized');
            console.log('📊 Available mock data:', Object.keys(mockData));
            console.log('🔌 Available mock APIs:', Object.keys(mockApi));
          }
        } catch (error) {
          console.error('Failed to initialize mocking:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeMocking();
  }, [isEnabled, showDebugInfo]);

  // Toggle mocking on/off
  const toggleMocking = () => {
    setIsEnabled(prev => !prev);
  };

  // Reset mock data to initial state
  const resetData = () => {
    // This would reset any modified mock data back to defaults
    // For now, we'll just log the action
    if (showDebugInfo) {
      console.log('🔄 Mock data reset to initial state');
    }
  };

  const contextValue: MockContextType = {
    isEnabled,
    isLoading,
    api: mockApi,
    data: mockData,
    config: mockConfig,
    toggleMocking,
    resetData
  };

  return (
    <MockContext.Provider value={contextValue}>
      {children}
      {showDebugInfo && isEnabled && (
        <MockDebugPanel />
      )}
    </MockContext.Provider>
  );
};

// Debug panel component
const MockDebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mockContext = useMockContext();

  if (!mockContext.isEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        title="Mock Data Debug Panel"
      >
        🔧 Mock
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">Mock Data Debug</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <div>
              <strong>Status:</strong> {mockContext.isLoading ? 'Loading...' : 'Active'}
            </div>
            
            <div>
              <strong>Available APIs:</strong>
              <ul className="ml-2 mt-1 space-y-1">
                {Object.keys(mockContext.api).map(key => (
                  <li key={key} className="text-blue-600">• {key}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <strong>Mock Data:</strong>
              <ul className="ml-2 mt-1 space-y-1">
                {Object.entries(mockContext.data).map(([key, value]) => (
                  <li key={key} className="text-green-600">
                    • {key} ({Array.isArray(value) ? value.length : 'object'})
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={mockContext.toggleMocking}
                className="w-full bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Disable Mocking
              </button>
            </div>
            
            <button
              onClick={mockContext.resetData}
              className="w-full bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
            >
              Reset Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook to use mock context
export const useMockContext = (): MockContextType => {
  const context = useContext(MockContext);
  if (context === undefined) {
    throw new Error('useMockContext must be used within a MockProvider');
  }
  return context;
};

// Hook to use mock API
export const useMockApi = () => {
  const { api, isEnabled } = useMockContext();
  return { api, isEnabled };
};

// Hook to use mock data
export const useMockData = () => {
  const { data, isEnabled } = useMockContext();
  return { data, isEnabled };
};

// Higher-order component for mock-aware components
export const withMockData = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    const mockContext = useMockContext();
    
    return (
      <Component 
        {...props} 
        mockContext={mockContext}
      />
    );
  };
  
  WrappedComponent.displayName = `withMockData(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

export default MockProvider;
