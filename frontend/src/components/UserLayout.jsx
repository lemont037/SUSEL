import Link from 'next/link';
import styles from './UserLayout.module.css';

export default function UserLayout({ children, activePage }) {
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <Link href="/"><h1>SUSEL</h1></Link>
        <div className={styles.userProfileIcon}></div>
      </header>
      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li><Link href="/user/info">Minhas Informações</Link></li>
              <li className={activePage === 'delete' ? styles.active : ''}>
                <Link href="/user/delete-account">Excluir Conta</Link>
              </li>
              <li><Link href="/logout">Sair da Conta</Link></li>
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}