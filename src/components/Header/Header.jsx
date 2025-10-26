import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import styles from './Header.module.css';

/**
 * Header - Componente de cabeçalho principal
 * 
 * Renderiza a barra superior fixa do aplicativo contendo:
 * - Botão do menu lateral (filtros e categorias)
 * - Logo/título do CineLite com link para home
 * - Alternador de tema claro/escuro
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onMenuToggle - Função para alternar visibilidade do menu lateral
 */
function Header({ onMenuToggle }) {
    // Hook do contexto de tema para controle do modo claro/escuro
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <header className={styles.headerContainer}>
            <button 
                className={styles.menuToggle}
                onClick={onMenuToggle}
                aria-label="Abrir Menu de Filtros e Categorias"
            >
                ☰
            </button>

            <Link to="/" className={styles.logo}>
                <h1 className={styles.appTitle}>CineLite</h1>
            </Link>

            <button 
                className={styles.themeToggle} 
                onClick={toggleTheme}
                aria-label={isDarkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>
        </header>
    );
}

/**
 * Exporta o componente Header como padrão
 * Utilizado no layout principal da aplicação
 */
export default Header;