// src/components/ProcessInfoPanel.jsx
import React from 'react';
import styles from '../styles/ProcessInfoPanel.module.css'; // Importa o CSS Module
import Button from './Button'; // Reutiliza o componente Button

export default function ProcessInfoPanel({ processId, title, duration, currentPhase, onDetailsClick }) {
    return (
        <div className={styles.panelContainer}>
            <p className={styles.processId}>Processo {processId}</p>
            <p className={styles.detailItem}><strong>Título:</strong> {title}</p>
            <p className={styles.detailItem}><strong>Duração:</strong> {duration}</p>
            <p className={styles.detailItem}><strong>Fase atual:</strong> <span className={styles.highlightText}>{currentPhase}</span></p>

            <div className={styles.buttonContainer}>
                <Button
                    onClick={onDetailsClick}
                    style={{
                        backgroundColor: 'transparent',
                        border: '1px solid white',
                        color: 'white',
                        padding: '10px 15px',
                        fontSize: '14px',
                        borderRadius: '5px',
                        width: '100%',
                    }}
                >
                    Mais detalhes
                </Button>
            </div>
        </div>
    );
}