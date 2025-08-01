import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// --- CORREÇÃO APLICADA NOS CAMINHOS DE IMPORTAÇÃO ---
import styles from "../../../../../styles/CreateProcess.module.css";
import Button from "../../../../../components/Button";
import InputField from "../../../../../components/InputField";
import PhaseCard from "../../../../../components/PhaseCard";
import { getServerSideWithAuth } from "../../../../../utils/getServerSideWithAuth";
import { fetchWithAuth } from "../../../../../utils/fetchWithAuth";

export async function getServerSideProps(context) {
    const { pid } = context.params;

    try {
        const url = `http://localhost:3001/admin/process/${pid}`;
        const authResult = await getServerSideWithAuth(context, url);

        if (authResult.redirect) {
            return authResult;
        }

        const { response, setCookieHeader } = authResult;

        if (setCookieHeader) {
            context.res.setHeader('Set-Cookie', setCookieHeader);
        }

        if (!response.ok) {
            return { notFound: true };
        }
        
        const initialProcessData = await response.json();
        return { props: { initialProcessData } };

    } catch (error) {
        console.error(`Could not fetch process ${pid} for editing:`, error);
        return { notFound: true };
    }
}

export default function EditProcessPage({ initialProcessData }) {
    const router = useRouter();
    const { pid } = router.query;

    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [phases, setPhases] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (initialProcessData) {
            setTitle(initialProcessData.title);
            setCode(initialProcessData.code);
            setDescription(initialProcessData.description);
            setPhases(initialProcessData.phases.map((p, i) => ({ ...p, phaseId: i + 1 })));
        }
    }, [initialProcessData]);

    const handleUpdateProcess = async () => {
        setIsLoading(true);
        const processData = { title, code, description, phases };
        try {
            const url = `http://localhost:3001/admin/process/${pid}/edit`;
            const { response, data } = await fetchWithAuth(
                url,
                {
                    method: "PUT",
                    body: JSON.stringify(processData),
                }
            );

            if (!response.ok) throw new Error(data.message || "Falha ao atualizar o processo");

            setNotification({ message: 'Processo atualizado com sucesso!', type: 'success' });
            
            setTimeout(() => {
                router.push(`/admin/process/${pid}`);
            }, 2000);

        } catch (error) {
            setNotification({ message: `Erro: ${error.message}`, type: 'error' });
            setIsLoading(false);
        }
    };

    // Funções para gerir as fases
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

    return (
        <>
            <Head>
                <title>SUSEL - Editando: {initialProcessData?.title || "Processo"}</title>
            </Head>
            <main className={styles.content}>
                <h2 className={styles.pageTitle}>Edição Processo Seletivo</h2>
                {notification.message && (
                    <div className={notification.type === 'success' ? styles.successBox : styles.errorBox}>
                        {notification.message}
                    </div>
                )}
                
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
                    <Button variant="primary" onClick={handleUpdateProcess} disabled={isLoading}>
                        {isLoading ? 'A Atualizar...' : 'Atualizar'}
                    </Button>
                    <Button variant="secondary" onClick={() => router.back()}>
                        Cancelar
                    </Button>
                </div>
            </main>
        </>
    );
}