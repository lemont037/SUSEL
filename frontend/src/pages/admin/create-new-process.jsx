import Head from "next/head";
import { useState } from "react";
import Router from "next/router";
import styles from "../../styles/CreateProcess.module.css";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import PhaseCard from "../../components/PhaseCard";
import { getServerSideWithAuth } from "../../utils/getServerSideWithAuth";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import PdfUploader from "../../components/PdfUploader";
import AttachmentManager from "../../components/AttachmentManager";

// --- FUNÇÃO getServerSideProps CORRIGIDA ---
export async function getServerSideProps(context) {
    try {
        // A chamada à API de verificação é simples, pode ser para a rota principal de admin
        const url = "http://localhost:3001/admin";
        
        // 1. Usa o novo padrão de resposta do helper
        const authResult = await getServerSideWithAuth(context, url, { method: "GET" });

        // 2. Verifica se o helper retornou um objeto de redirecionamento
        if (authResult.redirect) {
            return authResult;
        }

        const { response, setCookieHeader } = authResult;

        // Se um novo cookie foi gerado, nós o definimos na resposta para o navegador
        if (setCookieHeader) {
            context.res.setHeader('Set-Cookie', setCookieHeader);
        }

        // Se a resposta não for 'ok' (ex: utilizador não é admin), lança um erro
        if (!response.ok) {
            throw new Error("Acesso não autorizado.");
        }

        // Se a autenticação for bem-sucedida, renderiza a página
        return {
            props: {},
        };
    } catch (error) {
        console.error("Erro em getServerSideProps (create-new-process):", error);
        // 3. CORREÇÃO: Redireciona para a página de login correta ('/')
        return {
            redirect: {
                destination: '/', // A sua página de login está na raiz
                permanent: false,
            }
        };
    }
}

// --- COMPONENTE DA PÁGINA (com a lógica de upload integrada) ---
export default function CreateNewProcessPage() {
    // Estados para os dados gerais
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    
    // Estados para os ficheiros
    const [editalPdf, setEditalPdf] = useState(null);
    const [declarationAttachments, setDeclarationAttachments] = useState([]);
    
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Estado para as fases do processo
    const [phases, setPhases] = useState([
        { phaseId: 1, title: "", description: "", startDate: null, endDate: null },
    ]);

    // --- LÓGICA PARA GERIR AS FASES IMPLEMENTADA ---
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
        // Recalcula os phaseIds para manter a sequência correta
        const newPhases = phases
            .filter((phase) => phase.phaseId !== idToDelete)
            .map((phase, index) => ({
                ...phase,
                phaseId: index + 1,
            }));
        setPhases(newPhases);
    };

    const handleUpdatePhase = (phaseId, updatedData) => {
        const newPhases = phases.map(phase => 
            phase.phaseId === phaseId ? { ...phase, ...updatedData } : phase
        );
        setPhases(newPhases);
    };

    // Função para criar o processo, já com a lógica de FormData
    const handleCreateProcess = async () => {
        if (!title || !code || !editalPdf) {
            setNotification({ message: 'Título, Código e PDF do Edital são obrigatórios.', type: 'error' });
            return;
        }
        setIsLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('code', code);
        formData.append('description', description);
        formData.append('phases', JSON.stringify(phases.map(({ phaseId, ...phase }) => phase)));
        formData.append('edital', editalPdf);
        declarationAttachments.forEach(file => {
            formData.append('attachments', file);
        });

        try {
            const { response, data } = await fetchWithAuth(
                "http://localhost:3001/admin/new-process",
                { method: "POST", body: formData }
            );

            if (!response.ok) throw new Error(data.message || 'Erro ao criar processo');

            setNotification({ message: 'Processo criado com sucesso!', type: 'success' });
            setTimeout(() => Router.push("/admin"), 2000);

        } catch (error) {
            setNotification({ message: `Erro: ${error.message}`, type: 'error' });
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>SUSEL - Criar Processo Seletivo</title>
            </Head>
            <div className={styles.adminContainer}>
                <header className={styles.header}>
                    <h1>SUSEL</h1>
                    <div className={styles.userProfile}></div>
                </header>
                <main className={styles.content}>
                    <h2 className={styles.pageTitle}>Criação Processo Seletivo</h2>
                    
                    {notification.message && (
                        <div className={notification.type === 'success' ? styles.successBox : styles.errorBox}>
                            {notification.message}
                        </div>
                    )}
                    
                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Dados gerais</h3>
                        <div className={styles.sectionContent}>
                             <div className={styles.generalDataGrid}>
                                <div className={styles.generalDataInputs}>
                                    <InputField label="Título" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    <InputField label="Código do Edital" id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                                    <div className={styles.textAreaWrapper}>
                                        <label htmlFor="description">Descrição do Processo</label>
                                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5}></textarea>
                                    </div>
                                </div>
                                <div className={styles.fileUploadWrapper}>
                                    <label>PDF do Edital (Obrigatório)</label>
                                    <PdfUploader file={editalPdf} onFileSelect={setEditalPdf} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Fases do Processo</h3>
                        {phases.map((phase) => (
                            <PhaseCard
                                key={phase.phaseId}
                                phaseNumber={phase.phaseId}
                                phaseData={phase}
                                onDelete={() => handleDeletePhase(phase.phaseId)}
                                onChange={(updated) => handleUpdatePhase(phase.phaseId, updated)}
                            />
                        ))}
                        <button type="button" className={styles.addButton} onClick={handleAddPhase}>+</button>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Modelos de Declaração (Anexos)</h3>
                        <AttachmentManager 
                            attachments={declarationAttachments} 
                            onAttachmentsChange={setDeclarationAttachments}
                        />
                    </section>

                    <div className={styles.actionButtons}>
                        <Button variant="primary" onClick={handleCreateProcess} disabled={isLoading}>
                            {isLoading ? 'A Criar...' : 'Criar'}
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
}