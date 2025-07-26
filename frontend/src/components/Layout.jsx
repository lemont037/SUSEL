import Link from 'next/link';
import styles from '../styles/Layout.module.css'; // Estilo para o layout
import { Home, PlusSquare, User } from 'lucide-react';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import Router from 'next/router';

const handleLogOut = async () => {
        try {
            const response = await fetchWithAuth(
                `http://localhost:3001/auth/logout`,
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    `Erro ao fazer logout: ${errorData.message}`
                );
            }

            setTimeout(() => {
                Router.push("/");
            }, 3000);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

export default function Layout({ children }) {
    return (
        <div className={styles.appContainer}>
            <header className={styles.header}>
                <Link href="/admin" legacyBehavior>
                    <a className={styles.logo}>SUSEL</a>
                </Link>
                <div className={styles.userArea}>
                    <p onClick={handleLogOut}>SAIR</p>
                    <div className={styles.userProfile}>
                        <User size={24} />
                    </div>
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
