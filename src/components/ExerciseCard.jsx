import React, { useState } from 'react';
import { CheckCircle2, Circle, Dumbbell } from 'lucide-react';
import { formatSets } from '../data/workouts';

const ExerciseCard = ({ exercise, index }) => {
    const [completed, setCompleted] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="glass-card-hover p-4 sm:p-6 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Exercise Image/GIF */}
            <div className="relative mb-4 rounded-xl overflow-hidden bg-dark-800/50 aspect-video">
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
            <div className="space-y-3">
                {/* Title and Completion */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white flex-1">
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

                {/* Sets and Reps */}
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 bg-gradient-to-r from-primary-600/20 to-accent-600/20 border border-primary-500/30 rounded-lg">
                        <span className="text-sm font-bold text-primary-300">
                            {formatSets(exercise.sets)}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-dark-300 leading-relaxed">
                    {exercise.description}
                </p>
            </div>
        </div>
    );
};

export default ExerciseCard;
