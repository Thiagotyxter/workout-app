import { useState } from 'react';
import VideoUploadModal from './VideoUploadModal';
import AnalysisResult from './AnalysisResult';
import AuthModal from './AuthModal';
import { addToHistory } from '../services/historyService';
import { authService } from '../services/authService';
import './WorkoutApp.css';

export default function ExerciseCard({ exercise, index }) {
    const [showModal, setShowModal] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const handleAnalysisClick = (e) => {
        e.stopPropagation();
        if (!authService.isAuthenticated()) {
            setShowAuth(true);
        } else {
            setShowModal(true);
        }
    };

    const handleAuthSuccess = () => {
        setShowAuth(false);
        setShowModal(true);
    };

    const handleAnalysisComplete = (result) => {
        setAnalysis(result);
        setShowModal(false);
        addToHistory({
            exerciseName: exercise.name,
            muscleGroup: exercise.muscleGroup,
            ...result,
        });
    };

    return (
        <>
            <div
                className="exercise-card"
                style={{ animationDelay: `${index * 0.08}s` }}
            >
                <div className="exercise-card-header" onClick={() => setExpanded(!expanded)}>
                    <div className="exercise-info">
                        <div className="exercise-number">{String(index + 1).padStart(2, '0')}</div>
                        <div className="exercise-details">
                            <h3 className="exercise-name">{exercise.name}</h3>
                            <div className="exercise-meta">
                                <span className="exercise-muscle">{exercise.muscleGroup}</span>
                                <span className="exercise-sets">
                                    {exercise.sets}x{exercise.reps}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="exercise-actions">
                        {analysis && (
                            <div className={`mini-score score-${getScoreLevel(analysis.nota)}`}>
                                {analysis.nota.toFixed(1)}
                            </div>
                        )}
                        <button
                            className="analyze-btn"
                            onClick={handleAnalysisClick}
                            title="Analisar execução com IA"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="23 7 16 12 23 17 23 7" />
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                            <span>Analisar</span>
                        </button>
                        <button className="expand-btn" data-expanded={expanded}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>
                    </div>
                </div>

                {expanded && (
                    <div className="exercise-expanded">
                        <p className="exercise-description">{exercise.description}</p>
                        <div className="exercise-tips">
                            <h4>💡 Dicas de Execução</h4>
                            <ul>
                                {exercise.tips.map((tip, i) => (
                                    <li key={i}>{tip}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {analysis && (
                    <div className="analysis-preview" onClick={() => setExpanded(true)}>
                        <AnalysisResult analysis={analysis} compact={!expanded} />
                    </div>
                )}
            </div>

            {showModal && (
                <VideoUploadModal
                    exercise={exercise}
                    onClose={() => setShowModal(false)}
                    onAnalysisComplete={handleAnalysisComplete}
                />
            )}

            {showAuth && (
                <AuthModal
                    onClose={() => setShowAuth(false)}
                    onAuthSuccess={handleAuthSuccess}
                />
            )}
        </>
    );
}

function getScoreLevel(score) {
    if (score <= 3) return 'danger';
    if (score <= 5) return 'warning';
    if (score <= 7) return 'ok';
    return 'great';
}
