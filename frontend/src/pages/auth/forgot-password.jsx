import Head from "next/head";
import { useState } from "react";
import Router from "next/router";
import styles from "../../styles/Login.module.css";
import customStyles from "../../styles/ForgotPassword.module.css";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Card from "../../components/Card";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(
                "http://localhost:3001/auth/forgot-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Erro ao enviar o email: Nenhum usuário com esse e-mail foi encontrado. Verifique se o email está correto."
                );
            }

            const data = await response.json();
            const user = data.user;

            Router.push(`/auth/${user._id}/new-password`);
        } catch (error) {
            console.error("Erro ao enviar o email:", error);
            setError(
                "Ocorreu um erro ao enviar o email. Tente novamente mais tarde."
            );
        }
    };

    return (
        <>
            <Head>
                <title>SUSEL - Redefinir Senha</title>
                <meta
                    name="description"
                    content="Página para redefinição de senha do SUSEL"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.loginPageContainer}>
                <div className={styles.formSide}>
                    <h2 className={styles.loginTitle}>Redefinir senha</h2>
                    <Card>
                        <p className={customStyles.instructions}>
                            Informe seu email cadastrado, para envio do código
                            de verificação.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <InputField
                                label="Email:"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type="submit" variant="primary">
                                Enviar
                            </Button>
                        </form>
                    </Card>
                </div>

                <div className={styles.infoSide}>
                    <h1>SUSEL</h1>
                    <p>Sistema Unificado de Seleções</p>
                    <p>Seu sistema de gerência para Processos Seletivos</p>
                </div>
            </main>
        </>
    );
}
