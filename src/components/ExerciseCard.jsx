import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Dumbbell, Save, History, Cloud, CloudOff, Loader2 } from 'lucide-react';
import { formatSets } from '../data/workouts';
import { supabase } from '../lib/supabaseClient';

const ExerciseCard = ({ exercise, index, currentWeek }) => {
    const [completed, setCompleted] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [syncing, setSyncing] = useState(false);

    // Load tracking state for current week
    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem(`exercise-log-${exercise.id}-week-${currentWeek}`);
        return saved ? JSON.parse(saved) : exercise.sets.map(() => ({ weight: '', reps: '' }));
    });

    // Get previous week's data for reference
    const [prevLogs, setPrevLogs] = useState(null);

    // Fetch data from Supabase on mount or week change
    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Fetch current week logs
            const { data: currentData } = await supabase
                .from('exercise_logs')
                .select('*')
                .eq('user_id', user.id)
                .eq('exercise_id', exercise.id)
                .eq('week_num', currentWeek);

            if (currentData && currentData.length > 0) {
                const newLogs = exercise.sets.map((_, sIdx) => {
                    const found = currentData.find(d => d.set_index === sIdx);
                    return found ? { weight: found.weight, reps: found.reps } : { weight: '', reps: '' };
                });
                setLogs(newLogs);
                localStorage.setItem(`exercise-log-${exercise.id}-week-${currentWeek}`, JSON.stringify(newLogs));
            }

            // Fetch previous week logs
            if (currentWeek > 1) {
                const { data: prevData } = await supabase
                    .from('exercise_logs')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('exercise_id', exercise.id)
                    .eq('week_num', currentWeek - 1);

                if (prevData && prevData.length > 0) {
                    const pLogs = exercise.sets.map((_, sIdx) => {
                        const found = prevData.find(d => d.set_index === sIdx);
                        return found ? { weight: found.weight, reps: found.reps } : { weight: '', reps: '' };
                    });
                    setPrevLogs(pLogs);
                }
            }
        };

        fetchData();
    }, [currentWeek, exercise.id, exercise.sets]);

    // Save logs to Supabase with debounce
    useEffect(() => {
        const timer = setTimeout(async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            setSyncing(true);
            try {
                const upserts = logs.map((log, sIdx) => ({
                    user_id: user.id,
                    exercise_id: exercise.id,
                    week_num: currentWeek,
                    set_index: sIdx,
                    weight: log.weight,
                    reps: log.reps,
                    updated_at: new Date().toISOString()
                }));

                const { error } = await supabase
                    .from('exercise_logs')
                    .upsert(upserts, { onConflict: 'user_id,exercise_id,week_num,set_index' });

                if (error) throw error;
                localStorage.setItem(`exercise-log-${exercise.id}-week-${currentWeek}`, JSON.stringify(logs));
            } catch (err) {
                console.error('Error syncing to Supabase:', err);
            } finally {
                setSyncing(false);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [logs, exercise.id, currentWeek]);

    const handleLogChange = (setIndex, field, value) => {
        const newLogs = [...logs];
        newLogs[setIndex] = { ...newLogs[setIndex], [field]: value };
        setLogs(newLogs);
    };

    return (
        <div
            className="glass-card-hover p-4 sm:p-6 animate-slide-up flex flex-col h-full"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Exercise Image/GIF */}
            <div className="relative mb-4 rounded-xl overflow-hidden bg-dark-800/50 aspect-video flex-shrink-0">
                {!imageError ? (
                    <img
                        src={exercise.gifUrl}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Dumbbell className="w-16 h-16 text-primary-500/30" />
                    </div>
                )}

                {/* Muscle Group Badge */}
                <div className="absolute top-2 right-2 px-3 py-1 bg-dark-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-400 border border-primary-500/30">
                    {exercise.muscle}
                </div>

                {/* Sync Status */}
                <div className="absolute bottom-2 right-2">
                    {syncing ? (
                        <Loader2 className="w-4 h-4 text-primary-400 animate-spin" />
                    ) : (
                        <Cloud className="w-4 h-4 text-green-500/50" />
                    )}
                </div>
            </div>

            {/* Exercise Info */}
            <div className="space-y-4 flex-1 flex flex-col">
                {/* Title and Completion */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white flex-1 leading-tight">
                        {exercise.name}
                    </h3>
                    <button
                        onClick={() => setCompleted(!completed)}
                        className="flex-shrink-0 transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label={completed ? 'Marcar como não concluído' : 'Marcar como concluído'}
                    >
                        {completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                            <Circle className="w-6 h-6 text-dark-500 hover:text-dark-400" />
                        )}
                    </button>
                </div>

                {/* Target Sets/Reps */}
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                        <span className="text-xs font-bold text-primary-300 uppercase tracking-wider">
                            Alvo: {formatSets(exercise.sets)}
                        </span>
                    </div>
                </div>

                {/* Load Tracking Section */}
                <div className="bg-dark-950/50 rounded-xl p-3 border border-dark-700/30 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-dark-400 mb-1">
                        <div className="flex items-center gap-2">
                            <History className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Cargas Semana {currentWeek}</span>
                        </div>
                        {prevLogs && (
                            <span className="text-[9px] text-primary-400 font-medium">Ref. Semana {currentWeek - 1}</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        {exercise.sets.map((set, sIdx) => (
                            <div key={sIdx} className="space-y-1">
                                <div className="grid grid-cols-12 gap-2 items-center">
                                    <div className="col-span-2 text-[10px] font-bold text-dark-500 uppercase">
                                        S{sIdx + 1}
                                    </div>
                                    <div className="col-span-5 relative">
                                        <input
                                            type="text"
                                            placeholder="Peso"
                                            value={logs[sIdx]?.weight || ''}
                                            onChange={(e) => handleLogChange(sIdx, 'weight', e.target.value)}
                                            className="w-full bg-dark-900 border border-dark-700/50 rounded-lg px-2 py-1.5 text-xs text-white placeholder:text-dark-600 focus:outline-none focus:border-primary-500/50 transition-colors"
                                        />
                                    </div>
                                    <div className="col-span-5 relative">
                                        <input
                                            type="text"
                                            placeholder="Reps"
                                            value={logs[sIdx]?.reps || ''}
                                            onChange={(e) => handleLogChange(sIdx, 'reps', e.target.value)}
                                            className="w-full bg-dark-900 border border-dark-700/50 rounded-lg px-2 py-1.5 text-xs text-white placeholder:text-dark-600 focus:outline-none focus:border-primary-500/50 transition-colors"
                                        />
                                    </div>
                                </div>
                                {prevLogs && prevLogs[sIdx] && (prevLogs[sIdx].weight || prevLogs[sIdx].reps) && (
                                    <div className="pl-8 text-[9px] text-dark-500 flex gap-2">
                                        <span>Anterior:</span>
                                        <span className="text-primary-400/70 font-medium">
                                            {prevLogs[sIdx].weight || '0'}kg x {prevLogs[sIdx].reps || '0'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs text-dark-400 leading-relaxed italic border-l-2 border-dark-700 pl-3 mt-auto">
                    {exercise.description}
                </p>
            </div>
        </div>
    );
};

export default ExerciseCard;
