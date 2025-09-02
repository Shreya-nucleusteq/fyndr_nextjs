import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import DefaultCard from "@/components/global/cards/default-card";

// Mock the cn utility function
vi.mock("@/lib/utils", () => ({
  cn: vi.fn((...args) => args.filter(Boolean).join(" ")),
}));

describe("DefaultCard", () => {
  it("renders children correctly", () => {
    render(
      <DefaultCard>
        <p>Test content</p>
      </DefaultCard>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(
      <DefaultCard>
        <p>Test content</p>
      </DefaultCard>
    );

    const cardElement = screen.getByText("Test content").parentElement;
    expect(cardElement).toHaveClass("rounded-10", "bg-white", "p-4");
  });

  it("applies custom className when provided", () => {
    render(
      <DefaultCard className="mb-1">
        <p>Test content</p>
      </DefaultCard>
    );

    const cardElement = screen.getByText("Test content").parentElement;
    expect(cardElement).toHaveClass("rounded-10", "bg-white", "p-4", "mb-1");
  });

  it("applies id when provided", () => {
    render(
      <DefaultCard id="test-id">
        <p>Test content</p>
      </DefaultCard>
    );

    const cardElement = screen.getByText("Test content").parentElement;
    expect(cardElement).toHaveAttribute("id", "test-id");
  });

  it("does not apply id when not provided", () => {
    render(
      <DefaultCard>
        <p>Test content</p>
      </DefaultCard>
    );

    const cardElement = screen.getByText("Test content").parentElement;
    expect(cardElement).not.toHaveAttribute("id");
  });

  it("renders as a div element", () => {
    render(
      <DefaultCard>
        <p>Test content</p>
      </DefaultCard>
    );

    const cardElement = screen.getByText("Test content").parentElement;
    expect(cardElement?.tagName).toBe("DIV");
  });

  it("handles multiple children", () => {
    render(
      <DefaultCard>
        <h1>Title</h1>
        <p>Content</p>
        <button>Action</button>
      </DefaultCard>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("handles React fragments as children", () => {
    render(
      <DefaultCard>
        <>
          <h1>Fragment Title</h1>
          <p>Fragment Content</p>
        </>
      </DefaultCard>
    );

    expect(screen.getByText("Fragment Title")).toBeInTheDocument();
    expect(screen.getByText("Fragment Content")).toBeInTheDocument();
  });

  it("applies all props together correctly", () => {
    render(
      <DefaultCard id="combined-test" className="mb-1">
        <div>Combined test</div>
      </DefaultCard>
    );

    const cardElement = screen.getByText("Combined test").parentElement;
    expect(cardElement).toHaveAttribute("id", "combined-test");
    expect(cardElement).toHaveClass("rounded-10", "bg-white", "p-4", "mb-1");
  });

  it("handles empty className gracefully", () => {
    render(
      <DefaultCard className="">
        <p>Empty class test</p>
      </DefaultCard>
    );

    const cardElement = screen.getByText("Empty class test").parentElement;
    expect(cardElement).toHaveClass("rounded-10", "bg-white", "p-4");
  });

  it("handles undefined className gracefully", () => {
    render(
      <DefaultCard className={undefined}>
        <p>Undefined class test</p>
      </DefaultCard>
    );

    const cardElement = screen.getByText("Undefined class test").parentElement;
    expect(cardElement).toHaveClass("rounded-10", "bg-white", "p-4");
  });
});
