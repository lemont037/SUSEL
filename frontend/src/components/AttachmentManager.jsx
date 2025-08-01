import React, { useRef } from 'react';
import styles from '../styles/AttachmentManager.module.css';
import AttachmentItem from './AttachmentItem'; // Reutiliza o componente que você já tem

/**
 * Componente para gerenciar uma lista de múltiplos anexos em PDF.
 * @param {object} props
 * @param {File[]} props.attachments - A lista de arquivos anexados.
 * @param {function(File[]): void} props.onAttachmentsChange - Função para atualizar a lista de anexos no componente pai.
 */
export default function AttachmentManager({ attachments, onAttachmentsChange }) {
    const fileInputRef = useRef(null);

    // Lida com a adição de novos arquivos
    const handleFileAdd = (event) => {
        const newFiles = Array.from(event.target.files);
        const pdfFiles = newFiles.filter(file => file.type === "application/pdf");
        
        // Previne duplicatas
        const uniqueNewFiles = pdfFiles.filter(newFile => 
            !attachments.some(existingFile => existingFile.name === newFile.name)
        );

        if (pdfFiles.length !== newFiles.length) {
            alert("Alguns arquivos não eram PDF e foram ignorados.");
        }

        onAttachmentsChange([...attachments, ...uniqueNewFiles]);
        event.target.value = null; // Limpa o input para permitir selecionar o mesmo arquivo novamente
    };

    // Lida com a remoção de um arquivo da lista
    const handleFileDelete = (fileNameToDelete) => {
        onAttachmentsChange(attachments.filter(file => file.name !== fileNameToDelete));
    };

    return (
        <div className={styles.managerContainer}>
            {attachments.length > 0 && (
                <div className={styles.attachmentsList}>
                    {attachments.map((file, index) => (
                        <AttachmentItem
                            key={index}
                            attachment={{ title: file.name, type: 'pdf' }}
                            onDelete={() => handleFileDelete(file.name)}
                        />
                    ))}
                </div>
            )}
            <button
                type="button"
                className={styles.addButton}
                onClick={() => fileInputRef.current.click()}
            >
                + Adicionar Modelo de Declaração
            </button>
            <input
                type="file"
                accept="application/pdf"
                multiple
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileAdd}
            />
        </div>
    );
}