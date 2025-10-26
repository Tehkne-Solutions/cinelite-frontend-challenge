import React from 'react';
import styles from './Logo.module.css';

function Logo({ size = 'default', className = '', light = false }) {
  const sizeClass = styles[size] || styles.default;
  const themeClass = light ? styles.light : '';
  const combinedClasses = `${styles.logo} ${sizeClass} ${themeClass} ${className}`.trim();

  return (
    <span className={combinedClasses}>
      <span className={styles.brand}>Cine</span>
      <span className={styles.lite}>Lite</span>
    </span>
  );
}

export default Logo;
