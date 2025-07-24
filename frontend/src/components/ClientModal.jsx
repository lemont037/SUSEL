import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import styles from "../styles/AdminProcessDetails.module.css";

export async function getServerSideProps(context) {
    try {
        const response = await fetch("http://localhost:3001/admin", {
            method: "GET",
            headers: {
                Cookie: context.req.headers.cookie || "",
            },
        });

        if (response.status === 401 || response.status === 403) {
            return {
                redirect: {
                    destination: "/unauthorized",
                    permanent: false,
                },
            };
        }

        return {
            props: {},
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            props: { error },
        };
    }
}

export default function ClientModal({ processId }) {
    const router = useRouter();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleDelete = async () => {
        console.log("Deleting process with ID:", processId);

        try {
            const response = await fetch(
                `http://localhost:3001/admin/process/${processId}/delete`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (response.ok) {
                console.log("Processo excluído com sucesso");
                router.push("/admin");
            } else {
                console.error("Erro ao excluir o processo");
            }
        } catch (error) {
            console.error("Erro ao excluir o processo:", error);
        } finally {
            setModalOpen(false);
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>
                            Você tem certeza de que gostaria de excluir o
                            processo?
                        </h3>
                        <div className={styles.modalActions}>
                            <button
                                onClick={() => setModalOpen(false)}
                                className={`${styles.modalButton} ${styles.cancel}`}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className={`${styles.modalButton} ${styles.confirm}`}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative">
                {}
                <button
                    onClick={() => setMenuOpen(!isMenuOpen)}
                    className={styles.kebabButton}
                >
                    <MoreVertical size={20} />
                </button>

                {isMenuOpen && (
                    <div className={styles.kebabMenu}>
                        <Link
                            href={`/admin/edit-process?id=${processId}`}
                            legacyBehavior
                        >
                            <a
                                onClick={() => setMenuOpen(false)}
                                className={styles.kebabMenuItem}
                            >
                                Editar
                            </a>
                        </Link>
                        <button
                            onClick={() => {
                                setModalOpen(true);
                                setMenuOpen(false);
                            }}
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
