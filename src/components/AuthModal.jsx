import { useState } from 'react';
import { authService } from '../services/authService';
import './AuthModal.css';

export default function AuthModal({ onClose, onAuthSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                await authService.login(email, password);
            } else {
                await authService.register(name, email, password);
            }
            onAuthSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-container auth-modal">
                <div className="modal-header">
                    <div>
                        <h2 className="modal-title">{isLogin ? 'Bem-vindo de volta' : 'Criar conta'}</h2>
                        <p className="modal-subtitle">
                            {isLogin ? 'Entre para salvar seu progresso' : 'Comece a analisar seus treinos'}
                        </p>
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <form className="modal-body auth-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message">
                            <span>{error}</span>
                        </div>
                    )}

                    {!isLogin && (
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                placeholder="Seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="analyze-submit-btn auth-submit" type="submit" disabled={loading}>
                        {loading ? <span className="btn-spinner"></span> : (isLogin ? 'Entrar' : 'Cadastrar')}
                    </button>

                    <p className="auth-switch">
                        {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                        <button type="button" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Cadastre-se' : 'Faça login'}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
