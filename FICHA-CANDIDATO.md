# FICHA-CANDIDATO

**Candidato:** Enzo Xavier
**Data:** 23/02/2026

### Bônus implementados:
-  Deploy (Vercel)
-  Filtro por nome na Home
-  Context API — Time Pokémon (favoritar até 6)
-  Cache com localStorage

---
## Seção 1: Instruções para rodar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (vem junto com o Node.js)

### Instalação e execução
```bash
# entrar na pasta do projeto
cd ProductShowcase

# instalar as dependências
npm install

# rodar o projeto em modo desenvolvimento
npm run dev
```

O projeto vai rodar na porta **http://localhost:5173**

### Variáveis de ambiente
O projeto não utiliza nenhuma variável de ambiente. Toda a comunicação com dados externos é feita diretamente com a PokeAPI pública.

--- 

## Seção 2: Decisões de design

### Estrutura de pastas

Organizei o projeto seguindo a lógica de separação de responsabilidades. Cada pasta tem uma função clara:

```
src/
├── pages/         → Páginas da aplicação (Home, PokemonDetail)
├── services/      → Comunicação com a API (Axios)
├── types/         → Interfaces TypeScript para tipagem dos dados
├── contexts/      → Context API (gerenciamento de estado dos favoritos)
├── hooks/         → Hooks personalizados (useTeam)
├── routes/        → Configuração das rotas (React Router)
└── components/    → Componentes reutilizáveis (reservado para futuras extrações)
```

Essa estrutura deixa mais fácil a manutenção pois cada arquivo tem uma responsabilidade específica. Se preciso mexer em algo da API, sei que está em `services/`. Se é visual, está em `pages/` ou `components/`.

### Solução para as imagens

O endpoint de lista (`/pokemon?limit=151`) não retorna as imagens diretamente dos Pokémon, apenas o nome e uma URL de detalhes. Para resolver isso sem fazer 151 chamadas extras à API, extraí o ID do Pokémon da URL (Número final da URL) e montei a URL da imagem oficial diretamente, usando o padrão do repositório de sprites do PokeAPI no GitHub.

### Maior dificuldade

A maior dificuldade foi fazer o botão de favoritar funcionar de forma correta dentro dos cards da Home. Primeiramente usei o componente `<Link>` do React Router para envolver o card, mas ao clicar no botão de favorito, também era disparada a navegação. Resolvi trocando o `<Link>` por um `<div>` com `useNavigate()` e `stopPropagation()` no botão para separar as ações de favoritar e navegar.

### O que ficou faltando (e como faria com mais tempo)

- **Testes unitários e de integração**: Usaria Vitest + React Testing Library para testar os componentes e os serviços de API.
- **Atualização de cache**: Implementaria um botão de "atualizar lista" que limpa o cache do localStorage e refaz a chamada à API.
- **Página do Time**: Criaria uma página dedicada para exibir os 6 Pokémon favoritados com mais detalhes.

---

## Seção 3: Link para Deploy

[Acessar o projeto](https://product-showcase-nine-flax.vercel.app)

---

## Seção Final: Recomendações

- O desafio é bem estruturado e abrange os conceitos mais importantes do dia a dia de um dev front-end (consumo de API, roteamento, gerenciamento de estado, tipagem).
- O detalhe de o endpoint de lista não retornar imagens é um ponto muito bom de avaliação — força a pensar em soluções criativas.
- Sugeriria adicionar um prazo sugerido para cada etapa (essencial vs bônus) para ajudar a priorizar melhor o tempo.
