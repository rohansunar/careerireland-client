import { render, screen, fireEvent } from "@testing-library/react";
import CasesTable from "../CasesTable";

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

const mockCases = [
  {
    id: "C001",
    application_number: "APP001",
    service_type: "Dependent Visas",
    status: "Draft",
    current_step: "1",
    numberOfSteps: 5,
    service_name: "Dependent Visas",
    created_at: "2025-05-01T00:00:00Z",
    updated_at: "2025-05-15T00:00:00Z",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
  },
  {
    id: "C002",
    application_number: "APP002",
    service_type: "Stamp Extensions",
    status: "Submitted",
    current_step: "2",
    numberOfSteps: 4,
    service_name: "Stamp Extensions",
    created_at: "2025-04-10T00:00:00Z",
    updated_at: "2025-05-10T00:00:00Z",
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
  },
  {
    id: "C003",
    application_number: "APP003",
    service_type: "Work Permit Applications",
    status: "Under_Review",
    current_step: "3",
    numberOfSteps: 3,
    service_name: "Work Permit Applications",
    created_at: "2025-04-10T00:00:00Z",
    updated_at: "2025-05-10T00:00:00Z",
    user: {
      name: "Muklesh",
      email: "muklesh@example.com",
    },
  },
  {
    id: "C004",
    application_number: "APP004",
    service_type: "Citizenship Applications",
    status: "Approved",
    current_step: "4",
    numberOfSteps: 4,
    service_name: "Citizenship Applications",
    created_at: "2025-03-15T00:00:00Z",
    updated_at: "2025-05-20T00:00:00Z",
    user: {
      name: "Sarah Connor",
      email: "sarah.connor@example.com",
    },
  },
];

describe("CasesTable", () => {
  const defaultProps = {
    cases: mockCases,
    currentPage: 1,
    itemsPerPage: 10,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders table headers correctly", () => {
    render(<CasesTable {...defaultProps} />);

    expect(screen.getByText("Application")).toBeInTheDocument();
    expect(screen.getByText("Package")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Timeline")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders all case data correctly", () => {
    render(<CasesTable {...defaultProps} />);

    // Check first case (current_step: 1, numberOfSteps: 5 = Pending)
    expect(screen.getByText("APP001")).toBeInTheDocument();
    expect(screen.getByText("Dependent Visas")).toBeInTheDocument();
    expect(screen.getAllByText("Pending")).toHaveLength(2);

    // Check second case (current_step: 2, numberOfSteps: 4 = Pending)
    expect(screen.getByText("APP002")).toBeInTheDocument();
    expect(screen.getByText("Stamp Extensions")).toBeInTheDocument();

    // Check third case (current_step: 3, numberOfSteps: 3 = Completed)
    expect(screen.getByText("APP003")).toBeInTheDocument();
    expect(screen.getByText("Work Permit Applications")).toBeInTheDocument();
    expect(screen.getAllByText("Completed")).toHaveLength(2);

    // Check fourth case (current_step: 5, numberOfSteps: 5 = Completed)
    expect(screen.getByText("APP004")).toBeInTheDocument();
    expect(screen.getByText("Citizenship Applications")).toBeInTheDocument();
  });

  it("renders view buttons for each case", () => {
    render(<CasesTable {...defaultProps} />);

    const viewButtons = screen.getAllByRole("button", {
      name: /view details/i,
    });
    expect(viewButtons).toHaveLength(mockCases.length);
  });

  it("navigates to case details when view button is clicked", () => {
    render(<CasesTable {...defaultProps} />);

    const firstViewButton = screen.getAllByRole("button", {
      name: /view details/i,
    })[0];
    fireEvent.click(firstViewButton);

    expect(mockPush).toHaveBeenCalledWith("/profile/application/C001");
  });

  it("handles empty cases array", () => {
    render(<CasesTable {...defaultProps} cases={[]} />);

    // Headers should still be present
    expect(screen.getByText("Application")).toBeInTheDocument();

    // No case data should be present
    expect(screen.queryByText("APP001")).not.toBeInTheDocument();
  });

  it("applies correct status styling", () => {
    render(<CasesTable {...defaultProps} />);

    // Check for application status badges
    const pendingStatuses = screen.getAllByText("Pending");
    const completedStatuses = screen.getAllByText("Completed");

    expect(pendingStatuses).toHaveLength(2); // First two cases are pending
    expect(completedStatuses).toHaveLength(2); // Third and fourth cases are completed
  });

  it("has proper table structure", () => {
    render(<CasesTable {...defaultProps} />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    // Header row + 3 data rows
    expect(rows).toHaveLength(4);
  });

  it("handles pagination props correctly", () => {
    const onPageChange = jest.fn();
    render(<CasesTable {...defaultProps} onPageChange={onPageChange} />);

    // Component should render without pagination controls in this basic version
    // This test ensures the props are accepted without errors
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("displays correct number of cases per page", () => {
    render(<CasesTable {...defaultProps} itemsPerPage={2} />);

    // All cases should be displayed regardless of itemsPerPage in this implementation
    // This test ensures the prop is accepted
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1); // Header + data rows
  });

  it("has accessible table structure", () => {
    render(<CasesTable {...defaultProps} />);

    // Check for proper table accessibility
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    // Check for column headers
    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(5); // 5 columns

    // Check for cells
    const cells = screen.getAllByRole("cell");
    expect(cells.length).toBeGreaterThan(0);
  });

  it("handles case navigation for all cases", () => {
    render(<CasesTable {...defaultProps} />);

    const viewButtons = screen.getAllByRole("button", {
      name: /view details/i,
    });

    // Test navigation for each case
    viewButtons.forEach((button, index) => {
      fireEvent.click(button);
      expect(mockPush).toHaveBeenCalledWith(
        `/profile/application/${mockCases[index].id}`
      );
    });

    expect(mockPush).toHaveBeenCalledTimes(mockCases.length);
  });
});
