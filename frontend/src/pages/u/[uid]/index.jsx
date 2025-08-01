import React from "react";
import Head from "next/head";
import { getServerSideWithAuth } from "../../../utils/getServerSideWithAuth";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import ProcessListItem from "../../../components/ProcessListItem";
import styles from "../../../styles/UserIndex.module.css";
import Link from "next/link";
import { format } from "date-fns";

export async function getServerSideProps(context) {
    try {
        const { uid } = context.params;
        const url = `http://localhost:3001/u/${uid}`;
        const authResult = await getServerSideWithAuth(context, url);

        if (authResult.redirect) {
            return authResult;
        }

        const { response, setCookieHeader } = authResult;

        if (setCookieHeader) {
            context.res.setHeader('Set-Cookie', setCookieHeader);
        }

        if (!response.ok) {
            throw new Error("Falha ao buscar os processos do usuário.");
        }

        const data = await response.json();

        return {
            props: {
                uid: uid,
                activeProcesses: data.activeProcesses || [],
                userProcesses: data.userProcesses || [],
            },
        };
    } catch (error) {
        console.error("Error fetching processes:", error);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        };
    }
}

export default function UserHome({ uid, activeProcesses, userProcesses }) {
    const getFinalEndDate = (phases) => {
        if (!phases || phases.length === 0) return 'N/A';
        const lastPhase = phases[phases.length - 1];
        return format(new Date(lastPhase.endDate), "dd/MM/yyyy");
    };
    
    // CORREÇÃO: Garante que 'uid' não seja indefinido ao renderizar
    if (!uid) {
        return <div>A carregar...</div>; // Ou um componente de loading
    }

    return (
        <>
            <Head>
                <title>SUSEL - Dashboard do Usuário</title>
            </Head>
            <div className={styles.layoutContainer}>
                <Header />
                <div className={styles.contentArea}>
                    <Sidebar userProcesses={userProcesses} uid={uid} />
                    <main className={styles.mainContent}>
                        <h1 className={styles.pageTitle}>Processos Ativos no Momento</h1>
                        <div className={styles.processList}>
                            {activeProcesses.length === 0 ? (
                                <p> Nenhum processo ativo no momento.</p>
                            ) : (
                                activeProcesses.map((process) => (
                                    <Link key={process._id} href={`/u/${uid}/process/${process._id}`} passHref legacyBehavior>
                                        <a>
                                            <ProcessListItem
                                                code={process.code}
                                                title={process.title}
                                                description={process.description}
                                                endDate={getFinalEndDate(process.phases)}
                                            />
                                        </a>
                                    </Link>
                                ))
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}