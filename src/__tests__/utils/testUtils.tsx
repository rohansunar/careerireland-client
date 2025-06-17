import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

// Mock session data
const mockSession = {
  user: {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    image: "https://example.com/avatar.jpg",
  },
  expires: "2025-12-31",
};

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  session?: any;
  initialRouterState?: any;
}

const AllTheProviders = ({
  children,
  session = mockSession,
}: {
  children: React.ReactNode;
  session?: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { session, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllTheProviders session={session}>{children}</AllTheProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Test utilities for common assertions
export const expectElementToBeVisible = (element: HTMLElement) => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
};

export const expectElementToHaveClasses = (
  element: HTMLElement,
  classes: string[]
) => {
  classes.forEach((className) => {
    expect(element).toHaveClass(className);
  });
};

export const expectButtonToBeClickable = (button: HTMLElement) => {
  expect(button).toBeInTheDocument();
  expect(button).toBeEnabled();
  expect(button).not.toHaveAttribute("aria-disabled", "true");
};

// Mock data generators
export const createMockCase = (overrides = {}) => ({
  id: "C001",
  caseType: "Test Case Type",
  userName: "Test User",
  caseStatus: "Open",
  priority: "Medium",
  startDate: "2025-01-01",
  endDate: "2025-02-01",
  ...overrides,
});

export const createMockApplicationData = (overrides = {}) => ({
  caseId: "C001",
  caseType: "Test Application",
  userName: "Test User",
  caseStatus: "Open",
  priority: "Medium",
  startDate: "2025-01-01",
  endDate: "2025-02-01",
  currentStep: 1,
  steps: [],
  ...overrides,
});

// Async test utilities
export const waitForLoadingToFinish = async () => {
  // Wait for any loading spinners to disappear
  const { screen } = await import("@testing-library/react");

  return new Promise<void>((resolve) => {
    const checkLoading = () => {
      if (!screen.queryByText(/loading/i)) {
        resolve();
      } else {
        setTimeout(checkLoading, 100);
      }
    };
    checkLoading();
  });
};

// Form testing utilities
export const fillFormField = async (fieldName: string, value: string) => {
  const { screen, fireEvent } = await import("@testing-library/react");

  const field = screen.getByLabelText(new RegExp(fieldName, "i"));
  fireEvent.change(field, { target: { value } });

  return field;
};

export const submitForm = async (formTestId?: string) => {
  const { screen, fireEvent } = await import("@testing-library/react");

  const form = formTestId
    ? screen.getByTestId(formTestId)
    : screen.getByRole("form") ||
      screen.getByRole("button", { name: /submit/i });

  fireEvent.submit(form);

  return form;
};

// Navigation testing utilities
export const expectNavigationToPath = (
  mockPush: jest.Mock,
  expectedPath: string
) => {
  expect(mockPush).toHaveBeenCalledWith(expectedPath);
};

export const expectNavigationWithParams = (
  mockPush: jest.Mock,
  expectedPath: string,
  expectedParams?: Record<string, any>
) => {
  if (expectedParams) {
    expect(mockPush).toHaveBeenCalledWith(expectedPath, expectedParams);
  } else {
    expect(mockPush).toHaveBeenCalledWith(expectedPath);
  }
};

// Error testing utilities
export const expectErrorMessage = (message: string) => {
  const { screen } = require("@testing-library/react");
  expect(screen.getByText(new RegExp(message, "i"))).toBeInTheDocument();
};

export const expectNoErrorMessage = (message: string) => {
  const { screen } = require("@testing-library/react");
  expect(screen.queryByText(new RegExp(message, "i"))).not.toBeInTheDocument();
};

// Component state testing utilities
export const expectComponentToBeLoading = () => {
  const { screen } = require("@testing-library/react");
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
};

export const expectComponentToBeLoaded = () => {
  const { screen } = require("@testing-library/react");
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
};

// Re-export everything from React Testing Library
export * from "@testing-library/react";

// Export custom render as default
export { customRender as render };
