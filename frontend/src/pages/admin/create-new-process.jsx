import Head from "next/head";
import { useState } from "react";
import Router from "next/router";
import styles from "../../styles/CreateProcess.module.css";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import PhaseCard from "../../components/PhaseCard";
import AttachmentItem from "../../components/AttachmentItem";

// Placeholder para um futuro componente de Upload de Arquivo
const FileUpload = () => (
    <div className={styles.fileUploadBox}>
        <p>Selecione o Arquivo</p>
    </div>
);

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

export default function CreateNewProcessPage() {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");

    const [phases, setPhases] = useState([
        {
            phaseId: 1,
            title: "",
            description: "",
            startDate: null,
            endDate: null,
        },
    ]);

    const handleAddPhase = () => {
        setPhases([
            ...phases,
            {
                phaseId: phases.length + 1,
                title: "",
                description: "",
                startDate: null,
                endDate: null,
            },
        ]);
    };

    const handleDeletePhase = (idToDelete) => {
        setPhases(phases.filter((phase) => phase.phaseId !== idToDelete));
    };

    const handleUpdatePhase = (phaseId, updatedData) => {
        const newPhases = [...phases];
        newPhases[phaseId - 1] = updatedData;
        setPhases(newPhases);
    };

    const [attachments, setAttachments] = useState([
        // Item de exemplo
        { id: 1, title: "Modelo de Declaração de Residência", type: "pdf" },
    ]);

    const handleAddAttachment = () => {
        const newId =
            attachments.length > 0
                ? Math.max(...attachments.map((a) => a.id)) + 1
                : 1;
        const newAttachment = {
            id: newId,
            title: `Novo Anexo ${newId}`,
            type: "pdf",
        };
        setAttachments([...attachments, newAttachment]);
    };

    const handleDeleteAttachment = (idToDelete) => {
        setAttachments(
            attachments.filter((attachment) => attachment.id !== idToDelete)
        );
    };

    const handleCreateProcess = async () => {
        const cleanPhases = phases.map((phase) => ({
            title: phase.title,
            description: phase.description,
            startDate: phase.startDate,
            endDate: phase.endDate,
        }));

        try {
            const response = await fetch(
                "http://localhost:3001/admin/new-process",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        code,
                        description,
                        phases: cleanPhases,
                        //attachments
                    }),
                    credentials: "include",
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    `Erro ao criar o processo: ${errorData.message}`
                );
            }

            const data = await response.json();
            console.log("Processo criado com sucesso:", data);
            alert("Processo criado com sucesso!");
            Router.push("/admin");
        } catch (error) {
            console.error("Erro ao criar o processo:", error);
            alert(`Erro ao criar o processo: ${error.message}`);
        }
    };

    return (
        <>
            <Head>
                <title>SUSEL - Criar Processo Seletivo</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.adminContainer}>
                {/* Header */}
                <header className={styles.header}>
                    <h1>SUSEL</h1>
                    <div className={styles.userProfile}></div>
                </header>

                <main className={styles.content}>
                    <h2 className={styles.pageTitle}>
                        Criação Processo Seletivo
                    </h2>

                    {/* Seção Dados Gerais */}
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Dados gerais</h3>
                        <div className={styles.sectionContent}>
                            <div className={styles.generalDataGrid}>
                                <div className={styles.generalDataInputs}>
                                    <InputField
                                        label="Título"
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                    <InputField
                                        label="Código do Edital"
                                        id="code"
                                        type="text"
                                        value={code}
                                        onChange={(e) =>
                                            setCode(e.target.value)
                                        }
                                    />
                                    <div className={styles.textAreaWrapper}>
                                        <label htmlFor="description">
                                            Descrição do Processo
                                        </label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            rows={5}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className={styles.fileUploadWrapper}>
                                    <label>PDF do Edital</label>
                                    <FileUpload />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            Fases do Processo
                        </h3>
                        {phases.map((phase) => (
                            <PhaseCard
                                key={phase.phaseId}
                                phaseNumber={phase.phaseId}
                                phaseData={phase}
                                onDelete={() =>
                                    handleDeletePhase(phase.phaseId)
                                }
                                onChange={(updated) =>
                                    handleUpdatePhase(phase.phaseId, updated)
                                }
                            />
                        ))}
                        <button
                            className={styles.addButton}
                            onClick={handleAddPhase}
                        >
                            +
                        </button>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Anexos</h3>
                        <div className={styles.attachmentsList}>
                            {attachments.map((attachment) => (
                                <AttachmentItem
                                    key={attachment.id}
                                    attachment={attachment}
                                    onDelete={() =>
                                        handleDeleteAttachment(attachment.id)
                                    }
                                />
                            ))}
                        </div>
                        <button
                            className={styles.addButton}
                            onClick={handleAddAttachment}
                        >
                            +
                        </button>
                    </section>

                    {/* Botões de Ação */}
                    <div className={styles.actionButtons}>
                        <Button variant="primary" onClick={handleCreateProcess}>
                            Criar
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
}
