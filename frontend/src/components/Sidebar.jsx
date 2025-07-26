import React from "react";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";

export default function Sidebar({ userProcesses, uid }) {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Minhas Inscrições</h2>
            <ul className={styles.sidebarList}>
                {userProcesses.length === 0 ? (
                    <li className={styles.sidebarWarning}>
                        Vocês não se inscreveu para nenhum processo ativo.
                    </li>
                ) : (
                    userProcesses.map((userProcesses) => (
                        <li key={userProcesses._id} className={styles.sidebarItem}>
                            <Link href={`/u/${uid}/process/${userProcesses._id}`}>
                                {userProcesses.code} - {userProcesses.title}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </aside>
    );
}
