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
            gifUrl: 'https://static.wixstatic.com/media/2edbed_7bf01825bc314866bbcd5bdbf87588e6~mv2.webp/v1/fill/w_980,h_763,al_c,q_85,enc_avif,quality_auto/2edbed_7bf01825bc314866bbcd5bdbf87588e6~mv2.webp',
            muscle: 'Costas'
        },
        {
            id: 2,
            name: 'Remada Curvada',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Incline o tronco para frente, puxe a barra em direção ao abdômen mantendo as costas retas',
            gifUrl: 'https://treinomestre.com.br/wp-content/uploads/2015/03/remada-curvada-capa.jpg',
            muscle: 'Costas'
        },
        {
            id: 3,
            name: 'Supino Reto Halteres',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Deitado no banco reto, desça os halteres até a linha do peito e empurre para cima',
            gifUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_bjvLRw_mdSUopqr2NDNPPPyBjoM3Mb7U2w&s',
            muscle: 'Peito'
        },
        {
            id: 4,
            name: 'Desenvolvimento',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Sentado, empurre a barra ou halteres acima da cabeça mantendo o core estável',
            gifUrl: 'https://treinomestre.com.br/wp-content/uploads/2018/09/desenvolvimento-com-halteres-.jpg',
            muscle: 'Ombros'
        },
        {
            id: 5,
            name: 'Elevação Lateral',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'De pé, eleve os halteres lateralmente até a altura dos ombros com leve flexão dos cotovelos',
            gifUrl: 'https://i.pinimg.com/736x/2e/c9/e7/2ec9e7fcac8df4dcdba82bcefdf38e62.jpg',
            muscle: 'Ombros'
        },
        {
            id: 6,
            name: 'Rosca Scott',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'No banco Scott, flexione os cotovelos trazendo a barra em direção aos ombros',
            gifUrl: 'https://static1.minhavida.com.br/articles/a0/79/bd/2f/makatserchykshutterstock-orig-1.jpg',
            muscle: 'Bíceps'
        },
        {
            id: 7,
            name: 'Tríceps Francês',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Deitado ou sentado, desça o peso atrás da cabeça e estenda os cotovelos',
            gifUrl: 'https://image.tuasaude.com/media/article/ai/th/triceps-frances_75585.gif?width=686&height=487',
            muscle: 'Tríceps'
        },
    ],

    'Inferior A': [
        {
            id: 8,
            name: 'Cadeira Abdutora',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'Sentado na máquina, afaste as pernas contra a resistência',
            gifUrl: 'https://i.pinimg.com/736x/78/7f/64/787f64d9f9f6199e628219e4372c34a8.jpg',
            muscle: 'Glúteos'
        },
        {
            id: 9,
            name: 'Chuta Chuta Reverso',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Deitado de bruços, flexione os joelhos trazendo os calcanhares em direção aos glúteos',
            gifUrl: 'https://treinomestre.com.br/wp-content/uploads/2017/11/cadeira-flexora-e-a-mesa-flexora-diferencas.jpg',
            muscle: 'Posterior'
        },
        {
            id: 10,
            name: 'Agachamento Hack',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Na máquina hack, desça controladamente até 90° e empurre para cima',
            gifUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJsJ_OPJPBYF6Joqn2JeeJFouYo_gXd-19A&s',
            muscle: 'Quadríceps'
        },
        {
            id: 11,
            name: 'Chuta Chuta',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Sentado, estenda completamente os joelhos contra a resistência',
            gifUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsEOBQBeHcOyX6mlst8nIYaOG-VeR4ppNWnQ&s',
            muscle: 'Quadríceps'
        },
        {
            id: 12,
            name: 'Cadeira Adutora',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'Sentado na máquina, junte as pernas contra a resistência',
            gifUrl: 'https://treinomestre.com.br/wp-content/uploads/2017/04/cadeira-adutora.jpg',
            muscle: 'Adutores'
        },
        {
            id: 13,
            name: 'Panturrilha',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'De pé, eleve os calcanhares o máximo possível e desça controladamente',
            gifUrl: 'https://www.hipertrofia.org/blog/wp-content/uploads/2023/03/elevacao-de-panturrilhas-com-o-peso-do-corpo.gif',
            muscle: 'Panturrilha'
        },
    ],

    'Superior B': [
        {
            id: 14,
            name: 'Crucifixo Máquina',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Sentado na máquina, junte os braços à frente do peito',
            gifUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH9DS8_a4mMuOJgHLodxFcvxUlN1X4g_eMrw&s',
            muscle: 'Peito'
        },
        {
            id: 15,
            name: 'Supino Inclinado Halteres',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'No banco inclinado (30-45°), empurre os halteres para cima',
            gifUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsz0JmFi79GPveMqaSvfYhe5wa6U79Z8te9w&s',
            muscle: 'Peito Superior'
        },
        {
            id: 16,
            name: 'Puxada Alta Supinada',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Pegada supinada (palmas para você), puxar a barra até o peito',
            gifUrl: 'https://www.hipertrofia.org/blog/wp-content/uploads/2019/05/PUXADA-INVERTIDA.jpg',
            muscle: 'Costas'
        },
        {
            id: 17,
            name: 'Remada Articulada Neutra',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Na máquina articulada, puxe os cabos em direção ao abdômen com pegada neutra',
            gifUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZf1cDyQ9Hk-q2iEKN1_l-Ul0dOQNrZQYSDg&s',
            muscle: 'Costas'
        },
        {
            id: 18,
            name: 'Crucifixo Invertido',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Inclinado para frente, abra os braços lateralmente com halteres',
            gifUrl: 'https://treinomestre.com.br/wp-content/uploads/2018/09/crucifixo-invertido-maquina.jpg',
            muscle: 'Ombro Posterior'
        },
        {
            id: 19,
            name: 'Elevação Lateral',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'De pé, eleve os halteres lateralmente até a altura dos ombros',
            gifUrl: 'https://i.pinimg.com/736x/2e/c9/e7/2ec9e7fcac8df4dcdba82bcefdf38e62.jpg',
            muscle: 'Ombros'
        },
        {
            id: 20,
            name: 'Rosca Scott',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'No banco Scott, flexione os cotovelos trazendo a barra em direção aos ombros',
            gifUrl: 'https://static1.minhavida.com.br/articles/a0/79/bd/2f/makatserchykshutterstock-orig-1.jpg',
            muscle: 'Bíceps'
        },
        {
            id: 21,
            name: 'Tríceps Pulley',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'De frente para o pulley, empurre a barra para baixo estendendo completamente os cotovelos',
            gifUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9TCGoyKRGROIjMfY-JwWj4dqSrnM1EDRmgg&s',
            muscle: 'Tríceps'
        },
    ],

    'Inferior B': [
        {
            id: 22,
            name: 'Cadeira Abdutora',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'Sentado na máquina, afaste as pernas contra a resistência',
            gifUrl: 'https://i.pinimg.com/736x/78/7f/64/787f64d9f9f6199e628219e4372c34a8.jpg',
            muscle: 'Glúteos'
        },
        {
            id: 23,
            name: 'Leg 45',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Na máquina leg press 45°, empurre a plataforma com os pés na largura dos ombros',
            gifUrl: 'https://grandeatleta.com.br/blog/wp-content/uploads/2022/06/leg-press-45.jpg',
            muscle: 'Quadríceps'
        },
        {
            id: 24,
            name: 'Chuta Chuta',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Sentado, estenda completamente os joelhos contra a resistência',
            gifUrl: 'https://treinomestre.com.br/wp-content/uploads/2016/08/cadeira-extensora-cp.jpg',
            muscle: 'Quadríceps'
        },
        {
            id: 25,
            name: 'Mesa Flexora',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Deitado de bruços na mesa, flexione os joelhos trazendo os calcanhares aos glúteos',
            gifUrl: 'https://grandeatleta.com.br/wp-content/uploads/2018/07/mesa-flexora.jpg',
            muscle: 'Posterior'
        },
        {
            id: 26,
            name: 'Stiff',
            sets: [{ reps: '5-9', count: 1 }, { reps: '8-12', count: 1 }],
            description: 'Com pernas levemente flexionadas, desça a barra mantendo as costas retas',
            gifUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8oACE4smYz5psXC03yAMWbfAESetj9677Ww&s',
            muscle: 'Posterior'
        },
        {
            id: 27,
            name: 'Cadeira Adutora',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'Sentado na máquina, junte as pernas contra a resistência',
            gifUrl: 'https://treinomestre.com.br/wp-content/uploads/2017/04/cadeira-adutora.jpg',
            muscle: 'Adutores'
        },
        {
            id: 28,
            name: 'Panturrilha',
            sets: [{ reps: '6-10', count: 2 }],
            description: 'De pé, eleve os calcanhares o máximo possível e desça controladamente',
            gifUrl: 'https://www.hipertrofia.org/blog/wp-content/uploads/2023/03/elevacao-de-panturrilhas-com-o-peso-do-corpo.gif',
            muscle: 'Panturrilha'
        },
    ],
};

// Helper function to format sets display
export const formatSets = (sets) => {
    return sets.map(set => `${set.count}x ${set.reps}`).join(', ');
};
