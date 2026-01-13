import React from 'react';
import { WORKOUTS, DAYS } from '../data/workouts';
import ExerciseCard from './ExerciseCard';
import RestDay from './RestDay';

const WorkoutView = ({ selectedDay }) => {
    const day = DAYS[selectedDay];
    const workoutType = day.workout;

    // Check if it's a rest day
    if (workoutType === 'Descanso') {
        return <RestDay dayName={day.name} />;
    }

    // Get exercises for the selected workout
    const exercises = WORKOUTS[workoutType] || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            {/* Workout Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                    {workoutType}
                </h1>
                <p className="text-dark-400 text-sm sm:text-base">
                    {day.name} • {exercises.length} exercícios
                </p>
            </div>

            {/* Exercise Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {exercises.map((exercise, index) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default WorkoutView;
