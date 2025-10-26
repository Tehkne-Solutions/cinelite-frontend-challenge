import React, { useState, useEffect } from 'react';
import styles from './ScrollToTopButton.module.css';

/**
 * ScrollToTopButton - Botão flutuante de retorno ao topo
 * 
 * Componente que exibe um botão fixo no canto inferior direito
 * quando o usuário rola a página para baixo. Oferece uma forma
 * rápida e suave de retornar ao topo da página.
 * 
 * Características:
 * - Aparece após 300px de rolagem
 * - Animação suave no retorno
 * - Acessível via teclado e leitores de tela
 */
function ScrollToTopButton() {
    // Estado para controlar a visibilidade do botão
    const [isVisible, setIsVisible] = useState(false);

    /**
     * Monitora o evento de scroll da página para
     * controlar a visibilidade do botão
     */
    useEffect(() => {
        const toggleVisibility = () => {
            // Mostra o botão quando o scroll passar de 300px
            setIsVisible(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    /**
     * Realiza a rolagem suave até o topo da página
     * usando a API nativa de scroll do navegador
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            className={styles.scrollToTop}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            title="Voltar ao topo"
        >
            ▲
        </button>
    );
}

/**
 * Exporta o componente ScrollToTopButton
 * Utilizado globalmente no layout da aplicação
 */
export default ScrollToTopButton;