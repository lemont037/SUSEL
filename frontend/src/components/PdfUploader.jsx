import React, { useRef, useState } from 'react';
import styles from '../styles/PdfUploader.module.css';

/**
 * Componente para upload de um único arquivo PDF com suporte a drag-and-drop.
 * @param {object} props
 * @param {File | null} props.file - O arquivo PDF atualmente selecionado.
 * @param {function(File | null): void} props.onFileSelect - Função para atualizar o arquivo selecionado no componente pai.
 */
export default function PdfUploader({ file, onFileSelect }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    // Lida com a seleção de arquivo através do clique
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            onFileSelect(selectedFile);
        } else if (selectedFile) {
            alert("Por favor, selecione apenas arquivos PDF.");
            event.target.value = null; // Limpa o input se o arquivo não for PDF
        }
    };
    
    // Lida com o arquivo solto na área de drop
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            onFileSelect(droppedFile);
        } else {
            alert("Por favor, selecione apenas arquivos PDF.");
        }
    };
    
    // Funções para feedback visual do drag-and-drop
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    // Se um arquivo já foi selecionado, exibe o nome e um botão para remover
    if (file) {
        return (
            <div className={styles.fileDisplay}>
                <span>{file.name}</span>
                <button type="button" onClick={() => onFileSelect(null)} className={styles.deleteButton}>&times;</button>
            </div>
        );
    }

    // Se nenhum arquivo foi selecionado, exibe a área de upload
    return (
        <div
            className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current.click()}
        >
            <p>Arraste um PDF ou clique para selecionar</p>
            <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                className={styles.fileInput}
                onChange={handleFileChange}
            />
        </div>
    );
}