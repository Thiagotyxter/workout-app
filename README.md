# Workout App 💪

Uma aplicação interativa de treino semanal construída com React e Tailwind CSS.

## 🚀 Características

- ✨ Interface moderna com tema dark e efeitos glassmorphism
- 📅 Navegação por dias da semana
- 🏋️ 4 tipos de treino: Superior A/B e Inferior A/B
- ✅ Sistema de marcação de exercícios concluídos
- 📱 Design totalmente responsivo (mobile e desktop)
- 🎯 Animações suaves e transições elegantes
- 💪 Informações detalhadas de cada exercício

## 📋 Estrutura dos Treinos

### Segunda - Superior A
Puxada Alta, Remada Curvada, Supino Reto, Desenvolvimento, Elevação Lateral, Rosca Scott, Tríceps Francês

### Terça - Inferior A
Cadeira Abdutora, Cadeira Flexora, Agachamento Hack, Cadeira Extensora, Cadeira Adutora, Panturrilha

### Quarta - Descanso
Dia de recuperação e descanso

### Quinta - Superior B
Crucifixo Máquina, Supino Inclinado, Puxada Alta Supinada, Remada Articulada, Crucifixo Invertido, Elevação Lateral, Rosca Scott, Tríceps Pulley

### Sexta - Inferior B
Cadeira Abdutora, Leg 45, Cadeira Extensora, Mesa Flexora, Stiff, Cadeira Adutora, Panturrilha

### Sábado e Domingo - Descanso
Dias de recuperação e descanso

## 🛠️ Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **Google Fonts (Inter)** - Tipografia premium

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 🎨 Personalização

### Adicionar GIFs de Exercícios

Os GIFs dos exercícios estão definidos em `src/data/workouts.js`. Para adicionar GIFs reais:

1. Abra o arquivo `src/data/workouts.js`
2. Localize o exercício desejado
3. Substitua a URL do `gifUrl` pela URL do GIF real

Exemplo:
```javascript
{
  id: 1,
  name: 'Puxada Alta Pronada',
  gifUrl: 'https://sua-url-do-gif.com/puxada-alta.gif', // Substitua aqui
  // ...
}
```

### Fontes de GIFs Recomendadas

- **ExerciseDB API**: https://exercisedb.io/
- **Giphy**: https://giphy.com/
- **Imgur**: Para hospedar seus próprios GIFs
- **Cloudinary**: CDN para otimização de imagens

### Modificar Cores

As cores estão definidas em `tailwind.config.js`. Você pode personalizar:

```javascript
colors: {
  primary: { ... },  // Cor principal (azul)
  accent: { ... },   // Cor de destaque (roxo)
  dark: { ... },     // Tons de cinza escuro
}
```

## 📱 Responsividade

A aplicação é totalmente responsiva:

- **Mobile**: Layout de 1 coluna
- **Tablet**: Layout de 2 colunas
- **Desktop**: Layout de 3 colunas

## 🎯 Funcionalidades Futuras

- [ ] Timer entre séries
- [ ] Histórico de treinos
- [ ] Gráficos de progresso
- [ ] Notas personalizadas por exercício
- [ ] Modo de treino com cronômetro
- [ ] Exportar dados de treino

## 📄 Licença

Este projeto é livre para uso pessoal.

## 🤝 Contribuindo

Sinta-se à vontade para fazer fork e melhorar o projeto!

---

Desenvolvido com 💪 para seus treinos
