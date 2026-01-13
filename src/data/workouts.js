// Workout data structure
export const DAYS = [
    { id: 0, name: 'Segunda', short: 'SEG', workout: 'Superior A' },
    { id: 1, name: 'Terça', short: 'TER', workout: 'Inferior A' },
    { id: 2, name: 'Quarta', short: 'QUA', workout: 'Descanso' },
    { id: 3, name: 'Quinta', short: 'QUI', workout: 'Superior B' },
    { id: 4, name: 'Sexta', short: 'SEX', workout: 'Inferior B' },
    { id: 5, name: 'Sábado', short: 'SÁB', workout: 'Descanso' },
    { id: 6, name: 'Domingo', short: 'DOM', workout: 'Descanso' },
];

export const WORKOUTS = {
    'Superior A': [
        {
            id: 1,
            name: 'Puxada Alta Pronada',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Pegada pronada (palmas para frente), puxar a barra até o peito mantendo o core ativado',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Costas'
        },
        {
            id: 2,
            name: 'Remada Curvada',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Incline o tronco para frente, puxe a barra em direção ao abdômen mantendo as costas retas',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Costas'
        },
        {
            id: 3,
            name: 'Supino Reto Halteres',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Deitado no banco reto, desça os halteres até a linha do peito e empurre para cima',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Peito'
        },
        {
            id: 4,
            name: 'Desenvolvimento',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Sentado, empurre a barra ou halteres acima da cabeça mantendo o core estável',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Ombros'
        },
        {
            id: 5,
            name: 'Elevação Lateral',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'De pé, eleve os halteres lateralmente até a altura dos ombros com leve flexão dos cotovelos',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Ombros'
        },
        {
            id: 6,
            name: 'Rosca Scott',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'No banco Scott, flexione os cotovelos trazendo a barra em direção aos ombros',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Bíceps'
        },
        {
            id: 7,
            name: 'Tríceps Francês',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Deitado ou sentado, desça o peso atrás da cabeça e estenda os cotovelos',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Tríceps'
        },
    ],

    'Inferior A': [
        {
            id: 8,
            name: 'Cadeira Abdutora',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'Sentado na máquina, afaste as pernas contra a resistência',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Glúteos'
        },
        {
            id: 9,
            name: 'Cadeira Flexora',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Deitado de bruços, flexione os joelhos trazendo os calcanhares em direção aos glúteos',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Posterior'
        },
        {
            id: 10,
            name: 'Agachamento Hack',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Na máquina hack, desça controladamente até 90° e empurre para cima',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Quadríceps'
        },
        {
            id: 11,
            name: 'Cadeira Extensora',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Sentado, estenda completamente os joelhos contra a resistência',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Quadríceps'
        },
        {
            id: 12,
            name: 'Cadeira Adutora',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'Sentado na máquina, junte as pernas contra a resistência',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Adutores'
        },
        {
            id: 13,
            name: 'Panturrilha',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'De pé, eleve os calcanhares o máximo possível e desça controladamente',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Panturrilha'
        },
    ],

    'Superior B': [
        {
            id: 14,
            name: 'Crucifixo Máquina',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Sentado na máquina, junte os braços à frente do peito',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Peito'
        },
        {
            id: 15,
            name: 'Supino Inclinado Halteres',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'No banco inclinado (30-45°), empurre os halteres para cima',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Peito Superior'
        },
        {
            id: 16,
            name: 'Puxada Alta Supinada',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Pegada supinada (palmas para você), puxar a barra até o peito',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Costas'
        },
        {
            id: 17,
            name: 'Remada Articulada Neutra',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Na máquina articulada, puxe os cabos em direção ao abdômen com pegada neutra',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Costas'
        },
        {
            id: 18,
            name: 'Crucifixo Invertido',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Inclinado para frente, abra os braços lateralmente com halteres',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Ombro Posterior'
        },
        {
            id: 19,
            name: 'Elevação Lateral',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'De pé, eleve os halteres lateralmente até a altura dos ombros',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Ombros'
        },
        {
            id: 20,
            name: 'Rosca Scott',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'No banco Scott, flexione os cotovelos trazendo a barra em direção aos ombros',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Bíceps'
        },
        {
            id: 21,
            name: 'Tríceps Pulley',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'De frente para o pulley, empurre a barra para baixo estendendo completamente os cotovelos',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Tríceps'
        },
    ],

    'Inferior B': [
        {
            id: 22,
            name: 'Cadeira Abdutora',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'Sentado na máquina, afaste as pernas contra a resistência',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Glúteos'
        },
        {
            id: 23,
            name: 'Leg 45',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Na máquina leg press 45°, empurre a plataforma com os pés na largura dos ombros',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Quadríceps'
        },
        {
            id: 24,
            name: 'Cadeira Extensora',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Sentado, estenda completamente os joelhos contra a resistência',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Quadríceps'
        },
        {
            id: 25,
            name: 'Mesa Flexora',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Deitado de bruços na mesa, flexione os joelhos trazendo os calcanhares aos glúteos',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Posterior'
        },
        {
            id: 26,
            name: 'Stiff',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Com pernas levemente flexionadas, desça a barra mantendo as costas retas',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Posterior'
        },
        {
            id: 27,
            name: 'Cadeira Adutora',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'Sentado na máquina, junte as pernas contra a resistência',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Adutores'
        },
        {
            id: 28,
            name: 'Panturrilha',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'De pé, eleve os calcanhares o máximo possível e desça controladamente',
            gifUrl: 'https://i.pinimg.com/originals/d4/5d/6c/d45d6c4b3a6c4c2e8e8e8e8e8e8e8e8e.gif',
            muscle: 'Panturrilha'
        },
    ],
};

// Helper function to format sets display
export const formatSets = (sets) => {
    return sets.map(set => `${set.count}x ${set.reps}`).join(', ');
};
