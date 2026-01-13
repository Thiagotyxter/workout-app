import React from 'react';
import { Coffee, Heart, Sparkles } from 'lucide-react';

const RestDay = ({ dayName }) => {
    const tips = [
        'Hidrate-se bem ao longo do dia',
        'Faça alongamentos leves',
        'Durma pelo menos 7-8 horas',
        'Mantenha uma alimentação balanceada',
        'Relaxe e recupere sua energia',
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
            <div className="glass-card p-8 sm:p-12 text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-2xl opacity-30 animate-pulse-slow"></div>
                        <div className="relative bg-gradient-to-br from-primary-600 to-accent-600 p-6 rounded-full">
                            <Coffee className="w-16 h-16 text-white" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
                        Dia de Descanso
                    </h2>
                    <p className="text-xl text-dark-300">
                        {dayName}
                    </p>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <p className="text-lg text-dark-200 max-w-2xl mx-auto">
                        O descanso é tão importante quanto o treino! É durante o repouso que seus músculos se recuperam e crescem.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-accent-400">
                        <Heart className="w-5 h-5 animate-pulse" />
                        <span className="text-sm font-medium">Cuide do seu corpo</span>
                    </div>
                </div>

                {/* Recovery Tips */}
                <div className="pt-6 border-t border-dark-700/50">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-primary-400" />
                        <h3 className="text-lg font-semibold text-white">
                            Dicas de Recuperação
                        </h3>
                    </div>

                    <ul className="space-y-3 max-w-md mx-auto">
                        {tips.map((tip, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-3 text-left text-dark-300 animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mt-2 flex-shrink-0"></div>
                                <span className="text-sm">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RestDay;
