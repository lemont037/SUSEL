import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Settings, LogOut } from 'lucide-react';
import styles from '../styles/UserMenu.module.css';
import { fetchWithAuth } from '../utils/fetchWithAuth';

// O componente recebe o objeto 'user' que contém o 'uid' e a 'role'
export default function UserMenu({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const menuRef = useRef(null);

    // Lógica para fechar o menu ao clicar fora dele
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    const handleLogout = async () => {
        try {
            await fetchWithAuth('http://localhost:3001/auth/logout', { method: 'POST' });
            // Redireciona para a página de login após o logout
            router.push('/');
        } catch (error) {
            console.error("Falha ao fazer logout:", error);
        }
    };

    // Se não houver dados do utilizador, não mostra nada
    if (!user) return null;

    return (
        <div className={styles.menuContainer} ref={menuRef}>
            {/* O avatar que abre o menu */}
            <div className={styles.avatar} onClick={() => setIsOpen(!isOpen)}>
                {/* Pode-se adicionar uma imagem do utilizador aqui no futuro */}
            </div>

            {/* O menu dropdown */}
            {isOpen && (
                <div className={styles.dropdown}>
                    <ul>
                        {/* A opção de Configurações só aparece para a role 'user' */}
                        {user.role === 'user' && (
                            <li>
                                <Link href={`/u/${user.uid}/config`} passHref legacyBehavior>
                                    <a><Settings size={16} /> Configurações</a>
                                </Link>
                            </li>
                        )}
                        {/* A opção de Sair aparece para todos */}
                        <li>
                            <a onClick={handleLogout}><LogOut size={16} /> Sair</a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}