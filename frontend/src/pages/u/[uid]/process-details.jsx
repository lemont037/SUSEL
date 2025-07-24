import React from "react";
import Head from "next/head";

import Header from "../../../components/Header";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import SectionCard from "../../../components/SectionCard";
import PhaseItem from "../../../components/PhaseItem";
import AttachmentDisplayItem from "../../../components/AttachmentDisplayItem";

import styles from "../../../styles/UserProcessDetails.module.css";

const process = {
    id: "0001/2025.2",
    title: "Seleção 2025.2 MODO C - Mestrado",
    duration: "20/06/2025 -> 20/07/2025",
    editais: [
        {
            name: "Edital_0001_2025.pdf",
            url: "/caminho/do/edital.pdf",
            type: "pdf",
        },
    ],
    phases: [
        {
            id: "1",
            title: "Fase 1",
            description:
                "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
            endDate: "01/07/2025",
        },
    ],
    attachments: [
        {
            name: "Modelo de Declaração de Residência",
            url: "/caminho/do/modelo.pdf",
            type: "pdf",
        },
        {
            name: "Formulário de Inscrição.pdf",
            url: "/caminho/do/formulario.pdf",
            type: "pdf",
        },
    ],
};

export default function ProcessDetailsPage() {
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleDeleteAttachment = (attachmentName) => {
        // Simula a lógica de exclusão e exibe uma mensagem de sucesso
        console.log(`Simulando a exclusão de: ${attachmentName}`);
        setNotification({ message: `Anexo "${attachmentName}" removido com sucesso (simulação).`, type: 'success' });

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            setNotification({ message: '', type: '' });
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
                <Header />

                <main className={styles.mainContentStyle}>
                    <h1 className={styles.pageTitleStyle}>
                        Processo Seletivo 01
                    </h1>

                    {notification.message && (
                        <div className={notification.type === 'success' ? styles.successBox : styles.errorBox}>
                            {notification.message}
                        </div>
                    )}

                    <SectionCard title="Dados gerais">
                        <div className={styles.blueBoxStyle}>
                            <div style={{ flex: 1, minWidth: "250px" }}>
                                <p className={styles.blueBoxTextStyle}>
                                    Processo {process.id}
                                </p>
                                <br />
                                <p className={styles.blueBoxSmallTextStyle}>
                                    Título: {process.title}
                                </p>
                                <br />
                                <p className={styles.blueBoxSmallTextStyle}>
                                    Duração: {process.duration}
                                </p>
                            </div>
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
                                endDate={phase.endDate}
                            />
                        ))}
                    </SectionCard>

                    <SectionCard title="Anexos">
                        {process.attachments.map((attachment, index) => (
                            <AttachmentDisplayItem
                                key={index}
                                fileName={attachment.name}
                                fileType={attachment.type}
                                fileUrl={attachment.url}
                                onDelete={() => handleDeleteAttachment(attachment.name)}
                            />
                        ))}
                    </SectionCard>

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
