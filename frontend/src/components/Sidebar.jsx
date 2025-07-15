// src/components/Sidebar.jsx
import React from 'react';
import styles from './Sidebar.module.css'; // Importa o CSS Module

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Minhas atividades</h2>
      <ul className={styles.menuList}>
        {/* Aqui viriam os links ou itens de menu da sidebar */}
        <li className={styles.menuItem}>Item de Atividade 1</li>
        <li className={styles.menuItem}>Item de Atividade 2</li>
        <li className={styles.menuItem}>Item de Atividade 3</li>
        {/* Você pode adicionar mais itens aqui */}
      </ul>
    </aside>
  );
}