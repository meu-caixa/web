import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import AppRoutes from "./index";
import {describe, it, expect, vi, beforeEach} from "vitest";
import {AuthProvider, useAuth} from "@hooks/AuthProvider";

vi.mock("@hooks/AuthProvider", () => {
    return {
        AuthProvider: ({children}: { children: React.ReactNode }) => (
            <div>{children}</div>
        ),
        useAuth: vi.fn(),
    };
});

const renderWithAuthProvider = () => {
    render(
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    );
};

describe("AppRoutes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render the LoginPage for the root path", () => {
        (useAuth as jest.Mock).mockReturnValue({
            isAuthenticated: false,
            login: vi.fn(),
            logout: vi.fn(),
        });

        renderWithAuthProvider();
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    it("should render the DashboardPage for the /dashboard path", () => {
        (useAuth as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
        });

        window.history.pushState({}, "Dashboard Page", "/dashboard");
        renderWithAuthProvider();
        expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
    });

    it("should render the LoginPage for the /dashboard path redirect", () => {
        (useAuth as jest.Mock).mockReturnValue({
            isAuthenticated: false,
            login: vi.fn(),
            logout: vi.fn(),
        });

        window.history.pushState({}, "Dashboard Page", "/dashboard");
        renderWithAuthProvider();
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    it("should render 404 page for an unknown path", () => {
        window.history.pushState({}, "Unknown Page", "/unknown");
        renderWithAuthProvider();
        expect(screen.getByText("404 - Page not found")).toBeInTheDocument();
    });
});