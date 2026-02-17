import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-workout-key';

// Database setup
const db = new Database('workout.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT,
    exercise_name TEXT,
    muscle_group TEXT,
    nota REAL,
    thumbnail TEXT,
    data_json TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware for auth
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
        req.user = user;
        next();
    });
};

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Auth endpoints
app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)');
        const info = stmt.run(email, hashedPassword, name);

        const user = { id: info.lastInsertRowid, email, name };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, user });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'E-mail já cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    try {
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'E-mail ou senha incorretos' });
        }

        const userData = { id: user.id, email: user.email, name: user.name };
        const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, user: userData });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

app.get('/api/history', authenticateToken, (req, res) => {
    try {
        const history = db.prepare('SELECT * FROM analyses WHERE user_id = ? ORDER BY date DESC').all(req.user.id);
        const formattedHistory = history.map(item => ({
            ...JSON.parse(item.data_json),
            id: item.id,
            date: item.date,
            exerciseName: item.exercise_name,
            muscleGroup: item.muscle_group,
            nota: item.nota
        }));
        res.json(formattedHistory);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar histórico' });
    }
});

app.post('/api/analyze-video', authenticateToken, async (req, res) => {
    if (!OPENAI_API_KEY) {
        return res.status(400).json({
            error: 'API key não configurada. Crie um arquivo .env com OPENAI_API_KEY=sua_chave',
        });
    }

    const { frames, exerciseName, exerciseTips } = req.body;

    if (!frames || !frames.length || !exerciseName) {
        return res.status(400).json({ error: 'Frames do vídeo e nome do exercício são obrigatórios.' });
    }

    try {
        const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

        const tipsText = exerciseTips?.length
            ? exerciseTips.map((t, i) => `${i + 1}. ${t}`).join('\n')
            : 'Nenhuma dica específica fornecida.';

        const prompt = `Você é um personal trainer profissional e biomecânico esportivo com 20 anos de experiência. Analise estas imagens (frames extraídos de um vídeo) da execução do exercício "${exerciseName}".

SEJA EXTREMAMENTE CRÍTICO E DETALHISTA. Busque melhoria contínua. Mesmo que a execução esteja boa, encontre pontos para evoluir.

## Critérios de Execução Correta para "${exerciseName}":
${tipsText}

## Sua Análise Deve Incluir:

1. **NOTA (0-10)**: Avalie a qualidade da execução. Seja rigoroso:
   - 0-3: Execução perigosa, risco de lesão
   - 4-5: Execução com muitos erros, precisa de correção urgente
   - 6-7: Execução razoável, mas com pontos importantes para melhorar
   - 8-9: Boa execução, detalhes finos para otimizar
   - 10: Execução perfeita (praticamente impossível)

2. **PONTOS POSITIVOS**: O que o praticante fez bem (seja específico sobre o que observou nas imagens)

3. **PONTOS A MELHORAR**: Feedback crítico e específico sobre o que precisa ser corrigido

4. **DICAS PRÁTICAS**: Orientações concretas de como corrigir na próxima série

5. **RISCO DE LESÃO**: Se houver risco de lesão, alerte com urgência

## FORMATO DE RESPOSTA (JSON):
Responda APENAS com JSON válido, sem markdown, sem code blocks:
{
  "nota": <número de 0 a 10, pode ter decimal>,
  "resumo": "<frase resumindo a execução em 1-2 linhas>",
  "positivos": ["<ponto positivo 1>", "<ponto positivo 2>", ...],
  "melhorias": ["<ponto de melhoria 1>", "<ponto de melhoria 2>", ...],
  "dicas": ["<dica prática 1>", "<dica prática 2>", ...],
  "riscoLesao": "<null se não houver risco, ou string descrevendo o risco>"
}`;

        // Build message content with text + image frames
        const content = [
            { type: 'text', text: prompt },
            ...frames.map((frame, i) => ({
                type: 'image_url',
                image_url: {
                    url: `data:image/jpeg;base64,${frame}`,
                    detail: 'low',
                },
            })),
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content }],
            max_tokens: 1500,
        });

        const responseText = response.choices[0]?.message?.content || '';

        let analysis;
        try {
            const cleanJson = responseText
                .replace(/```json\n?/g, '')
                .replace(/```\n?/g, '')
                .trim();
            analysis = JSON.parse(cleanJson);
        } catch {
            console.error('Failed to parse AI response:', responseText);
            analysis = {
                nota: 5,
                resumo: 'Não foi possível analisar completamente o vídeo.',
                positivos: ['Vídeo recebido com sucesso'],
                melhorias: ['Tente enviar um vídeo com melhor iluminação e ângulo'],
                dicas: ['Posicione a câmera de lado para melhor visualização'],
                riscoLesao: null,
                rawResponse: responseText,
            };
        }

        // Save to database if connected
        try {
            const stmt = db.prepare(`
        INSERT INTO analyses (user_id, date, exercise_name, muscle_group, nota, thumbnail, data_json)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
            const date = new Date().toISOString();
            const muscleGroup = req.body.muscleGroup || 'Desconhecido';
            const thumbnail = req.body.frames && req.body.frames.length > 0 ? req.body.frames[0] : null;
            stmt.run(req.user.id, date, exerciseName, muscleGroup, analysis.nota, thumbnail, JSON.stringify(analysis));

            analysis.id = date; // fallback id for UI
            analysis.date = date;
        } catch (dbError) {
            console.error('Database save error:', dbError);
        }

        res.json(analysis);
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({
            error: `Erro ao analisar o vídeo: ${error.message}`,
        });
    }
});

app.delete('/api/history', authenticateToken, (req, res) => {
    try {
        db.prepare('DELETE FROM analyses WHERE user_id = ?').run(req.user.id);
        res.json({ message: 'Histórico removido' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao limpar histórico' });
    }
});

app.listen(PORT, () => {
    console.log(`🏋️ Workout Analysis API rodando em http://localhost:${PORT}`);
});
