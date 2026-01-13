import React, { useState, useEffect } from 'react';
import DaySelector from './components/DaySelector';
import WorkoutView from './components/WorkoutView';
import ProgressTracker from './components/ProgressTracker';
import { Dumbbell, LayoutGrid, CheckSquare } from 'lucide-react';
import './index.css';

function App() {
    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const getCurrentDay = () => {
        const today = new Date().getDay();
        return today === 0 ? 6 : today - 1;
    };

    const [selectedDay, setSelectedDay] = useState(getCurrentDay());
    const [activeTab, setActiveTab] = useState('workout'); // 'workout' or 'progress'
    const [currentWeek, setCurrentWeek] = useState(() => {
        const saved = localStorage.getItem('workout-current-week');
        return saved ? parseInt(saved) : 1;
    });

    useEffect(() => {
        localStorage.setItem('workout-current-week', currentWeek.toString());
    }, [currentWeek]);

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Header */}
            <header className="bg-dark-900/50 backdrop-blur-lg border-b border-dark-700/50 sticky top-0 z-[60]">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-2.5 rounded-xl shadow-lg shadow-primary-500/20">
                                <Dumbbell className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold gradient-text">
                                    Workout App
                                </h1>
                                <p className="text-xs sm:text-sm text-dark-400">
                                    Semana {currentWeek} • Seu treino personalizado
                                </p>
                            </div>
                        </div>

                        {/* Week and Tab Navigation */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Week Selector */}
                            <div className="flex items-center bg-dark-800/50 p-1 rounded-xl border border-dark-700/50">
                                <span className="text-[10px] font-bold text-dark-500 px-2 uppercase tracking-widest">Semana</span>
                                <select
                                    value={currentWeek}
                                    onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                                    className="bg-transparent text-white text-sm font-bold focus:outline-none pr-2 cursor-pointer"
                                >
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1} className="bg-dark-900">
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Navigation Tabs */}
                            <div className="flex bg-dark-800/50 p-1 rounded-xl border border-dark-700/50">
                                <button
                                    onClick={() => setActiveTab('workout')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'workout'
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                            : 'text-dark-400 hover:text-white'
                                        }`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                    Treino
                                </button>
                                <button
                                    onClick={() => setActiveTab('progress')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'progress'
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                            : 'text-dark-400 hover:text-white'
                                        }`}
                                >
                                    <CheckSquare className="w-4 h-4" />
                                    Progresso
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {activeTab === 'workout' ? (
                <>
                    {/* Day Selector */}
                    <DaySelector
                        selectedDay={selectedDay}
                        onDayChange={setSelectedDay}
                    />

                    {/* Workout Content */}
                    <main className="pb-12">
                        <WorkoutView selectedDay={selectedDay} currentWeek={currentWeek} />
                    </main>
                </>
            ) : (
                <main className="pb-12">
                    <ProgressTracker currentWeek={currentWeek} />
                </main>
            )}

            {/* Footer */}
            <footer className="bg-dark-900/30 border-t border-dark-700/50 py-6 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm text-dark-400">
                        Desenvolvido com 💪 para seus treinos
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
