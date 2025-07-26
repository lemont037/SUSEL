import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import styles from "../styles/SettingSidebar.module.css";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function SettingsSidebar({ uid }) {
    const [notification, setNotification] = useState({ message: '', type: '' });
    const router = useRouter()

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

            setNotification({
                message: "Você saiu da sua conta",
                type: "success",
            });

            setTimeout(() => {
                Router.push("/");
            }, 3000);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            setNotification({ message: error.message, type: "error" });
        }
    };

    return (
        <aside className={styles.sidebar}>
            <nav>
                <ul>
                    <li
                        className={
                            router.pathname.endsWith("/config")
                                ? styles.active
                                : ""
                        }
                    >
                        <Link href={`/u/${uid}/config`}>
                            Minhas Informações
                        </Link>
                    </li>
                    <li
                        className={
                            router.pathname.endsWith("/delete-account")
                                ? styles.active
                                : ""
                        }
                    >
                        <Link href={`/u/${uid}/delete-account`}>
                            Excluir Conta
                        </Link>
                    </li>
                    <li>
                        <button onClick={handleLogOut} className={styles.button}>Sair da Conta</button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
