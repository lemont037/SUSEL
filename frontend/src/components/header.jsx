import Link from 'next/link';
import styles from '../styles/Header.module.css';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Biblioteca para ler o conteúdo do token
import Cookies from 'js-cookie'; // Biblioteca para ler os cookies no cliente
import UserMenu from './UserMenu'; // Importa o novo componente

export default function Header() {
    const [user, setUser] = useState(null);

    // Este efeito roda no navegador e lê o token do cookie para obter os dados do utilizador
    useEffect(() => {
        const token = Cookies.get('token'); // 'token' é o nome do seu cookie de acesso
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken); // Guarda os dados do utilizador (uid, role, etc.) no estado
            } catch (error) {
                console.error("Token inválido:", error);
            }
        }
    }, []);

    return (
        <header className={styles.header}>
            <Link href={user ? (user.role === 'admin' ? '/admin' : `/u/${user.uid}`) : '/'}>
                <h1>SUSEL</h1>
            </Link>
            {/* Substitui o ícone estático pelo novo menu dinâmico */}
            <UserMenu user={user} />
        </header>
    );
}