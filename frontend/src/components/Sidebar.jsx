// src/components/Sidebar.jsx
import React from 'react';
import styles from '../styles/Sidebar.module.css'; 

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Minhas atividades</h2>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>Item de Atividade 1</li>
        <li className={styles.menuItem}>Item de Atividade 2</li>
        <li className={styles.menuItem}>Item de Atividade 3</li>
      </ul>
    </aside>
  );
}