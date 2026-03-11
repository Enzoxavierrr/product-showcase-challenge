# FICHA-CANDIDATO

**Candidato:** Enzo Xavier  
**Data:** 23/02/2026

### Bônus implementados:
- Deploy (Vercel)
- Filtro por nome na Home
- Context API - Time Pokemon (favoritar ate 6)
- Cache com localStorage

---
## Secao 1: Instrucoes para rodar

### Pre-requisitos
- Node.js (versao 18 ou superior)
- npm (vem junto com o Node.js)

### Instalacao e execucao
```bash
# entrar na pasta do projeto
cd ProductShowcase

# instalar as dependencias
npm install

# rodar o projeto em modo desenvolvimento
npm run dev
```

O projeto vai rodar na porta **http://localhost:5173**

### Variaveis de ambiente
O projeto nao utiliza nenhuma variavel de ambiente. Toda a comunicacao com dados externos e feita diretamente com a PokeAPI publica.

---

## Secao 2: Decisoes de design

### Estrutura de pastas

Organizei o projeto seguindo a logica de separacao de responsabilidades. Cada pasta tem uma funcao clara:

```text
src/
|- pages/         -> Paginas da aplicacao (Home, PokemonDetail)
|- services/      -> Comunicacao com a API (Axios)
|- types/         -> Interfaces TypeScript para tipagem dos dados
|- contexts/      -> Context API (gerenciamento de estado dos favoritos)
|- hooks/         -> Hooks personalizados (useTeam)
|- routes/        -> Configuracao das rotas (React Router)
'- components/    -> Componentes reutilizaveis (reservado para futuras extracoes)
```

Essa estrutura deixa mais facil a manutencao pois cada arquivo tem uma responsabilidade especifica. Se preciso mexer em algo da API, sei que esta em `services/`. Se e visual, esta em `pages/` ou `components/`.

### Solucao para as imagens

O endpoint de lista (`/pokemon?limit=151`) nao retorna as imagens diretamente dos Pokemon, apenas o nome e uma URL de detalhes. Para resolver isso sem fazer 151 chamadas extras a API, extrai o ID do Pokemon da URL (numero final da URL) e montei a URL da imagem oficial diretamente, usando o padrao do repositorio de sprites da PokeAPI no GitHub.

### Maior dificuldade

A maior dificuldade foi fazer o botao de favoritar funcionar de forma correta dentro dos cards da Home. Primeiramente usei o componente `<Link>` do React Router para envolver o card, mas ao clicar no botao de favorito, tambem era disparada a navegacao. Resolvi trocando o `<Link>` por um `<div>` com `useNavigate()` e `stopPropagation()` no botao para separar as acoes de favoritar e navegar.

### O que ficou faltando (e como faria com mais tempo)

- **Testes unitarios e de integracao**: Usaria Vitest + React Testing Library para testar os componentes e os servicos de API.
- **Atualizacao de cache**: Implementaria um botao de "atualizar lista" que limpa o cache do localStorage e refaz a chamada a API.
- **Pagina do Time**: Criaria uma pagina dedicada para exibir os 6 Pokemon favoritados com mais detalhes.

---

## Secao 3: Link para Deploy

[Acessar o projeto](https://product-showcase-nine-flax.vercel.app)

---

## Secao Final: Recomendacoes

- O desafio e bem estruturado e abrange os conceitos mais importantes do dia a dia de um dev front-end (consumo de API, roteamento, gerenciamento de estado, tipagem).
- O detalhe de o endpoint de lista nao retornar imagens e um ponto muito bom de avaliacao, pois forca a pensar em solucoes criativas.
- Sugeriria adicionar um prazo sugerido para cada etapa (essencial vs bonus) para ajudar a priorizar melhor o tempo.
