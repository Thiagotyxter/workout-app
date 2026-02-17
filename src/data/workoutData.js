export const workoutPlan = {
  'Upper A': {
    name: 'Upper A',
    focus: 'Peito, Costas, Ombros e Braços',
    emoji: '💪',
    exercises: [
      {
        id: 'ua1',
        name: 'Puxada Alta Pronada',
        muscleGroup: 'Costas',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Foco em largura das costas e controle escapular. Siga as reps rigorosamente.',
        tips: [
          'Aquecimento: 1x 10-20 reps (carga leve)',
          'Feeders: 1-2x 1-5 reps (80-90% carga de trabalho)',
          'Puxe a barra em direção ao peito, não atrás da nuca',
          'Mantenha o peito estufado e os cotovelos apontando para baixo'
        ]
      },
      {
        id: 'ua2',
        name: 'Remada Curvada ou T-Bar',
        muscleGroup: 'Costas',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Foco em espessura das costas.',
        tips: [
          'Feeder: 1x 1-5 reps (80-90% carga de trabalho)',
          'Mantenha a coluna neutra e core ativado',
          'Puxe a barra em direção ao umbigo'
        ]
      },
      {
        id: 'ua3',
        name: 'Supino Reto Halteres',
        muscleGroup: 'Peito',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Peitoral maior com maior amplitude via halteres.',
        tips: [
          'Aquecimento: 1x 10-20 reps (carga leve)',
          'Feeders: 1-2x 1-5 reps (80-90% carga de trabalho)',
          'Desça os halteres até o nível do peito',
          'Cotovelos a ~45 graus'
        ]
      },
      {
        id: 'ua4',
        name: 'Desenvolvimento',
        muscleGroup: 'Ombros',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Foco em deltoide anterior.',
        tips: [
          'Feeder: 1x 1-5 reps',
          'Mantenha o core firme',
          'Controle a descida'
        ]
      },
      {
        id: 'ua5',
        name: 'Elevação Lateral',
        muscleGroup: 'Ombros',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Isolamento de deltoide lateral.',
        tips: [
          'Lidere com os cotovelos',
          'Não suba acima da linha dos ombros'
        ]
      },
      {
        id: 'ua6',
        name: 'Rosca Scott',
        muscleGroup: 'Bíceps',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Isolamento de bíceps.',
        tips: [
          'Extensão completa do cotovelo',
          'Não tire as axilas do apoio'
        ]
      },
      {
        id: 'ua7',
        name: 'Tríceps Francês',
        muscleGroup: 'Tríceps',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Enfase na cabeça longa.',
        tips: [
          'Cotovelos fechados',
          'Extensão total no topo'
        ]
      }
    ]
  },
  'Lower A': {
    name: 'Lower A',
    focus: 'Membros Inferiores',
    emoji: '🦵',
    exercises: [
      {
        id: 'la1',
        name: 'Cadeira Abdutora',
        muscleGroup: 'Glúteo/Quadril',
        structure: [
          { label: 'Trabalho', value: '2x 6-10' }
        ],
        description: 'Foco em glúteo médio.',
        tips: [
          'Aquecimento: 1x 10-20 reps',
          'Controle a volta do movimento'
        ]
      },
      {
        id: 'la2',
        name: 'Cadeira Flexora',
        muscleGroup: 'Posteriores',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Isolamento de posteriores.',
        tips: [
          'Quadril firme no banco',
          'Segure 1s na contração'
        ]
      },
      {
        id: 'la3',
        name: 'Agachamento Hack',
        muscleGroup: 'Quadríceps',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Agachamento pesado.',
        tips: [
          'Aquecimento: 1x 10-20 reps',
          'Feeders: 1-2x 1-5 reps',
          'Máxima profundidade controlada'
        ]
      },
      {
        id: 'la4',
        name: 'Cadeira Extensora',
        muscleGroup: 'Quadríceps',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Isolamento quadríceps.',
        tips: ['1s de pausa no topo']
      },
      {
        id: 'la5',
        name: 'Cadeira Adutora',
        muscleGroup: 'Adutores',
        structure: [
          { label: 'Trabalho', value: '2x 6-10' }
        ],
        description: 'Interna da coxa.',
        tips: ['Movimento controlado']
      },
      {
        id: 'la6',
        name: 'Panturrilha',
        muscleGroup: 'Panturrilha',
        structure: [
          { label: 'Trabalho', value: '2x 6-10' }
        ],
        description: 'Panturrilhas.',
        tips: ['Pausa no alongamento']
      }
    ]
  },
  'Upper B': {
    name: 'Upper B',
    focus: 'Peito, Costas, Ombros e Braços',
    emoji: '🔥',
    exercises: [
      {
        id: 'ub1',
        name: 'Crucifixo Máquina',
        muscleGroup: 'Peito',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Isolamento de peito.',
        tips: [
          'Aquecimento: 1x 10-20 reps',
          'Feeders: 1-2x 1-5 reps',
          'Cotovelos levemente flexionados'
        ]
      },
      {
        id: 'ub2',
        name: 'Supino Inclinado Halteres',
        muscleGroup: 'Peito',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Peito superior.',
        tips: [
          'Inclinação ~30-45 graus',
          'Alongamento no fundo'
        ]
      },
      {
        id: 'ub3',
        name: 'Puxada Alta Supinada',
        muscleGroup: 'Costas',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Foco em dorsal.',
        tips: [
          'Aquecimento: 1x 10-20 reps',
          'Pegada invertida'
        ]
      },
      {
        id: 'ub4',
        name: 'Remada Articulada Neutra',
        muscleGroup: 'Costas',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Dorsal médio.',
        tips: ['Puxe em direção ao quadril']
      },
      {
        id: 'ub5',
        name: 'Crucifixo Invertido',
        muscleGroup: 'Ombros',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Deltóide posterior.',
        tips: ['Braços quase retos']
      },
      {
        id: 'ub6',
        name: 'Elevação Lateral',
        muscleGroup: 'Ombros',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Deltoide lateral.',
        tips: ['Lidere com cotovelos']
      },
      {
        id: 'ub7',
        name: 'Rosca Scott',
        muscleGroup: 'Bíceps',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Bíceps.',
        tips: ['Extensão total']
      },
      {
        id: 'ub8',
        name: 'Tríceps Pulley',
        muscleGroup: 'Tríceps',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Tríceps cabo.',
        tips: ['Cotovelos colados']
      }
    ]
  },
  'Lower B': {
    name: 'Lower B',
    focus: 'Membros Inferiores',
    emoji: '🏋️‍♂️',
    exercises: [
      {
        id: 'lb1',
        name: 'Cadeira Abdutora',
        muscleGroup: 'Glúteo',
        structure: [
          { label: 'Trabalho', value: '2x 6-10' }
        ],
        description: 'Glúteos.',
        tips: ['Controle máximo']
      },
      {
        id: 'lb2',
        name: 'Leg 45',
        muscleGroup: 'Quadríceps/Glúteo',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Multi-articular pesado.',
        tips: [
          'Aquecimento: 1x 10-20 reps',
          'Feeders: 1-2x 1-5 reps',
          'Não trave os joelhos'
        ]
      },
      {
        id: 'lb3',
        name: 'Cadeira Extensora',
        muscleGroup: 'Quadríceps',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Isolamento.',
        tips: ['1s de isometria']
      },
      {
        id: 'lb4',
        name: 'Mesa Flexora',
        muscleGroup: 'Posteriores',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Posteriores deitado.',
        tips: ['Controle o retorno']
      },
      {
        id: 'lb5',
        name: 'Stiff',
        muscleGroup: 'Posteriores/Glúteo',
        structure: [
          { label: 'Top Set', value: '1x 5-9' },
          { label: 'Back-off', value: '1x 8-12' }
        ],
        description: 'Alongamento sob carga.',
        tips: ['Quadril para trás, coluna reta']
      },
      {
        id: 'lb6',
        name: 'Cadeira Adutora',
        muscleGroup: 'Adutores',
        structure: [
          { label: 'Trabalho', value: '2x 6-10' }
        ],
        description: 'Adutores.',
        tips: ['Controle no alongamento']
      },
      {
        id: 'lb7',
        name: 'Panturrilha',
        muscleGroup: 'Panturrilha',
        structure: [
          { label: 'Trabalho', value: '2x 6-10' }
        ],
        description: 'Panturrilhas.',
        tips: ['Pausas na base']
      }
    ]
  }
};

export const getAllDays = () => Object.keys(workoutPlan);
