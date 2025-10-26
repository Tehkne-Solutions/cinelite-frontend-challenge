import React, { createContext, useContext } from 'react';
import useDarkMode from '../hooks/useDarkMode';

// Criar o contexto
const ThemeContext = createContext();

// Criar o Provider do tema
export function ThemeProvider({ children }) {
  const [theme, toggleTheme] = useDarkMode();

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar o tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}