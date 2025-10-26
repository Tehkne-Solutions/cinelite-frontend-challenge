import styles from './Pagination.module.css';

/**
 * Pagination - Componente de navegação entre páginas
 * 
 * Renderiza uma barra de paginação com:
 * - Botões "Anterior" e "Próximo"
 * - Números de página com destaque para página atual
 * - Lógica de limite de páginas visíveis (máx. 5)
 * - Controles acessíveis e semânticos
 * 
 * @param {Object} props - Propriedades do componente
 * @param {number} props.currentPage - Número da página atual
 * @param {number} props.totalPages - Número total de páginas
 * @param {Function} props.onPageChange - Função chamada ao mudar de página
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
    /**
     * Número máximo de páginas visíveis na navegação
     * Mantém a interface limpa e usável
     */
    const MAX_PAGES_VISIBLE = 5;
    
    // Variáveis para cálculo do intervalo de páginas
    let startPage, endPage;

    // Calcula o intervalo de páginas a ser exibido
    if (totalPages <= MAX_PAGES_VISIBLE) {
        startPage = 1;
        endPage = totalPages;
    } else {
        startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_VISIBLE / 2));
        endPage = Math.min(totalPages, currentPage + Math.floor(MAX_PAGES_VISIBLE / 2));
        
        if (endPage - startPage < MAX_PAGES_VISIBLE - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, MAX_PAGES_VISIBLE);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, totalPages - MAX_PAGES_VISIBLE + 1);
            }
        }
    }

    const pages = [...Array(endPage + 1).keys()].slice(startPage);

    if (totalPages === 1 || totalPages === 0) return null;

    return (
        <nav className={styles.paginationContainer} aria-label="Navegação de Página">
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.pageButton}
            >
                Anterior
            </button>
            
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.pageButton}
            >
                Próximo
            </button>
        </nav>
    );
}

/**
 * Exporta o componente Pagination
 * Utilizado nas páginas de listagem e busca de filmes
 */
export default Pagination;