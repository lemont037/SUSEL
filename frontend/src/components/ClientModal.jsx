import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MoreVertical } from 'lucide-react';
import styles from '../styles/ProcessDetails.module.css';

export default function ClientModal({ processId }) {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // TODO: Implementar a chamada real da API para deletar
  const handleDelete = async () => {
    console.log(`Deletando processo ${processId}`);
    alert('Processo deletado com sucesso! (simulação)');
    setModalOpen(false);
    router.push('/admin');
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Você tem certeza de que gostaria de excluir o processo?</h3>
            <div className={styles.modalActions}>
              <button onClick={() => setModalOpen(false)} className={`${styles.modalButton} ${styles.cancel}`}>Cancelar</button>
              <button onClick={handleDelete} className={`${styles.modalButton} ${styles.confirm}`}>Excluir</button>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        {}
        <button onClick={() => setMenuOpen(!isMenuOpen)} className={styles.kebabButton}>
          <MoreVertical size={20} />
        </button>
        
        {isMenuOpen && (
          <div className={styles.kebabMenu}>
            <Link href={`/admin/edit-process?id=${processId}`} legacyBehavior>
                <a onClick={() => setMenuOpen(false)} className={styles.kebabMenuItem}>
                    Editar
                </a>
            </Link>
            <button
              onClick={() => { setModalOpen(true); setMenuOpen(false); }}
              className={styles.kebabMenuItem}
            >
              Excluir
            </button>
          </div>
        )}
      </div>
    </>
  );
}
