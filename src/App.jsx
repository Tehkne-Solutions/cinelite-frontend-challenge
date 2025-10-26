import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import SearchPage from './pages/SearchPage';
import GenrePage from './pages/GenrePage';
import ScrollToTopButton from './components/ScrollToTopButton';
import SideMenu from './components/SideMenu/SideMenu'; // Importar SideMenu
import { getGenres } from './services/api'; // Importar getGenres

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(0); // Adicionar estado para gênero selecionado

  // Carrega os gêneros uma vez ao montar o componente
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const list = await getGenres();
        setGenres(list);
      } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
        setGenres([]);
      }
    };
    loadGenres();
  }, []);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    // Fechar o menu lateral ao selecionar um gênero
    setIsMenuOpen(false); 
    // TODO: Adicionar navegação para a página de gênero ou recarregar filmes na HomePage
  };

  return (
    <div className="app">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        genres={genres}
        onGenreChange={handleGenreChange}
        selectedGenre={selectedGenre}
      />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<HomePage selectedGenre={selectedGenre} />}
          />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/genre/:id" element={<GenrePage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
