```javascript
import { useState, useEffect } from 'react';
import { getHistory, clearHistory } from '../services/historyService';
import AnalysisResult from './AnalysisResult';
import './HistoryTable.css';

export default function HistoryTable({ onClose, onBack, isFullPage }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [confirmClear, setConfirmClear] = useState(false);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const data = await getHistory();
                setHistory(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, []);

    const handleClear = () => {
        if (confirmClear) {
            clearHistory();
            setHistory([]);
            setConfirmClear(false);
        } else {
            setConfirmClear(true);
            setTimeout(() => setConfirmClear(false), 3000);
        }
    };

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getScoreClass = (score) => {
        if (score <= 3) return 'danger';
        if (score <= 5) return 'warning';
        if (score <= 7) return 'ok';
        return 'great';
    };

    const avgScore = history.length
        ? (history.reduce((s, e) => s + e.nota, 0) / history.length).toFixed(1)
        : '—';

    const bestScore = history.length
        ? Math.max(...history.map((e) => e.nota)).toFixed(1)
        : '—';

    return (
        <div className={isFullPage ? "history-page-content" : "history-overlay"} onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
            <div className={isFullPage ? "history-container full" : "history-container"}>
                <div className="history-header">
                    <div>
                        <h2 className="history-title">📊 Histórico de Análises</h2>
                        <p className="history-subtitle">{history.length} análise{history.length !== 1 ? 's' : ''} registrada{history.length !== 1 ? 's' : ''}</p>
                    </div>
                    {(onClose || onBack) && (
                        <button className="history-close" onClick={onClose || onBack}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>

                {history.length > 0 && (
                    <div className="history-stats">
                        <div className="history-stat">
                            <span className="stat-number">{history.length}</span>
                            <span className="stat-text">Total</span>
                        </div>
                        <div className="history-stat">
                            <span className="stat-number avg">{avgScore}</span>
                            <span className="stat-text">Média</span>
                        </div>
                        <div className="history-stat">
                            <span className="stat-number best">{bestScore}</span>
                            <span className="stat-text">Melhor</span>
                        </div>
                    </div>
                )}

                <div className="history-body">
                    {loading ? (
                        <div className="history-loading">
                            <div className="spinner"></div>
                            <p>Carregando seu histórico...</p>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="history-empty">
                            <span className="empty-icon">🎬</span>
                            <h3>Nenhuma análise registrada</h3>
                            <p>Envie vídeos dos seus exercícios para começar a construir seu histórico.</p>
                        </div>
                    ) : (
                        <div className="history-table-wrapper">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Vídeo</th>
                                        <th>Data</th>
                                        <th>Exercício</th>
                                        <th>Nota</th>
                                        <th>Resumo</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((entry) => (
                                        <>
                                            <tr
                                                key={entry.id}
                                                className={`history - row ${ expandedId === entry.id ? 'expanded' : '' } `}
                                                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                                            >
                                                <td className="cell-thumb">
                                                    {entry.thumbnail ? (
                                                        <img src={`data: image / jpeg; base64, ${ entry.thumbnail } `} alt="Thumbnail" className="thumb-img" />
                                                    ) : (
                                                        <div className="thumb-placeholder">🎬</div>
                                                    )}
                                                </td>
                                                <td className="cell-date">{formatDate(entry.date)}</td>
                                                <td className="cell-exercise">
                                                    <div>{entry.exerciseName}</div>
                                                    <div className="cell-muscle-mini">{entry.muscleGroup}</div>
                                                </td>
                                                <td className="cell-score">
                                                    <span className={`table - score score - ${ getScoreClass(entry.nota) } `}>
                                                        {entry.nota.toFixed(1)}
                                                    </span>
                                                </td>
                                                <td className="cell-summary">
                                                    {entry.resumo}
                                                </td>
                                                <td className="cell-expand">
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        style={{
                                                            transform: expandedId === entry.id ? 'rotate(180deg)' : 'none',
                                                            transition: 'transform 0.2s',
                                                        }}
                                                    >
                                                        <polyline points="6 9 12 15 18 9" />
                                                    </svg>
                                                </td>
                                            </tr>
                                            {expandedId === entry.id && (
                                                <tr key={`${ entry.id } -detail`} className="history-detail-row">
                                                    <td colSpan="5">
                                                        <AnalysisResult analysis={entry} compact={false} />
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {history.length > 0 && (
                    <div className="history-footer">
                        <button
                            className={`clear - btn ${ confirmClear ? 'confirm' : '' } `}
                            onClick={handleClear}
                        >
                            {confirmClear ? '⚠️ Confirmar exclusão' : '🗑️ Limpar histórico'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
