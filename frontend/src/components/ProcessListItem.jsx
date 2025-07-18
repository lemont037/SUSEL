import React from 'react';
import styles from '../styles/ProcessListItem.module.css';

export default function ProcessListItem({ href, code, title, description, endDate }) {

  return (
    <div
      className={styles.processItem}
      onClick={() => window.location.href = href}
    >
      <span className={styles.itemText}>{code}</span>
      <span className={styles.itemIcon}>&#x1F4C4;</span>
      <span className={styles.itemTitle}>{title}</span>
      <span className={styles.itemDescription}>{description}</span>
      <span className={styles.itemDate}>Finaliza em: {endDate}</span>
    </div>
  );
}