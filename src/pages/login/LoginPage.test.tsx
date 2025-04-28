import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import LoginPage from "./LoginPage";
import {vi} from "vitest";
import {useAuth} from "@hooks/AuthProvider";
import {BrowserRouter} from "react-router-dom";

vi.mock("@hooks/AuthProvider", () => ({
    useAuth: vi.fn(),
}));

describe("LoginPage", () => {
    const mockLogin = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
        });
    });

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <LoginPage/>
            </BrowserRouter>
        );

    it("should render the login form", () => {
        renderComponent();

        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("login-button")).toBeInTheDocument();
    });

    it("should show validation errors for invalid email and short password", async () => {
        renderComponent();

        fireEvent.change(screen.getByTestId("email-input"), {
            target: {value: "invalid-email"},
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: {value: "123"},
        });
        fireEvent.click(screen.getByTestId("login-button"));

        await waitFor(() => {
            expect(screen.getByText("Invalid email address")).toBeInTheDocument();
            expect(screen.getByText("Password must be at least 6 characters long")).toBeInTheDocument();
        });
    });

    it("should call login with correct data", async () => {
        renderComponent();

        fireEvent.change(screen.getByTestId("email-input"), {
            target: {value: "test@example.com"},
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: {value: "password123"},
        });
        fireEvent.click(screen.getByTestId("login-button"));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
        });
    });

    it("should show an error message if login fails", async () => {
        mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));
        renderComponent();

        fireEvent.change(screen.getByTestId("email-input"), {
            target: {value: "test@example.com"},
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: {value: "wrongpassword"},
        });
        fireEvent.click(screen.getByTestId("login-button"));

        await waitFor(() => {
            expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
        });
    });
});