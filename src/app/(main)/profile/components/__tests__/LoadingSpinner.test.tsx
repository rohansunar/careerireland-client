import { render, screen } from "@testing-library/react";
import LoadingSpinner from "@/app/(main)/profile/components/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders with default props", () => {
    render(<LoadingSpinner />);

    // Check if spinner is rendered by class
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();

    // Check default text
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders with custom text", () => {
    const customText = "Loading content...";
    render(<LoadingSpinner text={customText} />);

    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);

    // Small size
    let spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveClass("w-4", "h-4");

    // Medium size (default)
    rerender(<LoadingSpinner size="md" />);
    spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveClass("w-8", "h-8");

    // Large size
    rerender(<LoadingSpinner size="lg" />);
    spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveClass("w-12", "h-12");
  });

  it("applies custom className", () => {
    const customClass = "custom-spinner-class";
    render(<LoadingSpinner className={customClass} />);

    const container = document.querySelector(".flex.flex-col");
    expect(container).toHaveClass(customClass);
  });

  it("renders without text when text prop is empty", () => {
    render(<LoadingSpinner text="" />);

    // Spinner should be present
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();

    // No text should be rendered
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<LoadingSpinner />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();

    // Check for spinning animation class
    expect(spinner).toHaveClass("animate-spin");
  });

  it("renders with all size variants correctly", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<LoadingSpinner size={size} />);

      const spinner = document.querySelector(".animate-spin");
      expect(spinner).toBeInTheDocument();

      // Verify size-specific classes are applied
      const sizeClasses = {
        sm: ["w-4", "h-4"],
        md: ["w-8", "h-8"],
        lg: ["w-12", "h-12"],
      };

      expect(spinner).toHaveClass(...sizeClasses[size]);

      unmount();
    });
  });

  it("maintains consistent structure", () => {
    render(<LoadingSpinner text="Test loading" />);

    // Check container structure
    const container = document.querySelector(".flex.flex-col");
    expect(container).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "p-8"
    );

    // Check spinner structure
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toHaveClass(
      "animate-spin",
      "rounded-full",
      "border-4",
      "border-gray-200",
      "border-t-blue-600"
    );

    // Check text structure
    const text = screen.getByText("Test loading");
    expect(text).toHaveClass("mt-4", "text-gray-600");
  });
});
