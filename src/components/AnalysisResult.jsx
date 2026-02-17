import './AnalysisResult.css';

export default function AnalysisResult({ analysis, compact = false }) {
    if (!analysis) return null;

    const scoreLevel = getScoreLevel(analysis.nota);
    const scorePercent = (analysis.nota / 10) * 100;

    if (compact) {
        return (
            <div className="analysis-compact">
                <div className={`compact-score score-${scoreLevel}`}>
                    <span className="compact-score-value">{analysis.nota.toFixed(1)}</span>
                    <span className="compact-score-label">/10</span>
                </div>
                <p className="compact-summary">{analysis.resumo}</p>
                <span className="compact-expand-hint">Toque para ver detalhes →</span>
            </div>
        );
    }

    return (
        <div className="analysis-result">
            <div className="analysis-header">
                <h3 className="analysis-title">Análise da IA</h3>
            </div>

            <div className="score-section">
                <div className={`score-gauge score-${scoreLevel}`}>
                    <svg viewBox="0 0 120 120" className="score-ring">
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="var(--score-bg)"
                            strokeWidth="10"
                        />
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="var(--score-color)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={`${scorePercent * 3.14} 314`}
                            transform="rotate(-90 60 60)"
                            className="score-progress"
                        />
                    </svg>
                    <div className="score-value-container">
                        <span className="score-value">{analysis.nota.toFixed(1)}</span>
                        <span className="score-max">/10</span>
                    </div>
                </div>
                <p className="score-summary">{analysis.resumo}</p>
            </div>

            {analysis.riscoLesao && (
                <div className="risk-alert">
                    <div className="risk-icon">⚠️</div>
                    <div>
                        <strong>Risco de Lesão</strong>
                        <p>{analysis.riscoLesao}</p>
                    </div>
                </div>
            )}

            {analysis.positivos?.length > 0 && (
                <div className="feedback-section positives">
                    <h4 className="feedback-title">
                        <span className="feedback-icon">✅</span>
                        Pontos Positivos
                    </h4>
                    <ul className="feedback-list">
                        {analysis.positivos.map((item, i) => (
                            <li key={i} style={{ animationDelay: `${i * 0.1}s` }}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {analysis.melhorias?.length > 0 && (
                <div className="feedback-section improvements">
                    <h4 className="feedback-title">
                        <span className="feedback-icon">🔧</span>
                        Pontos a Melhorar
                    </h4>
                    <ul className="feedback-list">
                        {analysis.melhorias.map((item, i) => (
                            <li key={i} style={{ animationDelay: `${i * 0.1}s` }}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {analysis.dicas?.length > 0 && (
                <div className="feedback-section tips">
                    <h4 className="feedback-title">
                        <span className="feedback-icon">💡</span>
                        Dicas Práticas
                    </h4>
                    <ul className="feedback-list">
                        {analysis.dicas.map((item, i) => (
                            <li key={i} style={{ animationDelay: `${i * 0.1}s` }}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function getScoreLevel(score) {
    if (score <= 3) return 'danger';
    if (score <= 5) return 'warning';
    if (score <= 7) return 'ok';
    return 'great';
}
