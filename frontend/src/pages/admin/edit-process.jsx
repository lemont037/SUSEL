import Head from "next/head";
import { useState, useEffect } from "react";
import Router from "next/router";
import styles from "../../styles/CreateProcess.module.css";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import PhaseCard from "../../components/PhaseCard";
import { getServerSideWithAuth } from "../../utils/getServerSideWithAuth";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export async function getServerSideProps(context) {
    const { id } = context.query;

    try {
        const response = await getServerSideWithAuth(
            context,
            `http://localhost:3001/admin/process/${id}`,
            {
                method: "GET",
            }
        );

        if (response?.redirect?.destination) {
            return response;
        } else if (!response.ok) return { notFound: true };
        const initialProcessData = await response.json();
        return { props: { initialProcessData } };
    } catch (error) {
        console.error(`Could not fetch process ${id} for editing:`, error);
        return { notFound: true };
    }
}

export default function EditProcessPage({ initialProcessData }) {
    const { id } = Router.query;

    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [phases, setPhases] = useState([]);

    useEffect(() => {
        if (initialProcessData) {
            setTitle(initialProcessData.title);
            setCode(initialProcessData.code);
            setDescription(initialProcessData.description);
            setPhases(
                initialProcessData.phases.map((p, i) => ({
                    ...p,
                    phaseId: i + 1,
                }))
            );
        }
    }, [initialProcessData]);

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
        const newPhases = phases.map((phase) =>
            phase.phaseId === phaseId ? { ...phase, ...updatedData } : phase
        );
        setPhases(newPhases);
    };

    const handleUpdateProcess = async () => {
        const processData = { title, code, description, phases };

        try {
            const response = await fetchWithAuth(
                `http://localhost:3001/admin/process/${id}/edit`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(processData),
                }
            );

            if (!response.ok) throw new Error("Falha ao atualizar o processo");

            alert("Processo atualizado com sucesso!");
            Router.push(`/admin/process-details?id=${id}`);
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    };

    return (
        <>
            <Head>
                <title>
                    SUSEL - Editando: {initialProcessData?.title || "Processo"}
                </title>
            </Head>
            <main className={styles.content}>
                <h2 className={styles.pageTitle}>Edição Processo Seletivo</h2>

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Dados gerais</h3>
                    <InputField
                        label="Título"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputField
                        label="Código do Edital"
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <div className={styles.textAreaWrapper}>
                        <label htmlFor="description">
                            Descrição do Processo
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                        ></textarea>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>Fases do Processo</h3>
                    {phases.map((phase, index) => (
                        <PhaseCard
                            key={phase.phaseId}
                            phaseNumber={index + 1}
                            phaseData={phase}
                            onChange={(updated) =>
                                handleUpdatePhase(phase.phaseId, updated)
                            }
                            onDelete={() => handleDeletePhase(phase.phaseId)}
                        />
                    ))}
                    <button
                        className={styles.addButton}
                        onClick={handleAddPhase}
                    >
                        +
                    </button>
                </section>

                <div className={styles.actionButtons}>
                    <Button variant="primary" onClick={handleUpdateProcess}>
                        Atualizar
                    </Button>
                    <Button variant="secondary" onClick={() => Router.back()}>
                        Cancelar
                    </Button>
                </div>
            </main>
        </>
    );
}
