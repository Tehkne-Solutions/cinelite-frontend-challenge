# CineLite

CineLite é uma aplicação web para explorar e descobrir filmes, construída com React e integrada com a API do TMDB (The Movie Database).

## Funcionalidades

### Navegação e Visualização

### Busca e Filtros

### Detalhes do Filme


## Rotas Disponíveis

- `/` - Página inicial com filmes populares
- `/movie/:id` - Página de detalhes do filme
- `/search?q=termo` - Página de resultados de busca
- `/genre/:id` - Página de filmes por gênero

## Como Executar


1. Clone o repositório
```bash
npm install
```

3. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

4. Acesse `http://localhost:5173` no navegador

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços e integrações com API
  ├── hooks/         # Hooks personalizados
  ├── styles/        # Estilos globais e variáveis
  └── assets/        # Imagens e outros recursos
```

## Componentes Principais

### Páginas
- `HomePage`: Lista de filmes populares
- `DetailsPage`: Informações detalhadas do filme
- `SearchPage`: Resultados de busca
- `GenrePage`: Filmes filtrados por gênero

### Componentes
- `Header`: Navegação principal e busca
- `MovieCard`: Card de visualização do filme
- `MovieList`: Grid de filmes
- `SearchBar`: Input de busca com navegação

## Recursos da API

O projeto utiliza a API do TMDB para:
- Listar filmes populares
- Buscar filmes por título
- Filtrar por gênero
- Obter detalhes do filme
- Listar gêneros disponíveis

## Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Fase 15 — Correções e melhorias

Esta seção resume as alterações realizadas durante a Fase 15 do projeto:

- Atualizado o `HeroBanner` para usar uma imagem estática local em `src/assets/images/cinelite_hero_banner.jpg` com overlay escuro para melhorar legibilidade.
- Melhorias no `Logo` (suporte a variantes de tamanho e tema claro) para uso em banners.
- Removido aninhamento incorreto de links em `MovieRow`/`MovieCard` para evitar erros de hidratação no React.
- Implementado `ScrollToTopButton` (componente minimalista e discreto) integrado em `App.jsx`.
- Ajustes na `DetailsPage`: botão voltar minimalista posicionado no topo e melhorias de layout.
- Criada a pasta `src/assets/images` para receber o banner estático.

Observação: a imagem do banner deve estar disponível em `src/assets/images/cinelite_hero_banner.jpg` (ou com a extensão que você salvou). Se desejar alterar o nome do arquivo, atualize a importação em `src/components/HeroBanner/HeroBanner.jsx`.

Também foi adicionado um placeholder SVG em `public/placeholder-movie.svg` usado como fallback quando um poster não está disponível.
