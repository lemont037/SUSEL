import React from "react";
import Head from "next/head";

import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import ProcessListItem from "../../../components/ProcessListItem";
import styles from "../../../styles/UserIndex.module.css";

export async function getServerSideProps(context) {
    try {
        const { uid } = context.params;

        const response = await fetch(`http://localhost:3001/u/${uid}`, {
            method: 'GET',
            headers: {
                Cookie: context.req.headers.cookie || "",
            }
        });
        
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
            props: {
                uid: context.params.uid,
                activeProcesses: [],
                userProcesses: [],
            },
        };
    }
}

export default function UserHome({ uid, activeProcesses, userProcesses }) {

    return (
        <>
            <Head>
                <title>SUSEL - Dashboard do Usuário</title>
                <meta
                    name="description"
                    content="Dashboard principal do usuário no SUSEL"
                />
                <link rel="icon" href="/favicon.ico" />
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
                                    <ProcessListItem
                                        key={process._id}
                                        code={process.code}
                                        title={process.title}
                                        description={process.description}
                                        endDate={process.endDate}
                                        href={`/u/${uid}/process/${process._id}`}
                                    />
                                ))
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
