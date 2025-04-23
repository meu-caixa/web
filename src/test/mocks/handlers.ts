import { http, HttpResponse } from 'msw';

type LoginRequest = {
    email: string;
    password: string;
};

type LoginResponse = {
    error?: string;
    token?: string;
    user?: {
        name: string;
        email: string;
    };
};

const handlers = [
    http.post<never, LoginRequest, LoginResponse, '/api/login'>('/api/login', async ({ request }) => {
        const { email, password } = await request.json();
        if (email === 'admin@example.com' && password === 'password') {
            return HttpResponse.json({
                token: 'fake-jwt-token',
                user: {
                    name: 'Admin',
                    email: 'admin@example.com'
                },
            });
        }

        return HttpResponse.json(
            {
                error: 'Invalid email or password',
            },
            { status: 401 }
        );
    })

]

export default handlers;