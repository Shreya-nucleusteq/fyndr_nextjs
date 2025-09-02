/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import SignOutButton from "@/components/global/buttons/sign-out-button";

// Mock next-auth - declare mock function inside the factory
vi.mock("next-auth/react", () => ({
  signOut: vi.fn(),
}));

// Mock toast - declare mock function inside the factory
vi.mock("@/components/global/toast", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mock routes constant
vi.mock("@/constants/routes", () => ({
  default: {
    HOME: "/home",
  },
}));

// Mock cn utility
vi.mock("@/lib/utils", () => ({
  cn: vi.fn((className) => className),
}));

// Mock shadcn Button - simplified mock since we're not testing it
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));

describe("SignOutButton Component", async () => {
  // Import the mocked functions after mocking
  const { signOut } = await import("next-auth/react");
  const { toast } = await import("@/components/global/toast");
  const { cn } = await import("@/lib/utils");

  const mockSignOut = vi.mocked(signOut);
  const mockToastError = vi.mocked(toast.error);
  const mockCn = vi.mocked(cn);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with children content", () => {
    render(<SignOutButton>Sign Out</SignOutButton>);

    const button = screen.getByRole("button", { name: /sign out/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Sign Out");
  });

  it("renders with custom children", () => {
    render(
      <SignOutButton>
        <span>Custom Sign Out Text</span>
      </SignOutButton>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Custom Sign Out Text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<SignOutButton className="mb-1">Sign Out</SignOutButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("mb-1");
  });

  it("handles undefined className", () => {
    render(<SignOutButton className={undefined}>Sign Out</SignOutButton>);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("calls signOut with correct parameters on successful logout", async () => {
    // Fix: Mock resolved value properly for void return type
    mockSignOut.mockResolvedValueOnce(undefined as any);

    render(<SignOutButton>Sign Out</SignOutButton>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledWith({ redirectTo: "/home" });
    });

    expect(mockToastError).not.toHaveBeenCalled();
  });

  it("shows error toast when signOut fails", async () => {
    mockSignOut.mockRejectedValueOnce(new Error("Sign out failed"));

    render(<SignOutButton>Sign Out</SignOutButton>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledWith({ redirectTo: "/home" });
    });

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith({
        message: "Error signing out",
      });
    });
  });

  it("handles multiple clicks correctly", async () => {
    // Fix: Mock resolved value properly for void return type
    mockSignOut.mockResolvedValue(undefined as any);

    render(<SignOutButton>Sign Out</SignOutButton>);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(3);
    });
  });

  it("handles async operation correctly", async () => {
    // Fix: Create promise that resolves to the correct type
    let resolveSignOut: (value?: any) => void;
    const signOutPromise = new Promise<any>((resolve) => {
      resolveSignOut = resolve;
    });

    mockSignOut.mockReturnValueOnce(signOutPromise);

    render(<SignOutButton>Sign Out</SignOutButton>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    // signOut should be called immediately
    expect(mockSignOut).toHaveBeenCalledWith({ redirectTo: "/home" });

    // Resolve the promise
    resolveSignOut!(undefined);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });

    // No error toast should be shown
    expect(mockToastError).not.toHaveBeenCalled();
  });

  it("calls cn utility with className", () => {
    render(<SignOutButton className="mb-1">Sign Out</SignOutButton>);

    expect(mockCn).toHaveBeenCalledWith("mb-1");
  });

  it("works with complex children elements", () => {
    render(
      <SignOutButton>
        <div>
          <span>Sign</span>
          <strong>Out</strong>
        </div>
      </SignOutButton>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Sign")).toBeInTheDocument();
    expect(screen.getByText("Out")).toBeInTheDocument();
  });

  it("maintains button functionality with different error types", async () => {
    // Test with different error types
    mockSignOut.mockRejectedValueOnce("String error");

    render(<SignOutButton>Sign Out</SignOutButton>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith({
        message: "Error signing out",
      });
    });
  });
});
