import Head from "next/head";
import { useState } from "react";
import Router from "next/router";
import Header from "../../../components/Header";
import SettingsSidebar from "../../../components/SettingSidebar";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import styles from "../../../styles/DeleteAccount.module.css";
import layoutStyles from "../../../styles/UserIndex.module.css";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import { getServerSideWithAuth } from "../../../utils/getServerSideWithAuth";

export async function getServerSideProps(context) {
    try {
        const { uid } = context.params;

        const response = await getServerSideWithAuth(context, `http://localhost:3001/u/${uid}/config`, {
            method: "GET",
        });

        if (response?.redirect?.destination) return response

        const user = await response.json();

        return {
            props: { user },
        };
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return {
            notFound: true,
        };
    }
}

export default function DeleteAccountPage({ user }) {
    const [password, setPassword] = useState("");
    const uid = user._id;
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleDelete = async () => {
        try {
            const response = await fetchWithAuth(
                `http://localhost:3001/u/${uid}/config/delete`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    `Erro ao excluir Usuário: ${errorData.message}`
                );
            }
            setNotification({ message: 'Sua conta foi excluída!', type: 'success' });
            
            // Redireciona para a página inicial após um delay
            setTimeout(() => {
                Router.push("/");
            }, 3000); // Atraso de 3 segundos
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            setNotification({ message: error.message, type: 'error' });
        }
    };

    return (
        <>
            <Head>
                <title>SUSEL - Excluir Conta</title>
            </Head>
            <div className={layoutStyles.layoutContainer}>
                <Header />
                <div className={layoutStyles.contentArea}>
                    <SettingsSidebar />

                    <main className={layoutStyles.mainContent}>
                        {notification.message && (
                            <div className={notification.type === 'success' ? layoutStyles.successBox : layoutStyles.errorBox}>
                                {notification.message}
                            </div>
                        )}
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.title}>
                                <span>Excluir</span> sua Conta
                            </h2>
                        </div>
                        <div className={styles.warningCard}>
                            <p>
                                Quando você opta por apagar sua conta, todos os
                                dados associados a ela serão completamente
                                removidos do banco de dados. Isso significa que
                                informações como dados pessoais, arquivos e
                                qualquer outro dado armazenado serão perdidos.
                                Além disso, qualquer processo ativo, como
                                assinaturas ou serviços em andamento, será
                                interrompido e não poderá ser recuperado após a
                                exclusão da conta.
                            </p>
                            <p>
                                Para garantir que você tenha plena certeza dessa
                                decisão e para proteger a segurança da sua
                                conta, pedimos que você insira sua senha antes
                                de proceder com a exclusão. Esse passo adicional
                                ajuda a evitar qualquer ação acidental e garante
                                que apenas o titular da conta tenha permissão
                                para realizar essa alteração.
                            </p>

                            <div className={styles.formSection}>
                                <InputField
                                    label="Confirme sua Senha"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className={styles.actionSection}>
                                <span className={styles.warningText}>
                                    ESSA AÇÃO NÃO É REVERSÍVEL
                                </span>
                                <Button variant="danger" onClick={handleDelete}>
                                    Excluir Conta
                                </Button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
