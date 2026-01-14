import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trophy, Calendar, TrendingUp, ArrowUpRight, Activity, Loader2, Cloud } from 'lucide-react';
import { WORKOUTS } from '../data/workouts';
import { supabase } from '../lib/supabaseClient';

const ProgressTracker = ({ currentWeek }) => {
    const WEEKS = 12;
    const WORKOUT_TYPES = ['Superior A', 'Inferior A', 'Superior B', 'Inferior B'];
    const [syncing, setSyncing] = useState(false);

    // Initialize progress from localStorage
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('workout-progress-v1');
        return saved ? JSON.parse(saved) : {};
    });

    // Fetch progress from Supabase on mount
    useEffect(() => {
        const fetchProgress = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            setSyncing(true);
            const { data, error } = await supabase
                .from('workout_logs')
                .select('*')
                .eq('user_id', user.id);

            if (data) {
                const newProgress = {};
                data.forEach(log => {
                    newProgress[`week-${log.week_num}-${log.workout_type}`] = true;
                });
                setProgress(newProgress);
                localStorage.setItem('workout-progress-v1', JSON.stringify(newProgress));
            }
            setSyncing(false);
        };

        fetchProgress();
    }, []);

    const toggleWorkout = async (week, type) => {
        const key = `week-${week}-${type}`;
        const isNowDone = !progress[key];

        // Update local state immediately
        setProgress(prev => ({
            ...prev,
            [key]: isNowDone
        }));

        // Sync with Supabase
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setSyncing(true);
        if (isNowDone) {
            await supabase.from('workout_logs').upsert({
                user_id: user.id,
                week_num: week,
                workout_type: type,
                completed_at: new Date().toISOString()
            });
        } else {
            await supabase.from('workout_logs')
                .delete()
                .eq('user_id', user.id)
                .eq('week_num', week)
                .eq('workout_type', type);
        }
        setSyncing(false);
    };

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('workout-progress-v1', JSON.stringify(progress));
    }, [progress]);

    const calculateStats = () => {
        const totalPossible = WEEKS * WORKOUT_TYPES.length;
        const completed = Object.values(progress).filter(Boolean).length;
        const percentage = totalPossible > 0 ? Math.round((completed / totalPossible) * 100) : 0;

        return { completed, totalPossible, percentage };
    };

    const stats = calculateStats();

    // Get all exercises to show evolution
    const allExercises = Object.values(WORKOUTS).flat();

    const getExerciseEvolution = (exerciseId) => {
        const week1 = JSON.parse(localStorage.getItem(`exercise-log-${exerciseId}-week-1`)) || [];
        const current = JSON.parse(localStorage.getItem(`exercise-log-${exerciseId}-week-${currentWeek}`)) || [];

        const getSummary = (logs) => {
            if (!logs || logs.length === 0) return null;
            const validLogs = logs.filter(l => l.weight || l.reps);
            if (validLogs.length === 0) return null;
            // Return first set as summary
            return `${validLogs[0].weight || '0'}kg x ${validLogs[0].reps || '0'}`;
        };

        return {
            start: getSummary(week1),
            current: getSummary(current)
        };
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in space-y-12">
            {/* Header Stats */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-dark-500 uppercase tracking-widest flex items-center gap-2">
                    Dashboard de Evolução
                    {syncing ? (
                        <Loader2 className="w-3 h-3 animate-spin text-primary-400" />
                    ) : (
                        <Cloud className="w-3 h-3 text-green-500/50" />
                    )}
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            {/* Evolution Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-bold text-white">Evolução de Cargas</h2>
                </div>

                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-dark-800/50 border-b border-dark-700/50">
                                    <th className="px-6 py-4 text-xs font-bold text-dark-400 uppercase tracking-widest">Exercício</th>
                                    <th className="px-6 py-4 text-xs font-bold text-dark-400 uppercase tracking-widest text-center">Início (S1)</th>
                                    <th className="px-6 py-4 text-xs font-bold text-dark-400 uppercase tracking-widest text-center">Atual (S{currentWeek})</th>
                                    <th className="px-6 py-4 text-xs font-bold text-dark-400 uppercase tracking-widest text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-800/50">
                                {allExercises.map((ex) => {
                                    const evolution = getExerciseEvolution(ex.id);
                                    if (!evolution.start && !evolution.current) return null;

                                    return (
                                        <tr key={ex.id} className="hover:bg-dark-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-white">{ex.name}</p>
                                                <p className="text-[10px] text-dark-500 uppercase">{ex.muscle}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm text-dark-400">{evolution.start || '---'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-sm font-bold text-primary-400">{evolution.current || '---'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {evolution.start && evolution.current && (
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 text-green-400 text-[10px] font-bold">
                                                        <ArrowUpRight className="w-3 h-3" />
                                                        EVOLUINDO
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {!allExercises.some(ex => {
                                    const ev = getExerciseEvolution(ex.id);
                                    return ev.start || ev.current;
                                }) && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-dark-500 italic text-sm">
                                                Comece a preencher as cargas nos treinos para ver sua evolução aqui!
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Weeks Grid */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-bold text-white">Checklist de Treinos</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(WEEKS)].map((_, weekIndex) => {
                        const weekNum = weekIndex + 1;
                        const weekCompleted = WORKOUT_TYPES.filter(type => progress[`week-${weekNum}-${type}`]).length;

                        return (
                            <div key={weekIndex} className={`glass-card overflow-hidden flex flex-col transition-all duration-500 ${weekNum === currentWeek ? 'ring-2 ring-primary-500/50 shadow-lg shadow-primary-500/10' : ''}`}>
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
            </section>
        </div>
    );
};


export default ProgressTracker;
