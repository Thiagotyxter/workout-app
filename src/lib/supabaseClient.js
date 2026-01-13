import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas credenciais do Supabase
// Você as encontra em: Settings > API no seu painel do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'SUA_URL_AQUI';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'SUA_ANON_KEY_AQUI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
