// src/components/AttachmentDisplayItem.jsx
import React from 'react';
import styles from '../styles/AttachmentDisplayItem.module.css'; // Importa o CSS Module

export default function AttachmentDisplayItem({ fileName, fileType, fileUrl, onDelete }) {
  // Você pode expandir esta função para retornar ícones baseados no tipo (ex: doc, xls)
  const getFileTypeLabel = () => {
    return fileType.toUpperCase();
  };

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.fileInfo}>
        <div className={styles.fileTypeBox}>
          <span>{getFileTypeLabel()}</span>
        </div>
        <span className={styles.fileName}>{fileName}</span>
      </div>
      
      <div className={styles.actions}>
        {/* Ícone de Download (Unicode) */}
        <button className={styles.actionButton} onClick={handleDownload}>
          &#x2193; {/* Seta para baixo */}
        </button>
        
        {/* Ícone de Lixeira (Unicode) - Ação de deletar */}
        {onDelete && (
          <button className={styles.actionButton} onClick={onDelete}>
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}