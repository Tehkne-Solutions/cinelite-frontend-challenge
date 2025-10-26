import { useState, useEffect } from 'react';

const useDarkMode = () => {
  // 1. Definição do estado e inicialização (lendo do localStorage)
  const [theme, setTheme] = useState(() => {
    // Tenta recuperar o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    // Retorna o tema salvo ou 'light' como padrão
    return savedTheme || 'light';
  });
  
  // 2. Função para alternar o tema e salvar no localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // 3. useEffect para atualizar a classe no <body>
  useEffect(() => {
    // Adiciona ou remove a classe 'dark-theme' do body
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);
  
  return [theme, toggleTheme];
};

export default useDarkMode;