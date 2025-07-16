import React from 'react';
import styles from '../styles/SectionCard.module.css';
export default function SectionCard({ title, children }) {
  return (
    <div className={styles.card}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children} 
    </div>
  );
}