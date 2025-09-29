import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

// Mock component that throws an error
const ThrowError = ({ shouldThrow }) => {
	if (shouldThrow) {
		throw new Error("Test error");
	}
	return <div>No error</div>;
};

describe("ErrorBoundary", () => {
	beforeEach(() => {
		// Suppress console.error for tests
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		console.error.mockRestore();
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
		expect(screen.getByText("We're sorry, but something unexpected happened. Please try refreshing the page.")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /refresh page/i })).toBeInTheDocument();
	});

	it("shows error details in development mode", () => {
		const originalEnv = process.env.NODE_ENV;
		process.env.NODE_ENV = "development";

		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		expect(screen.getByText("Error Details (Development)")).toBeInTheDocument();

		process.env.NODE_ENV = originalEnv;
	});

	it("calls window.location.reload when refresh button is clicked", () => {
		const mockReload = jest.fn();
		Object.defineProperty(window, "location", {
			value: {
				reload: mockReload,
			},
			writable: true,
		});

		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		const refreshButton = screen.getByRole("button", { name: /refresh page/i });
		refreshButton.click();

		expect(mockReload).toHaveBeenCalled();
	});
});
