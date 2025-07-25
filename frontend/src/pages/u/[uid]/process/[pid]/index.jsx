import React from "react";
import Head from "next/head";
import { useState } from "react";
import Header from "../../../../../components/Header";
import Button from "../../../../../components/Button";
import SectionCard from "../../../../../components/SectionCard";
import PhaseItem from "../../../../../components/PhaseItem";
import styles from "../../../../../styles/UserProcessDetails.module.css";
import { getServerSideWithAuth } from "../../../../../utils/getServerSideWithAuth";

import AttachmentDisplayItem from "../../../../../components/AttachmentDisplayItem";
import Card from "../../../../../components/Card";

export async function getServerSideProps(context) {
    const { uid } = context.params;
    const { pid } = context.params;

    try {
        const response = await getServerSideWithAuth(
            context,
            `http://localhost:3001/u/${uid}/process/${pid}`,
            {
                method: "GET",
            }
        );

        if (response?.redirect?.destination) return response;

        const process = await response.json();
        if (!process) {
            return {
                props: {
                    process: null,
                },
            };
        }

        return { props: { uid, process } };
    } catch (error) {
        console.error("Error fetching process details: ", error);
        return { props: { uid: null, process: null } };
    }
}

export default function ProcessDetailsPage({ uid, process }) {
    const [notification, setNotification] = useState({ message: "", type: "" });

    const handleDeleteAttachment = (attachmentName) => {
        // Simula a lógica de exclusão e exibe uma mensagem de sucesso
        console.log(`Simulando a exclusão de: ${attachmentName}`);
        setNotification({
            message: `Anexo "${attachmentName}" removido com sucesso (simulação).`,
            type: "success",
        });

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            setNotification({ message: "", type: "" });
        }, 3000);
    };

    return (
        <>
            <Head>
                <title>SUSEL - Detalhes do Processo</title>
                <meta
                    name="description"
                    content="Detalhes de um processo seletivo no SUSEL"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.layoutContainerStyle}>
                <Header UserId={uid} />

                <main className={styles.mainContentStyle}>
                    <h1 className={styles.pageTitleStyle}>{process.title}</h1>

                    {notification.message && (
                        <div
                            className={
                                notification.type === "success"
                                    ? styles.successBox
                                    : styles.errorBox
                            }
                        >
                            {notification.message}
                        </div>
                    )}

                    <SectionCard title="Dados gerais">
                        <div className={styles.blueBoxStyle}>
                            <div style={{ flex: 1, minWidth: "250px" }}>
                                <div className={styles.blueBoxTitleStyle}>
                                    Processo {process.code}
                                </div>
                                <br />
                                <div className={styles.blueBoxTextStyle}>
                                    Título:
                                    <p
                                        className={styles.blueBoxSmallTextStyle}
                                    >
                                        {process.title}
                                    </p>
                                </div>
                                <br />
                                <div className={styles.blueBoxTextStyle}>
                                    Duração:{" "}
                                    <p className={styles.blueBoxSmallTextStyle}>
                                        {process.phases.length > 0
                                            ? new Date(
                                                  process.phases[0].startDate
                                              ).toLocaleDateString()
                                            : "Data não disponível"}{" "}
                                        a{" "}
                                        {process.phases.length > 0
                                            ? new Date(
                                                  process.phases[
                                                      process.phases.length - 1
                                                  ].endDate
                                              ).toLocaleDateString()
                                            : "Data não disponível"}
                                    </p>
                                </div>
                            </div>
                            {/*
                            <div
                                style={{
                                    flexShrink: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                }}
                            >
                                <p
                                    style={{
                                        ...styles.blueBoxSmallTextStyle,
                                        textAlign: "right",
                                        marginBottom: "10px",
                                        color: "white",
                                    }}
                                >
                                    <strong>Arquivo Edital:</strong>
                                </p>
                                {process.editais.map((edital, index) => (
                                    <Button
                                        key={index}
                                        onClick={() =>
                                            window.open(edital.url, "_blank")
                                        }
                                        style={{
                                            backgroundColor:
                                                "var(--azul-primario)",
                                            color: "white",
                                            padding: "8px 12px",
                                            fontSize: "14px",
                                            borderRadius: "5px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            boxShadow:
                                                "0 2px 4px rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "16px",
                                                color: "white",
                                            }}
                                        >
                                            &#x1F4C4;
                                        </span>
                                        {edital.name}
                                    </Button>
                                ))}
                            </div>
*/}
                        </div>
                    </SectionCard>
                    <SectionCard title="Fases do Processo">
                        <div
                            style={{
                                borderBottom:
                                    "1px solid var(--azul-secundario)",
                                marginBottom: "20px",
                            }}
                        ></div>
                        {process.phases.map((phase) => (
                            <PhaseItem
                                key={phase.id}
                                phaseNumber={phase.id}
                                title={phase.title}
                                description={phase.description}
                                endDate={new Date(
                                    phase.endDate
                                ).toLocaleDateString()}
                            />
                        ))}
                    </SectionCard>

                    {/*
                    <SectionCard title="Anexos">
                        {process.attachments.map((attachment, index) => (
                            <AttachmentDisplayItem
                                key={index}
                                fileName={attachment.name}
                                fileType={attachment.type}
                                fileUrl={attachment.url}
                                onDelete={() =>
                                    handleDeleteAttachment(attachment.name)
                                }
                            />
                        ))}
                    </SectionCard>
*/}
                    <div className={styles.buttonRowStyle}>
                        <Button
                            onClick={() => {}}
                            style={{
                                backgroundColor: "#12B76A",
                                padding: "12px 25px",
                                fontSize: "18px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                            }}
                        >
                            Fazer Inscrição
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
}
