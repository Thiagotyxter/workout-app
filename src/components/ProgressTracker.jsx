import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trophy, Calendar, TrendingUp } from 'lucide-react';

const ProgressTracker = () => {
    const WEEKS = 12;
    const WORKOUT_TYPES = ['Superior A', 'Inferior A', 'Superior B', 'Inferior B'];

    // Initialize progress from localStorage
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('workout-progress-v1');
        return saved ? JSON.parse(saved) : {};
    });

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('workout-progress-v1', JSON.stringify(progress));
    }, [progress]);

    const toggleWorkout = (week, type) => {
        const key = `week-${week}-${type}`;
        setProgress(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const calculateStats = () => {
        const totalPossible = WEEKS * WORKOUT_TYPES.length;
        const completed = Object.values(progress).filter(Boolean).length;
        const percentage = totalPossible > 0 ? Math.round((completed / totalPossible) * 100) : 0;

        return { completed, totalPossible, percentage };
    };

    const stats = calculateStats();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="bg-primary-500/20 p-3 rounded-xl">
                        <Trophy className="w-8 h-8 text-primary-400" />
                    </div>
                    <div>
                        <p className="text-dark-400 text-sm">Total Concluído</p>
                        <p className="text-2xl font-bold text-white">{stats.completed} / {stats.totalPossible}</p>
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="bg-accent-500/20 p-3 rounded-xl">
                        <TrendingUp className="w-8 h-8 text-accent-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-dark-400 text-sm">Progresso Geral</p>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-1000"
                                    style={{ width: `${stats.percentage}%` }}
                                ></div>
                            </div>
                            <span className="text-xl font-bold text-white">{stats.percentage}%</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6 flex items-center gap-4">
                    <div className="bg-green-500/20 p-3 rounded-xl">
                        <Calendar className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <p className="text-dark-400 text-sm">Meta</p>
                        <p className="text-2xl font-bold text-white">{WEEKS} Semanas</p>
                    </div>
                </div>
            </div>

            {/* Weeks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(WEEKS)].map((_, weekIndex) => {
                    const weekNum = weekIndex + 1;
                    const weekCompleted = WORKOUT_TYPES.filter(type => progress[`week-${weekNum}-${type}`]).length;

                    return (
                        <div key={weekIndex} className="glass-card overflow-hidden flex flex-col">
                            <div className="bg-dark-800/50 px-4 py-3 border-b border-dark-700/50 flex justify-between items-center">
                                <h3 className="font-bold text-white">Semana {weekNum}</h3>
                                <span className="text-xs font-medium px-2 py-1 bg-dark-700 rounded-lg text-dark-300">
                                    {weekCompleted}/4
                                </span>
                            </div>

                            <div className="p-4 space-y-3 flex-1">
                                {WORKOUT_TYPES.map(type => {
                                    const isDone = progress[`week-${weekNum}-${type}`];
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => toggleWorkout(weekNum, type)}
                                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 border ${isDone
                                                    ? 'bg-primary-500/10 border-primary-500/30 text-white'
                                                    : 'bg-dark-900/50 border-dark-700/50 text-dark-400 hover:border-dark-600'
                                                }`}
                                        >
                                            <span className="text-sm font-medium">{type}</span>
                                            {isDone ? (
                                                <CheckCircle2 className="w-5 h-5 text-primary-400" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-dark-600" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Mini progress bar for the week */}
                            <div className="h-1 bg-dark-800">
                                <div
                                    className="h-full bg-primary-500 transition-all duration-500"
                                    style={{ width: `${(weekCompleted / 4) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressTracker;
