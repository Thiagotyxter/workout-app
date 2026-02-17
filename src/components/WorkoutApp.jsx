import { useState, useEffect } from 'react';
import { workoutPlan, getAllDays } from '../data/workoutData';
import ExerciseCard from './ExerciseCard';
import HistoryTable from './HistoryTable';
import AuthModal from './AuthModal';
import { authService } from '../services/authService';
import './WorkoutApp.css';

export default function WorkoutApp() {
    const days = getAllDays();
    const [selectedDay, setSelectedDay] = useState(days[0]);
    const [currentTab, setCurrentTab] = useState('workout'); // 'workout' or 'history'
    const [showAuth, setShowAuth] = useState(false);
    const [user, setUser] = useState(authService.getUser());

    const dayData = workoutPlan[selectedDay];

    const handleLogout = () => {
        authService.logout();
        setUser(null);
    };

    const handleAuthSuccess = () => {
        setUser(authService.getUser());
        setShowAuth(false);
    };

    return (
        <div className="workout-app">
            <header className="app-header">
                <div className="header-content">
                    <div className="header-top">
                        <div className="title-area">
                            <h1 className="app-title">
                                <span className="title-icon">🏋️</span>
                                Workout<span className="title-accent">Pro</span>
                            </h1>
                            <p className="app-subtitle">Análise de Execução com IA</p>
                        </div>
                        <div className="header-actions">
                            <button className="history-btn" onClick={() => setShowHistory(true)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 8v4l3 3" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                                <span>Histórico</span>
                            </button>

                            {user ? (
                                <div className="user-profile">
                                    <span className="user-name">Olá, {user.name.split(' ')[0]}</span>
                                    <button className="logout-btn" onClick={handleLogout} title="Sair">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <button className="login-btn" onClick={() => setShowAuth(true)}>
                                    Entrar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {currentTab === 'workout' ? (
                <>
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
                </>
            ) : (
                <main className="history-page">
                    <HistoryTable onBack={() => setCurrentTab('workout')} isFullPage={true} />
                </main>
            )}

            <nav className="bottom-nav">
                <button
                    className={`nav-item ${currentTab === 'workout' ? 'active' : ''}`}
                    onClick={() => setCurrentTab('workout')}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span>Treinos</span>
                </button>
                <button
                    className={`nav-item ${currentTab === 'history' ? 'active' : ''}`}
                    onClick={() => {
                        if (user) {
                            setCurrentTab('history');
                        } else {
                            setShowAuth(true);
                        }
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4l3 3" />
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                    <span>Histórico</span>
                </button>
            </nav>

            {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuthSuccess={handleAuthSuccess} />}
        </div>
    );
}
