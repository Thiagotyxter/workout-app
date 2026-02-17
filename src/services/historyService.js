import { authService } from './authService';

const API_URL = '/api/history';

export async function getHistory() {
    const token = authService.getToken();
    if (!token) {
        // Fallback to local storage for guests
        const data = localStorage.getItem('workout-analysis-history');
        return data ? JSON.parse(data) : [];
    }

    try {
        const response = await fetch(API_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Erro ao buscar histórico');
        return await response.json();
    } catch (error) {
        console.error('History fetch error:', error);
        return [];
    }
}

export async function addToHistory(entry) {
    const token = authService.getToken();
    if (!token) {
        const history = await getHistory();
        const newEntry = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            date: new Date().toISOString(),
            ...entry,
        };
        history.unshift(newEntry);
        localStorage.setItem('workout-analysis-history', JSON.stringify(history));
        return newEntry;
    }

    // Note: Entry is already saved in the database by the analyze-video endpoint
    // We just return it if needed, or re-fetch history
    return entry;
}

export async function clearHistory() {
    const token = authService.getToken();
    if (!token) {
        localStorage.removeItem('workout-analysis-history');
        return;
    }

    await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
}
