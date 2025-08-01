import React from "react";
import Link from "next/link";
import styles from "../styles/Sidebar.module.css";

// Objeto para mapear o status para um texto e uma classe de estilo
const statusMap = {
    submetido: { text: "Em Análise", className: styles.statusSubmitted },
    deferido: { text: "Deferido", className: styles.statusApproved },
    indeferido: { text: "Indeferido", className: styles.statusRejected },
};

export default function Sidebar({ userSubmissions, uid }) {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Minhas Inscrições</h2>
            <ul className={styles.sidebarList}>
                {userSubmissions.length === 0 ? (
                    <li className={styles.sidebarWarning}>
                        Você não se inscreveu para nenhum processo.
                    </li>
                ) : (
                    // Agora fazemos o map na lista de submissões
                    userSubmissions.map((submission) => {
                        // Se por algum motivo o processo associado não for populado, não quebra a página
                        if (!submission.process) return null;

                        const statusInfo = statusMap[submission.status] || { text: "Desconhecido", className: "" };

                        return (
                            <li key={submission._id} className={styles.sidebarItem}>
                                <Link href={`/u/${uid}/process/${submission.process._id}`} passHref legacyBehavior>
                                    <a>
                                        <span className={styles.processTitle}>{submission.process.title}</span>
                                        <span className={`${styles.statusBadge} ${statusInfo.className}`}>
                                            {statusInfo.text}
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        );
                    })
                )}
            </ul>
        </aside>
    );
}