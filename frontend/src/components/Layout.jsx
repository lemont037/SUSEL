import Link from 'next/link';
import styles from '../styles/Layout.module.css'; // Estilo para o layout
import { Home, PlusSquare, User } from 'lucide-react';

// Este componente recebe as páginas filhas através da prop 'children'
export default function Layout({ children }) {
    return (
        <div className={styles.appContainer}>
            <header className={styles.header}>
                <Link href="/admin" legacyBehavior>
                    <a className={styles.logo}>SUSEL</a>
                </Link>
                <div className={styles.userProfile}>
                    <User size={24} />
                </div>
            </header>
            <div className={styles.mainWrapper}>
                <aside className={styles.sidebar}>
                    <nav>
                        <ul>
                            <li>
                                <Link href="/admin" legacyBehavior>
                                    <a><Home size={20} /> Início</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/create-new-process" legacyBehavior>
                                    <a><PlusSquare size={20} /> Criar Novo Processo</a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}
