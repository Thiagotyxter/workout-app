import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Dumbbell, Save, History } from 'lucide-react';
import { formatSets } from '../data/workouts';

const ExerciseCard = ({ exercise, index, currentWeek }) => {
    const [completed, setCompleted] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Load tracking state for current week
    const [logs, setLogs] = useState(() => {
        const saved = localStorage.getItem(`exercise-log-${exercise.id}-week-${currentWeek}`);
        return saved ? JSON.parse(saved) : exercise.sets.map(() => ({ weight: '', reps: '' }));
    });

    // Get previous week's data for reference
    const [prevLogs, setPrevLogs] = useState(null);

    useEffect(() => {
        // Load current week's data when week changes
        const saved = localStorage.getItem(`exercise-log-${exercise.id}-week-${currentWeek}`);
        setLogs(saved ? JSON.parse(saved) : exercise.sets.map(() => ({ weight: '', reps: '' })));

        // Load previous week's data
        if (currentWeek > 1) {
            const prevSaved = localStorage.getItem(`exercise-log-${exercise.id}-week-${currentWeek - 1}`);
            if (prevSaved) setPrevLogs(JSON.parse(prevSaved));
            else setPrevLogs(null);
        } else {
            setPrevLogs(null);
        }
    }, [currentWeek, exercise.id, exercise.sets]);

    // Save logs to localStorage
    useEffect(() => {
        localStorage.setItem(`exercise-log-${exercise.id}-week-${currentWeek}`, JSON.stringify(logs));
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
