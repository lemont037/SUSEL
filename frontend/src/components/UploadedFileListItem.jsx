import React from 'react';
import styles from '../styles/UploadedFileListItem.module.css';

export default function UploadedFileListItem({ fileName, onDelete }) {
    // Ícone de documento Unicode para o arquivo
    const fileIcon = '&#x1F4C4;'; // Ícone de documento genérico

    return (
        <div className={styles.fileItem}>
            <div className={styles.fileInfo}>
                <span
                    className={styles.fileIcon}
                    dangerouslySetInnerHTML={{ __html: fileIcon }}
                />
                <span className={styles.fileName}>{fileName}</span>
            </div>

            {onDelete && (
                <button className={styles.deleteButton} onClick={onDelete}>
                    🗑️ {/* Ícone de lixeira Unicode */}
                </button>
            )}
        </div>
    );
}