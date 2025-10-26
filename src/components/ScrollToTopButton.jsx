import React, { useEffect, useState } from 'react';
import styles from './ScrollToTopButton.module.css';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button className={styles.scrollToTop} onClick={scrollToTop} aria-label="Voltar ao topo">
      ↑ Topo
    </button>
  );
}

export default ScrollToTopButton;
