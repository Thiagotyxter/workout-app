import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/analyze-video', async (req, res) => {
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

        res.json(analysis);
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({
            error: `Erro ao analisar o vídeo: ${error.message}`,
        });
    }
});

app.listen(PORT, () => {
    console.log(`🏋️ Workout Analysis API rodando em http://localhost:${PORT}`);
});
