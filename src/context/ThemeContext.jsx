import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Criação do Contexto
const ThemeContext = createContext();

// 2. Custom Hook para facilitar o uso do contexto
export const useTheme = () => {
    return useContext(ThemeContext);
};

// 3. Provedor do Contexto
export const ThemeProvider = ({ children }) => {
    // Inicializa o estado lendo a preferência do sistema ou o último estado salvo
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Verifica a preferência do usuário salva no localStorage
        const savedMode = localStorage.getItem('isDarkMode');
        if (savedMode !== null) {
            return JSON.parse(savedMode);
        }
        // Se não houver, verifica a preferência do sistema operacional
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Função para alternar o modo
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    // Efeito para aplicar os estilos e salvar no localStorage
    useEffect(() => {
        // Aplica a classe 'dark-mode' ou 'light-mode' ao body
        document.body.classList.remove('light-mode', 'dark-mode');
        const themeClass = isDarkMode ? 'dark-mode' : 'light-mode';
        document.body.classList.add(themeClass);
        
        // Salva a preferência do usuário
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const value = {
        isDarkMode,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};