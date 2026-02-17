const STORAGE_KEY = 'workout-analysis-history';

export function getHistory() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function addToHistory(entry) {
    const history = getHistory();
    const newEntry = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        date: new Date().toISOString(),
        exerciseName: entry.exerciseName,
        muscleGroup: entry.muscleGroup,
        nota: entry.nota,
        resumo: entry.resumo,
        positivos: entry.positivos || [],
        melhorias: entry.melhorias || [],
        dicas: entry.dicas || [],
        riscoLesao: entry.riscoLesao || null,
        videoThumbnail: entry.videoThumbnail || null,
    };
    history.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return newEntry;
}

export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
}

export function getExerciseHistory(exerciseName) {
    return getHistory().filter((e) => e.exerciseName === exerciseName);
}

export function getAverageScore() {
    const history = getHistory();
    if (!history.length) return 0;
    return history.reduce((sum, e) => sum + e.nota, 0) / history.length;
}

export function getBestScore() {
    const history = getHistory();
    if (!history.length) return null;
    return history.reduce((best, e) => (e.nota > best.nota ? e : best), history[0]);
}
