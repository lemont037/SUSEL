import Head from "next/head";
import { useState } from "react";
import Router from "next/router";
import styles from "../styles/Login.module.css";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Card from "../components/Card";
import Link from "next/link";
import Image from "next/image"; 

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            const user = data.user;

            if (!user) {
                throw new Error("User not found");
            } else {
                if (user.role === "admin") {
                    Router.push("/admin");
                } else {
                    Router.push(`/u/${user._id}`);
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "An unexpected error occurred");
        }
    };

    return (
        <>
            <Head>
                <title>SUSEL - Login</title>
                <meta
                    name="description"
                    content="Sistema Unificado de Seleções"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.loginPageContainer}>
                <div className={styles.formSide}>
                    <h2 className={styles.loginTitle}>Login</h2>

                    <Card>
                        <form>
                            <InputField
                                label="Email"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputField
                                label="Senha"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className={styles.forgotPasswordLink}>
                                <Link href="/auth/forgot-password">
                                    Esqueceu sua senha?
                                </Link>
                            </div>
                            <Button type="submit" variant="primary" onClick={handleLogin}>
                                Entrar
                            </Button>
                        </form>
                        <p className={styles.registerPrompt}>
                            Não tem uma conta?{" "}
                            <a href="/auth/register">Cadastre-se</a>
                        </p>
                        <Link href="/auth/register">
                            <Button variant="secondary">Cadastre-se</Button>
                        </Link>
                    </Card>
                </div>

                <div className={styles.infoSide}>
                    <h1>SUSEL</h1>
                    <p>Sistema Unificado de Seleções</p>
                    <Image
                        src="/images/icon-login.png" // <-- Caminho da sua imagem
                        alt="Ilustração do Sistema SUSEL" // Texto para acessibilidade
                        width={400} 
                        height={300} 
                        style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '20px auto' }}
                    />
                    <p>Seu sistema de gerência para Processos Seletivos</p>
                </div>
            </main>
        </>
    );
}
