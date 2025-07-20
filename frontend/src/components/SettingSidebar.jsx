import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/SettingSidebar.module.css'; // Ajuste o caminho conforme necessário

export default function SettingsSidebar() {
  const router = useRouter();

  // Placeholder para o ID do usuário. O ideal seria pegar isso de um contexto de autenticação.
  const uid = router.query.uid || '123';

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          {/* Adicione a classe 'active' se a rota corresponder */}
          <li className={router.pathname.endsWith('/info') ? styles.active : ''}>
            <Link href={`/u/${uid}/info`}>Minhas Informações</Link>
          </li>
          <li className={router.pathname.endsWith('/delete-account') ? styles.active : ''}>
            <Link href={`/u/${uid}/delete-account`}>Excluir Conta</Link>
          </li>
          <li>
            <Link href="/logout">Sair da Conta</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}