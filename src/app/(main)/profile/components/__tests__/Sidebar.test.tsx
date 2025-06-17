import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signOut } from "next-auth/react";
import { Sidebar } from "../Sidebar";
import { MenuKey } from "../types";

// Mock next-auth
jest.mock("next-auth/react");
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;

describe("Sidebar", () => {
  const defaultProps = {
    open: true,
    onToggle: jest.fn(),
    selectedMenu: "dashboard" as MenuKey,
    setSelectedMenu: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all menu items when open", () => {
    render(<Sidebar {...defaultProps} />);

    // Check for main menu items
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Immigration")).toBeInTheDocument();
    expect(screen.getByText("Packages")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("Training")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders collapsed when open is false", () => {
    render(<Sidebar {...defaultProps} open={false} />);

    // Text should not be visible when collapsed
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();

    // But icons should still be present
    expect(screen.getByTestId("layout-dashboard-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("highlights the selected menu item", () => {
    render(<Sidebar {...defaultProps} selectedMenu="profile" />);

    const profileItem = screen.getByText("Profile").closest("div");
    expect(profileItem).toHaveClass("bg-[#404bd0]", "text-white");
  });

  it("calls setSelectedMenu when menu item is clicked", () => {
    const mockSetSelectedMenu = jest.fn();
    render(<Sidebar {...defaultProps} setSelectedMenu={mockSetSelectedMenu} />);

    fireEvent.click(screen.getByText("Services"));
    expect(mockSetSelectedMenu).toHaveBeenCalledWith("services");
  });

  it("calls onToggle when toggle button is clicked", () => {
    const mockOnToggle = jest.fn();
    render(<Sidebar {...defaultProps} onToggle={mockOnToggle} />);

    const toggleButton = screen
      .getByTestId("chevron-left-icon")
      .closest("button");
    fireEvent.click(toggleButton!);
    expect(mockOnToggle).toHaveBeenCalled();
  });

  it("handles logout functionality", async () => {
    mockSignOut.mockResolvedValue(undefined);
    render(<Sidebar {...defaultProps} />);

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: "/" });
    });
  });

  it("handles logout error gracefully", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockSignOut.mockRejectedValue(new Error("Logout failed"));

    render(<Sidebar {...defaultProps} />);

    fireEvent.click(screen.getByText("Logout"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Logout error:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("shows tooltips when collapsed and hovered", async () => {
    render(<Sidebar {...defaultProps} open={false} />);

    const dashboardIcon = screen
      .getByTestId("layout-dashboard-icon")
      .closest("div");

    fireEvent.mouseEnter(dashboardIcon!);

    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    fireEvent.mouseLeave(dashboardIcon!);

    await waitFor(() => {
      expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
    });
  });

  it("has proper accessibility attributes", () => {
    render(<Sidebar {...defaultProps} />);

    // Check for proper button roles
    const menuItems = screen.getAllByRole("button");
    expect(menuItems.length).toBeGreaterThan(0);

    // Check for proper navigation structure
    const nav = screen.getByRole("navigation", { hidden: true });
    expect(nav).toBeInTheDocument();
  });

  it("applies correct width classes based on open state", () => {
    const { rerender } = render(<Sidebar {...defaultProps} open={true} />);

    let sidebar = screen.getByRole("navigation", {
      hidden: true,
    }).parentElement;
    expect(sidebar).toHaveClass("w-64");

    rerender(<Sidebar {...defaultProps} open={false} />);

    sidebar = screen.getByRole("navigation", { hidden: true }).parentElement;
    expect(sidebar).toHaveClass("w-16");
  });

  it("renders all required icons", () => {
    render(<Sidebar {...defaultProps} />);

    // Check for all menu icons
    expect(screen.getByTestId("layout-dashboard-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
    expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();
    expect(screen.getByTestId("building-icon")).toBeInTheDocument();
    expect(screen.getByTestId("package-icon")).toBeInTheDocument();
    expect(screen.getByTestId("star-icon")).toBeInTheDocument();
    expect(screen.getByTestId("book-open-text-icon")).toBeInTheDocument();
    expect(screen.getByTestId("message-circle-icon")).toBeInTheDocument();
    expect(screen.getByTestId("log-out-icon")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-left-icon")).toBeInTheDocument();
  });

  it("maintains proper menu order", () => {
    render(<Sidebar {...defaultProps} />);

    const menuItems = [
      "Dashboard",
      "Profile",
      "Services",
      "Immigration",
      "Packages",
      "Reviews",
      "Training",
      "Contact Us",
      "Logout",
    ];

    menuItems.forEach((item, index) => {
      const element = screen.getByText(item);
      expect(element).toBeInTheDocument();
    });
  });
});
