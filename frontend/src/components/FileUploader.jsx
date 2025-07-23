// src/components/FileUploader.jsx
import React, { useRef, useState } from 'react';
import styles from '../styles/FileUploader.module.css';
import SectionCard from './SectionCard'; // Reutiliza SectionCard como container principal
import UploadedFileListItem from './UploadedFileListItem'; // Reutiliza o item da lista de arquivos

export default function FileUploader() {
    const [files, setFiles] = useState([]); // Estado para armazenar os arquivos carregados
    const [isDragOver, setIsDragOver] = useState(false); // Estado para o feedback visual de drag
    const fileInputRef = useRef(null); // Ref para o input de arquivo escondido

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleDrop = (event) => {
        event.preventDefault(); // Impede o comportamento padrão de abrir o arquivo no navegador
        setIsDragOver(false);
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Necessário para que o evento 'drop' funcione
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleFileDelete = (fileNameToDelete) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileNameToDelete));
    };

    // Ícone de upload Unicode
    const uploadIcon = '&#x2B06;'; // Seta para cima (upload)

    return (
        <SectionCard title="Submissão de Arquivos"> {/* SectionCard como container da seção */}
            <div
                className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver} // Garante que o isDragOver seja true ao entrar na área
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current.click()} // Clicar na zona abre o seletor de arquivos
            >
                <span className={styles.uploadIcon} dangerouslySetInnerHTML={{ __html: uploadIcon }} />
                <p className={styles.uploadText}>
                    <strong onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}>Procurar</strong>
                    ou arraste os arquivos até aqui
                </p>
                {/* Input de arquivo escondido */}
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className={styles.fileInput}
                    onChange={handleFileChange}
                />
            </div>

            {files.length > 0 && (
                <>
                    <h3 className={styles.uploadedFilesTitle}>Arquivos Carregados</h3>
                    <div className={styles.filesList}>
                        {files.map((file, index) => (
                            <UploadedFileListItem
                                key={index} // Ou file.name, se for garantido que é único
                                fileName={file.name}
                                onDelete={() => handleFileDelete(file.name)}
                            />
                        ))}
                    </div>
                </>
            )}
        </SectionCard>
    );
}