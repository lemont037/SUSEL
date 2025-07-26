import Head from "next/head";
import { useState, useEffect } from "react";
import Router from "next/router";
import styles from "../../../styles/Login.module.css";
import customStyles from "../../../styles/NewPassword.module.css";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import Card from "../../../components/Card";
import { getServerSideWithAuth } from "../../../utils/getServerSideWithAuth";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

/*export async function getServerSideProps(context) {
    try {
        const { uid } = context.params;

        const response = await getServerSideWithAuth(context, `http://localhost:3001/u/${uid}/config`, {
            method: "GET",
        });

        if (response?.redirect?.destination) return response

        return {
            props: {},
        };
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return {
            notFound: true,
        };
    }
}*/

export default function NewPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [validationState, setValidationState] = useState({
        minLength: false,
        hasNumber: false,
        hasSpecialChar: false,
        passwordsMatch: false,
    });

    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        const minLength = newPassword.length >= 6;
        const hasNumber = /\d/.test(newPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
        const passwordsMatch = newPassword && newPassword === confirmPassword;
        setValidationState({
            minLength,
            hasNumber,
            hasSpecialChar,
            passwordsMatch,
        });
    }, [newPassword, confirmPassword]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError("");

        const { minLength, hasNumber, hasSpecialChar, passwordsMatch } =
            validationState;

        if (!passwordsMatch) {
            setSubmitError("Erro ao redefinir: As senhas não coincidem");
            return;
        }

        if (!minLength || !hasNumber || !hasSpecialChar) {
            setSubmitError(
                "Erro ao redefinir: A senha não atende a todos os critérios"
            );
            return;
        }

        try {
            const response = await fetchWithAuth(
                `http://localhost:3001/auth/${Router.query.uid}/new-password`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ newPassword }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setSubmitError(
                    errorData.message ||
                        "Erro ao redefinir a senha. Tente novamente mais tarde."
                );
                return;
            }

            Router.push("/");
        } catch (error) {
            console.error("Erro ao redefinir a senha:", error);
            setSubmitError(
                "Ocorreu um erro ao redefinir a senha. Tente novamente mais tarde."
            );
        }
    };

    return (
        <>
            <Head>
                <title>SUSEL - Nova Senha</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.loginPageContainer}>
                <div className={styles.formSide}>
                    <h2 className={styles.loginTitle}>Redefinir senha</h2>
                    <Card>
                        {submitError && (
                            <div className={customStyles.errorBox}>
                                {submitError}
                            </div>
                        )}

                        <div className={customStyles.criteriaBox}>
                            <p className={customStyles.criteriaTitle}>
                                Critérios:
                            </p>
                            <ul>
                                <li
                                    className={
                                        validationState.minLength
                                            ? customStyles.valid
                                            : ""
                                    }
                                >
                                    Mínimo de 6 caracteres
                                </li>
                                <li
                                    className={
                                        validationState.hasNumber
                                            ? customStyles.valid
                                            : ""
                                    }
                                >
                                    Conter 1 número
                                </li>
                                <li
                                    className={
                                        validationState.hasSpecialChar
                                            ? customStyles.valid
                                            : ""
                                    }
                                >
                                    Conter 1 caractere especial
                                </li>
                            </ul>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <InputField
                                label="Nova Senha"
                                type="password"
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <InputField
                                label="Confirmar Senha"
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className={
                                    confirmPassword &&
                                    !validationState.passwordsMatch
                                        ? customStyles.mismatch
                                        : ""
                                }
                            />
                            <Button type="submit" variant="primary">
                                Confirmar
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
