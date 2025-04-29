import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, LoginFormInputs} from "./schema";
import {Button, Form, Input, Typography, message} from "antd";
import {useAuth} from "@hooks/AuthProvider";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

export default function LoginPage() {
    const navigate = useNavigate();
    const {login} = useAuth();

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const success = await login(data.email, data.password);
            if (success) {
                navigate("/dashboard");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                message.error(error.message);
            } else {
                message.error("An unknown error occurred");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
                <Title level={2}>Login Page</Title>
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>

                    <Form.Item
                        label="Email"
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({field}) => (
                                <Input {...field} placeholder="Enter your email" data-testid="email-input"/>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password?.message}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({field}) => (
                                <Input.Password {...field} placeholder="Enter your password"
                                                data-testid="password-input"/>
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                            block
                            data-testid="login-button"
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
