// src/components/FileAttachmentLink.jsx
import React from 'react';
import styles from '../styles/FileAttachmentLink.module.css';
import Button from './Button';

export default function FileAttachmentLink({ 
    fileName, 
    fileUrl, 
    fileType = 'default', 
    onDownloadClick, 
    iconColor, 
    buttonBackgroundColor, 
    buttonTextColor, 
    children 
}) {
  const getFileIcon = () => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return '&#x1F4C4;'; // Ícone de PDF
      case 'image':
        return '&#x1F5BC;'; // Ícone de Imagem
      case 'doc':
      case 'docx':
        return '&#x1F4C4;'; // Ícone de Documento
      default:
        return '&#x1F4C4;'; // Ícone padrão de arquivo
    }
  };

  const handleDownload = () => {
    if (onDownloadClick) {
      onDownloadClick();
    } else if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div className={styles.container}>
      {/* Ícone do tipo de arquivo */}
      <span 
        className={styles.icon} 
        style={{ color: iconColor || 'var(--azul-primario)' }} // Usa iconColor ou a cor padrão
      />
      
      {/* Nome do arquivo */}
      <span className={styles.fileName}>{fileName}</span>

      {/* Botão de download */}
      {(fileUrl || onDownloadClick) && (
        <Button 
          onClick={handleDownload} 
          style={{ 
            backgroundColor: buttonBackgroundColor || 'var(--azul-primario)', // Usa a prop ou a cor padrão
            color: buttonTextColor || 'white', // Usa a prop ou a cor padrão
            padding: '6px 10px',
            fontSize: '12px',
            borderRadius: '5px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            flexShrink: 0,
          }}
        >
          Download <span dangerouslySetInnerHTML={{ __html: '&#x2193;' }} />
        </Button>
      )}

      {children}
    </div>
  );
}