# CineLite

CineLite é uma aplicação web para explorar e descobrir filmes, construída com React e integrada com a API do TMDB (The Movie Database).

## 🚀 Links da Aplicação

- **Repositório GitHub**: [https://github.com/Tehkne-Solutions/cinelite-frontend-challenge.git](https://github.com/Tehkne-Solutions/cinelite-frontend-challenge.git)
- **Deploy Online**: [https://cinelite-frontend-challenge.vercel.app](https://cinelite-frontend-challenge.vercel.app)

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do **Desafio Dev Frontend Hit**, implementando uma aplicação completa de catálogo de filmes com as seguintes tecnologias:

- **React 18** com Hooks
- **React Router** para navegação
- **CSS Modules** para estilização
- **Vite** como bundler
- **API TMDB** para dados dos filmes
- **Vercel** para deploy automático

## ✨ Funcionalidades Implementadas

### 🏠 Página Inicial (Dashboard)
- Hero Banner com busca em tempo real
- Seções horizontais de filmes (Próximos Lançamentos, Mais Votados, Ação)
- Grid de filmes populares com paginação
- Modo escuro/claro

### 🔍 Sistema de Busca
- Busca em tempo real com debounce
- Dropdown de resultados instantâneos
- Página dedicada de resultados com paginação
- Navegação por URL com query parameters

### 🎬 Detalhes do Filme
- Informações completas do filme
- Poster, sinopse, avaliação, data de lançamento
- Botão de voltar integrado
- Layout responsivo

### 🎨 Interface e UX
- Design responsivo (mobile-first)
- Tema claro/escuro
- Animações suaves
- Loading states e skeleton screens
- Scroll to top automático

## 🛠️ Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/Tehkne-Solutions/cinelite-frontend-challenge.git
cd cinelite-frontend-challenge/cinelite-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto cinelite-app
# Adicione sua chave da API do TMDB:
VITE_TMDB_API_KEY=sua_chave_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

5. Acesse `http://localhost:5173` no navegador

## 🗂️ Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços e integrações com API
  ├── hooks/         # Hooks personalizados
  ├── styles/        # Estilos globais e variáveis
  └── assets/        # Imagens e outros recursos
```

## 📱 Responsividade

A aplicação foi desenvolvida com abordagem mobile-first:
- **Mobile**: Layout em 2 colunas, navegação otimizada
- **Tablet**: Layout em 4 colunas, elementos intermediários
- **Desktop**: Layout em 5 colunas, experiência completa

## 🎯 Requisitos Atendidos

✅ **Funcionalidades Obrigatórias**:
- [x] Listagem de filmes populares
- [x] Busca por filmes
- [x] Detalhes do filme
- [x] Design responsivo
- [x] Integração com API TMDB

✅ **Funcionalidades Extras Implementadas**:
- [x] Tema claro/escuro
- [x] Busca em tempo real
- [x] Paginação
- [x] Loading states
- [x] Seções categorizadas
- [x] Scroll to top
- [x] Tratamento de erros

## 🔧 Tecnologias Utilizadas

- **Frontend**: React 18, React Router DOM
- **Estilização**: CSS Modules, CSS Variables
- **Build**: Vite
- **Deploy**: Vercel
- **API**: TMDB (The Movie Database)
- **Controle de Versão**: Git/GitHub

## 🚀 Deploy e Integração Contínua

O projeto está configurado com deploy automático na Vercel:
- **URL de Produção**: [https://cinelite-frontend-challenge.vercel.app](https://cinelite-frontend-challenge.vercel.app)
- Deploy automático a cada push na branch `main`
- Variáveis de ambiente configuradas na Vercel
- Build otimizado para produção

## 📝 Histórico de Desenvolvimento

O projeto foi desenvolvido em fases incrementais:
- **Fase 1-5**: Setup inicial e componentes base
- **Fase 6-10**: Integração com API e funcionalidades core
- **Fase 11-15**: Melhorias de UX e correções
- **Fase 16-17**: Deploy e correções finais de usabilidade

---

**Nota**: Este projeto foi desenvolvido como parte de um desafio técnico, demonstrando habilidades em React, integração com APIs, design responsivo e deploy em produção.