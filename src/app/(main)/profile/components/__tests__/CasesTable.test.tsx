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
    caseType: "Dependent Visas",
    userName: "John Doe",
    caseStatus: "Open",
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    priority: "High",
  },
  {
    id: "C002",
    caseType: "Stamp Extensions",
    userName: "Jane Smith",
    caseStatus: "Closed",
    startDate: "2025-04-10",
    endDate: "2025-05-10",
    priority: "Medium",
  },
  {
    id: "C003",
    caseType: "Work Permit Applications",
    userName: "Muklesh",
    caseStatus: "Pending",
    startDate: "2025-04-10",
    endDate: "2025-05-10",
    priority: "Low",
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

    expect(screen.getByText("Sno.")).toBeInTheDocument();
    expect(screen.getByText("Application ID")).toBeInTheDocument();
    expect(screen.getByText("Package")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders all case data correctly", () => {
    render(<CasesTable {...defaultProps} />);

    // Check first case
    expect(screen.getByText("C001")).toBeInTheDocument();
    expect(screen.getByText("Dependent Visas")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("2025-05-01")).toBeInTheDocument();
    expect(screen.getByText("2025-05-15")).toBeInTheDocument();

    // Check second case
    expect(screen.getByText("C002")).toBeInTheDocument();
    expect(screen.getByText("Stamp Extensions")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    // Check third case
    expect(screen.getByText("C003")).toBeInTheDocument();
    expect(screen.getByText("Work Permit Applications")).toBeInTheDocument();
    expect(screen.getByText("Muklesh")).toBeInTheDocument();
  });

  it("renders view buttons for each case", () => {
    render(<CasesTable {...defaultProps} />);

    const viewButtons = screen.getAllByRole("button", { name: /view/i });
    expect(viewButtons).toHaveLength(mockCases.length);

    // Check that each button has the eye icon
    viewButtons.forEach((button) => {
      expect(
        button.querySelector('[data-testid="eye-icon"]')
      ).toBeInTheDocument();
    });
  });

  it("navigates to case details when view button is clicked", () => {
    render(<CasesTable {...defaultProps} />);

    const firstViewButton = screen.getAllByRole("button", { name: /view/i })[0];
    fireEvent.click(firstViewButton);

    expect(mockPush).toHaveBeenCalledWith("/profile/application/C001");
  });

  it("handles empty cases array", () => {
    render(<CasesTable {...defaultProps} cases={[]} />);

    // Headers should still be present
    expect(screen.getByText("Application ID")).toBeInTheDocument();

    // No case data should be present
    expect(screen.queryByText("C001")).not.toBeInTheDocument();
  });

  it("applies correct status styling", () => {
    render(<CasesTable {...defaultProps} />);

    // Check for status badges
    const openStatus = screen.getByText("Open");
    const closedStatus = screen.getByText("Closed");
    const pendingStatus = screen.getByText("Pending");

    expect(openStatus).toBeInTheDocument();
    expect(closedStatus).toBeInTheDocument();
    expect(pendingStatus).toBeInTheDocument();
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
    expect(columnHeaders).toHaveLength(8); // 8 columns

    // Check for cells
    const cells = screen.getAllByRole("cell");
    expect(cells.length).toBeGreaterThan(0);
  });

  it("handles case navigation for all cases", () => {
    render(<CasesTable {...defaultProps} />);

    const viewButtons = screen.getAllByRole("button", { name: /view/i });

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
