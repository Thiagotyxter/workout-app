import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Dumbbell, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setMessage({ type: 'success', text: 'Cadastro realizado! Verifique seu email.' });
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-dark-950">
            <div className="max-w-md w-full space-y-8 animate-fade-in">
                {/* Logo & Header */}
                <div className="text-center">
                    <div className="inline-flex bg-gradient-to-br from-primary-600 to-accent-600 p-4 rounded-2xl shadow-xl shadow-primary-500/20 mb-6">
                        <Dumbbell className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        {isSignUp ? 'Criar sua conta' : 'Bem-vindo de volta'}
                    </h2>
                    <p className="mt-2 text-dark-400">
                        {isSignUp
                            ? 'Comece a trackear sua evolução hoje'
                            : 'Entre para sincronizar seus treinos'}
                    </p>
                </div>

                {/* Form Card */}
                <div className="glass-card p-8 shadow-2xl">
                    <form className="space-y-6" onSubmit={handleAuth}>
                        {message.text && (
                            <div className={`p-4 rounded-xl text-sm font-medium border ${message.type === 'success'
                                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-dark-500" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-dark-900 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                                    placeholder="Seu email"
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-dark-500" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 bg-dark-900 border border-dark-700/50 rounded-xl text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                                    placeholder="Sua senha"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-600/20"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isSignUp ? 'Cadastrar' : 'Entrar'}
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                        >
                            {isSignUp
                                ? 'Já tem uma conta? Entre aqui'
                                : 'Não tem uma conta? Cadastre-se'}
                        </button>
                    </div>
                </div>

                {/* Guest Mode (Optional) */}
                <div className="text-center">
                    <p className="text-xs text-dark-500">
                        Ao entrar, você concorda em salvar seus dados de treino de forma segura na nuvem.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
