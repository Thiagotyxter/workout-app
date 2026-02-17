import { useState } from 'react';
import { workoutPlan, getAllDays } from '../data/workoutData';
import ExerciseCard from './ExerciseCard';
import HistoryTable from './HistoryTable';
import './WorkoutApp.css';

export default function WorkoutApp() {
    const days = getAllDays();
    const [selectedDay, setSelectedDay] = useState(days[0]);
    const [showHistory, setShowHistory] = useState(false);
    const dayData = workoutPlan[selectedDay];

    return (
        <div className="workout-app">
            <header className="app-header">
                <div className="header-content">
                    <div className="header-top">
                        <div>
                            <h1 className="app-title">
                                <span className="title-icon">🏋️</span>
                                Workout<span className="title-accent">Pro</span>
                            </h1>
                            <p className="app-subtitle">Análise de Execução com IA</p>
                        </div>
                        <button className="history-btn" onClick={() => setShowHistory(true)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 8v4l3 3" />
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                            <span>Histórico</span>
                        </button>
                    </div>
                </div>
            </header>

            <nav className="day-selector">
                <div className="day-selector-inner">
                    {days.map((day) => {
                        const data = workoutPlan[day];
                        return (
                            <button
                                key={day}
                                className={`day-btn ${selectedDay === day ? 'active' : ''}`}
                                onClick={() => setSelectedDay(day)}
                            >
                                <span className="day-emoji">{data.emoji}</span>
                                <span className="day-name">{day.slice(0, 3)}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            <main className="workout-content">
                <div className="workout-header">
                    <div className="workout-title-row">
                        <span className="workout-emoji">{dayData.emoji}</span>
                        <div>
                            <h2 className="workout-name">{dayData.name}</h2>
                            <p className="workout-focus">{dayData.focus}</p>
                        </div>
                    </div>
                    <div className="workout-stats">
                        <div className="stat">
                            <span className="stat-value">{dayData.exercises.length}</span>
                            <span className="stat-label">exercícios</span>
                        </div>
                    </div>
                </div>

                <div className="exercises-list">
                    {dayData.exercises.map((exercise, index) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
                    ))}
                </div>
            </main>

            <footer className="app-footer">
                <p>Envie vídeos dos seus exercícios e receba análise da IA 🤖</p>
            </footer>

            {showHistory && <HistoryTable onClose={() => setShowHistory(false)} />}
        </div>
    );
}
