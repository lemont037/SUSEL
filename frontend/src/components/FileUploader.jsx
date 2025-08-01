import React, { useRef, useState } from 'react';
import styles from '../styles/FileUploader.module.css';
import SectionCard from './SectionCard';
import UploadedFileListItem from './UploadedFileListItem';

// 1. O componente agora recebe 'files' e 'setFiles' como props do componente pai.
export default function FileUploader({ files, setFiles }) {
    // 2. A linha que gerenciava o estado dos arquivos foi REMOVIDA daqui.
    // O estado para o feedback visual (drag-and-drop) pode continuar aqui, pois é interno do componente.
    const [isDragOver, setIsDragOver] = useState(false); 
    const fileInputRef = useRef(null);

    // 3. As funções agora usam a prop 'setFiles' para atualizar o estado no PAI.
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleFileDelete = (fileNameToDelete) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileNameToDelete));
    };

    // O resto das funções e o JSX não precisam de NENHUMA alteração,
    // pois a variável 'files' agora vem das props com o mesmo nome.
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const uploadIcon = '&#x2B06;';

    return (
        <SectionCard title="Submissão de Arquivos">
            <div
                className={`${styles.dropZone} ${isDragOver ? styles.dragOver : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current.click()}
            >
                <span className={styles.uploadIcon} dangerouslySetInnerHTML={{ __html: uploadIcon }} />
                <p className={styles.uploadText}>
                    <strong onClick={(e) => { e.stopPropagation(); fileInput-ref.current.click(); }}>Procurar</strong>
                    ou arraste os arquivos até aqui
                </p>
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
                                key={index}
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