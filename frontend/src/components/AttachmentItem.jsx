import styles from '../styles/AttachmentItem.module.css';

export default function AttachmentItem({ attachment, onDelete }) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.fileTypeBox}>
        <span>{attachment.type.toUpperCase()}</span>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{attachment.title}</p>
        <div className={styles.actions}>
          <button>📄</button> {/* Ícone de Visualizar */}
          <button>🔗</button> {/* Ícone de Copiar Link */}
        </div>
      </div>
      <button className={styles.deleteButton} onClick={onDelete}>
        🗑️
      </button>
    </div>
  );
}