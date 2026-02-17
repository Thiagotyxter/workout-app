const API_URL = '/api';

export const authService = {
    async login(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Erro ao fazer login');

        if (data.token) {
            localStorage.setItem('workout_token', data.token);
            localStorage.setItem('workout_user', JSON.stringify(data.user));
        }
        return data;
    },

    async register(name, email, password) {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Erro ao registrar');

        if (data.token) {
            localStorage.setItem('workout_token', data.token);
            localStorage.setItem('workout_user', JSON.stringify(data.user));
        }
        return data;
    },

    logout() {
        localStorage.removeItem('workout_token');
        localStorage.removeItem('workout_user');
    },

    getToken() {
        return localStorage.getItem('workout_token');
    },

    getUser() {
        const user = localStorage.getItem('workout_user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};
