import { useState, useRef } from 'react';
import { analyzeExerciseVideo } from '../services/aiService';
import './VideoUploadModal.css';

export default function VideoUploadModal({ exercise, onClose, onAnalysisComplete }) {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState('');
    const fileInputRef = useRef(null);

    const MAX_SIZE = 20 * 1024 * 1024; // 20MB

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            setError('Por favor, selecione um arquivo de vídeo.');
            return;
        }

        if (file.size > MAX_SIZE) {
            setError('O vídeo deve ter no máximo 20MB. Tente um vídeo mais curto.');
            return;
        }

        setError(null);
        setVideoFile(file);
        setVideoUrl(URL.createObjectURL(file));
    };

    const handleAnalyze = async () => {
        if (!videoFile) return;

        setLoading(true);
        setError(null);
        setProgress('Preparando vídeo...');

        try {
            setProgress('Enviando para análise da IA...');

            const result = await analyzeExerciseVideo(
                videoFile,
                exercise.name,
                exercise.tips
            );

            setProgress('Análise concluída!');
            onAnalysisComplete(result);
        } catch (err) {
            console.error('Analysis error:', err);
            setError(err.message || 'Erro ao analisar o vídeo. Tente novamente.');
        } finally {
            setLoading(false);
            setProgress('');
        }
    };

    const handleRemoveVideo = () => {
        setVideoFile(null);
        setVideoUrl(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && !loading && onClose()}>
            <div className="modal-container">
                <div className="modal-header">
                    <div>
                        <h2 className="modal-title">Analisar Execução</h2>
                        <p className="modal-exercise-name">{exercise.name}</p>
                    </div>
                    <button className="modal-close" onClick={onClose} disabled={loading}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="modal-body">
                    {!videoFile ? (
                        <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="video/*"
                                capture="environment"
                                onChange={handleFileSelect}
                                className="file-input-hidden"
                            />
                            <div className="upload-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <polygon points="23 7 16 12 23 17 23 7" />
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                </svg>
                            </div>
                            <h3 className="upload-title">Enviar Vídeo do Exercício</h3>
                            <p className="upload-subtitle">
                                Toque para gravar ou selecionar um vídeo
                            </p>
                            <div className="upload-specs">
                                <span>📱 Máx. 20MB</span>
                                <span>⏱️ Até 30 segundos</span>
                                <span>📐 Filme de lado</span>
                            </div>
                        </div>
                    ) : (
                        <div className="video-preview-area">
                            <video
                                src={videoUrl}
                                controls
                                className="video-preview"
                                playsInline
                            />
                            <div className="video-info">
                                <span className="video-name">{videoFile.name}</span>
                                <span className="video-size">
                                    {(videoFile.size / (1024 * 1024)).toFixed(1)} MB
                                </span>
                            </div>
                            {!loading && (
                                <button className="remove-video-btn" onClick={handleRemoveVideo}>
                                    Remover vídeo
                                </button>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {loading && (
                        <div className="loading-area">
                            <div className="loading-spinner">
                                <div className="spinner-ring"></div>
                                <div className="spinner-icon">🤖</div>
                            </div>
                            <p className="loading-text">{progress}</p>
                            <p className="loading-subtext">
                                A IA está analisando cada detalhe do seu movimento...
                            </p>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={onClose} disabled={loading}>
                        Cancelar
                    </button>
                    <button
                        className="analyze-submit-btn"
                        onClick={handleAnalyze}
                        disabled={!videoFile || loading}
                    >
                        {loading ? (
                            <>
                                <span className="btn-spinner"></span>
                                Analisando...
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                                Analisar com IA
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
