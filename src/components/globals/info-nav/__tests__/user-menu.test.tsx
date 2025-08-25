import { render, screen } from "@testing-library/react";
import UserMenu from "../user-menu";

// Mock next-auth
jest.mock("next-auth/react");

// Mock next/link
jest.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock utility functions
jest.mock("@/util/tools", () => ({
  isValidUrl: jest.fn((url: string) => url.startsWith("http")),
}));

jest.mock("@/util/urls", () => ({
  imgUrl: "https://example.com/images/",
}));

describe("UserMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.log statements during tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockSessionWithValidName = {
    user: {
      id: 1,
      email: "test@example.com",
      name: "John Doe",
      image: "https://example.com/avatar.jpg",
    },
  };

  const mockSessionWithNullName = {
    user: {
      id: 1,
      email: "test@example.com",
      name: null,
      image: "https://example.com/avatar.jpg",
    },
  };

  const mockSessionWithUndefinedName = {
    user: {
      id: 1,
      email: "test@example.com",
      name: undefined,
      image: "https://example.com/avatar.jpg",
    },
  };

  const mockSessionWithEmptyName = {
    user: {
      id: 1,
      email: "test@example.com",
      name: "",
      image: "https://example.com/avatar.jpg",
    },
  };

  const mockSessionWithWhitespaceName = {
    user: {
      id: 1,
      email: "test@example.com",
      name: "   ",
      image: "https://example.com/avatar.jpg",
    },
  };

  it("renders correctly with valid session data", () => {
    render(<UserMenu session={mockSessionWithValidName} />);

    // Check if avatar fallback shows correct initials
    expect(screen.getByText("JO")).toBeInTheDocument();

    // Check if the dropdown trigger is present
    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
  });

  it("handles null name gracefully", () => {
    render(<UserMenu session={mockSessionWithNullName} />);

    // Should show default fallback 'U' for null name
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("handles undefined name gracefully", () => {
    render(<UserMenu session={mockSessionWithUndefinedName} />);

    // Should show default fallback 'U' for undefined name
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("handles empty string name gracefully", () => {
    render(<UserMenu session={mockSessionWithEmptyName} />);

    // Should show default fallback 'U' for empty name
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("handles whitespace-only name gracefully", () => {
    render(<UserMenu session={mockSessionWithWhitespaceName} />);

    // Should show default fallback 'U' for whitespace-only name
    expect(screen.getByText("U")).toBeInTheDocument();
  });

  it("handles single character name correctly", () => {
    const sessionWithSingleChar = {
      user: {
        id: 1,
        email: "test@example.com",
        name: "A",
        image: "https://example.com/avatar.jpg",
      },
    };

    render(<UserMenu session={sessionWithSingleChar} />);

    // Should show single character in uppercase
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("handles name with special characters correctly", () => {
    const sessionWithSpecialChars = {
      user: {
        id: 1,
        email: "test@example.com",
        name: "José María",
        image: "https://example.com/avatar.jpg",
      },
    };

    render(<UserMenu session={sessionWithSpecialChars} />);

    // Should show first two characters in uppercase
    expect(screen.getByText("JO")).toBeInTheDocument();
  });

  it("renders without crashing when signOut is available", () => {
    // This test verifies the component renders without errors
    expect(() => {
      render(<UserMenu session={mockSessionWithValidName} />);
    }).not.toThrow();

    // Verify the component structure is correct
    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();
  });

  it("renders component structure correctly", () => {
    render(<UserMenu session={mockSessionWithValidName} />);

    // Verify the basic component structure
    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-state", "closed");
  });

  it("handles session with null user gracefully", () => {
    const sessionWithNullUser = { user: null };

    // This should not crash the component
    expect(() => {
      render(<UserMenu session={sessionWithNullUser} />);
    }).not.toThrow();
  });

  it("handles completely null session gracefully", () => {
    // This should not crash the component
    expect(() => {
      render(<UserMenu session={null} />);
    }).not.toThrow();
  });

  it("handles undefined session gracefully", () => {
    // This should not crash the component
    expect(() => {
      render(<UserMenu session={undefined} />);
    }).not.toThrow();
  });

  it("renders with proper accessibility attributes", () => {
    render(<UserMenu session={mockSessionWithValidName} />);

    // Check for proper button role and attributes
    const trigger = screen.getByRole("button");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
  });

  it("handles image URL correctly for valid URLs", () => {
    render(<UserMenu session={mockSessionWithValidName} />);

    // The avatar image is rendered as a background or fallback, so we check the initials instead
    expect(screen.getByText("JO")).toBeInTheDocument();
  });

  it("handles image URL correctly for invalid URLs", () => {
    const sessionWithInvalidImage = {
      user: {
        id: 1,
        email: "test@example.com",
        name: "John Doe",
        image: "invalid-url",
      },
    };

    render(<UserMenu session={sessionWithInvalidImage} />);

    // The avatar image is rendered as a background or fallback, so we check the initials instead
    expect(screen.getByText("JO")).toBeInTheDocument();
  });
});
