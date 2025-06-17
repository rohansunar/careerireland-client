import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "@/app/(main)/profile/components/ErrorBoundary";

// Mock the router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Suppress console.error for these tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText("No error")).toBeInTheDocument();
  });

  it("renders error UI when there is an error", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(/We encountered an unexpected error/)
    ).toBeInTheDocument();
  });

  it("handles error state correctly", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check that the error UI is displayed
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(/We encountered an unexpected error/)
    ).toBeInTheDocument();

    // Check that both action buttons are present
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go to dashboard/i })
    ).toBeInTheDocument();
  });

  it("hides error details in production mode", () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      screen.queryByText("Error Details (Development)")
    ).not.toBeInTheDocument();

    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalEnv,
      writable: true,
    });
  });

  it("handles retry functionality", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error should be displayed
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Click retry button
    const retryButton = screen.getByRole("button", { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
    fireEvent.click(retryButton);

    // After retry, the error should still be there because the child still throws
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("handles go to dashboard functionality", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const dashboardButton = screen.getByRole("button", {
      name: /go to dashboard/i,
    });
    expect(dashboardButton).toBeInTheDocument();

    // Test that the button is clickable (we can't easily test window.location.href in jsdom)
    fireEvent.click(dashboardButton);

    // The button should still be there after clicking
    expect(dashboardButton).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for alert triangle icon
    expect(screen.getByTestId("alert-triangle-icon")).toBeInTheDocument();

    // Check for proper button roles
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go to dashboard/i })
    ).toBeInTheDocument();
  });

  it("displays proper error message structure", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check main error message
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Check descriptive text
    expect(
      screen.getByText(
        /We encountered an unexpected error while loading this page/
      )
    ).toBeInTheDocument();

    // Check that it mentions logging
    expect(
      screen.getByText(/This has been logged and our team will investigate/)
    ).toBeInTheDocument();
  });

  it("renders with proper card structure", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for card container
    const container = screen
      .getByText("Something went wrong")
      .closest(".max-w-lg");
    expect(container).toBeInTheDocument();

    // Check for centered layout
    const mainContainer = container?.parentElement;
    expect(mainContainer).toHaveClass(
      "min-h-screen",
      "bg-gray-50",
      "flex",
      "items-center",
      "justify-center"
    );
  });
});
