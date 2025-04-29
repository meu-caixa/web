export type LoginResponse = {
    token: string;
    user: {
        name: string;
        email: string;
    };
};

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
    }

    const data: LoginResponse = await response.json();
    return data;
}