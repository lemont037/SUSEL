// src/components/PhaseItem.jsx
import React from 'react';
import styles from '../styles/PhaseItem.module.css'; // Importa o CSS Module

export default function PhaseItem({ phaseNumber, title, description, endDate }) {
  return (
    <div className={styles.phaseItemContainer}>
      <h3 className={styles.phaseTitle}>Fase {phaseNumber}</h3>
      
      <p className={styles.azuli}>Título</p>
      <p className={styles.content}>Lore Ipsum</p>
      
      <p className={styles.azuli}>Descrição da Fase</p>
      <p className={styles.content}>{description}</p>
      
      <p className={styles.azuli}>Termina em:</p>
      <p className={styles.endDate}>{endDate}</p>
    </div>
  );
}