import React from 'react';
import styles from './Skeleton.module.css';

function Skeleton({ width = '100%', height = '20px', borderRadius = '4px', style = {} }) {
  return (
    <div
      className={styles.skeleton}
      style={{ width, height, borderRadius, ...style }}
      aria-busy="true"
      aria-label="Carregando..."
    />
  );
}

export default Skeleton;
