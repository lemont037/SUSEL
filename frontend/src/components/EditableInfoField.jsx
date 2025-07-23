import React from 'react';
import styles from '../styles/EditableInfoField.module.css'; // Importa o CSS Module

export default function EditableInfoField({ label, value, onEditClick }) {
    return (
        <div className={styles.fieldContainer}>
            <label className={styles.label}>{label}</label>
            <div className={styles.contentWrapper}>
                <span className={styles.value}>{value}</span>
                {onEditClick && (
                    <span className={styles.editIcon} onClick={onEditClick}>
                        &#x270F;&#xFE0F; {/* Ícone de lápis Unicode (com variação de texto emoji) */}
                    </span>
                )}
            </div>
        </div>
    );
}