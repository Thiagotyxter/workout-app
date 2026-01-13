import React, { useState, useEffect } from 'react';
import DaySelector from './components/DaySelector';
import WorkoutView from './components/WorkoutView';
import { Dumbbell } from 'lucide-react';
import './index.css';

function App() {
    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    // Adjust to match our array (0 = Monday)
    const getCurrentDay = () => {
        const today = new Date().getDay();
        // Convert Sunday (0) to 6, and shift others down by 1
        return today === 0 ? 6 : today - 1;
    };

    const [selectedDay, setSelectedDay] = useState(getCurrentDay());

    return (
        <div className="min-h-screen bg-dark-950">
            {/* Header */}
            <header className="bg-dark-900/50 backdrop-blur-lg border-b border-dark-700/50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-2.5 rounded-xl">
                            <Dumbbell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold gradient-text">
                                Workout App
                            </h1>
                            <p className="text-sm text-dark-400">
                                Seu treino semanal personalizado
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Day Selector */}
            <DaySelector
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
            />

            {/* Workout Content */}
            <main className="pb-12">
                <WorkoutView selectedDay={selectedDay} />
            </main>

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
