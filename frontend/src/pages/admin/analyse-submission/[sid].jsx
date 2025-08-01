import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from 'react';
import styles from "../../../styles/AnalyseSubmission.module.css";
import Button from "../../../components/Button";
import SectionCard from '../../../components/SectionCard';
// import FileAttachmentLink from '../../../components/FileAttachmentLink'; // Removido para usar links diretos
import { Download } from "lucide-react"; // 1. IMPORTADO O ÍCONE DE DOWNLOAD
import { getServerSideWithAuth } from "../../../utils/getServerSideWithAuth";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

// --- FUNÇÃO getServerSideProps CORRIGIDA ---
export async function getServerSideProps(context) {
    // 1. O ID da submissão agora vem de context.params.sid
    const { sid } = context.params;

    try {
        const url = `http://localhost:3001/admin/submission/${sid}`;
        
        // Usa o padrão de autenticação robusto
        const authResult = await getServerSideWithAuth(context, url);
        if (authResult.redirect) return authResult;

        const { response, setCookieHeader } = authResult;
        if (setCookieHeader) context.res.setHeader('Set-Cookie', setCookieHeader);
        if (!response.ok) throw new Error("Falha ao carregar dados da submissão.");

        const { submission, process } = await response.json();

        return {
            props: {
                submission,
                process,
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
            },
        };
    }
}

// --- COMPONENTE DA PÁGINA ---
export default function AnalyseSubmissionPage({ submission, process, error }) {
    const router = useRouter();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    if (error) {
        return (
            <main className={styles.content}>
                <h2 className={styles.pageTitle}>Erro ao Carregar</h2>
                <div className={styles.errorBox}>{error}</div>
            </main>
        );
    }

    const handleDecision = async (decision) => {
        setIsLoading(true);
        try {
            const url = `http://localhost:3001/admin/submission/${submission._id}/decide`;
            const { response, data } = await fetchWithAuth(
                url, 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ decision })
                }
            );

            if (!response.ok) throw new Error(data.message || "Falha ao registrar decisão");

            setNotification({ message: `Inscrição marcada como ${decision}!`, type: 'success' });

            setTimeout(() => {
                // Redireciona de volta para a página de detalhes do processo
                router.push(`/admin/process/${process._id}`);
            }, 2000);

        } catch (error) {
            setNotification({ message: `Erro: ${error.message}`, type: 'error' });
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>SUSEL - Análise de Inscrição</title>
            </Head>
            <main className={styles.content}>
                <h2 className={styles.pageTitle}>Análise de Inscrição</h2>
                {notification.message && (
                    <div className={notification.type === 'success' ? styles.successBox : styles.errorBox}>
                        {notification.message}
                    </div>
                )}
                
                <div className={styles.mainGrid}>
                    <div className={styles.submissionDetails}>
                        <SectionCard title="Inscrito">
                            <div className={styles.infoBox}>
                                <p><strong>Nome:</strong> {submission.applicant.name}</p>
                                <p><strong>Email:</strong> {submission.applicant.email}</p>
                                <p><strong>CPF:</strong> {submission.applicant.cpf}</p>
                            </div>
                        </SectionCard>
                        
                        <SectionCard title="Respostas do Formulário">
                             <div className={styles.infoBox}>
                                <p><strong>Titulação:</strong> {submission.academicData.titulacao}</p>
                                <p><strong>Instituição Emissora:</strong> {submission.academicData.instituicaoEmissora}</p>
                                <p><strong>Linha de Pesquisa:</strong> {submission.academicData.linhaPesquisa}</p>
                            </div>
                        </SectionCard>

                        <SectionCard title="Anexos">
                             <div className={styles.infoBox}>
                                {/* 2. LÓGICA DE DOWNLOAD CORRIGIDA */}
                                {submission.files && submission.files.length > 0 ? (
                                    submission.files.map((file, index) => (
                                        <a 
                                            key={index}
                                            href={`http://localhost:3001/${file.path}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            download={file.originalName} // Sugere o nome original para o download
                                            className={styles.attachmentLink} // Use um estilo apropriado
                                        >
                                            <Download size={16} />
                                            {file.originalName}
                                        </a>
                                    ))
                                ) : (
                                    <p>Nenhum ficheiro foi anexado.</p>
                                )}
                            </div>
                        </SectionCard>
                    </div>

                    <aside className={styles.processInfoCard}>
                        <h4>{process.title}</h4>
                        <p><strong>Fase Atual:</strong> {process.phases && process.phases.length > 0 ? process.phases[0].title : 'Não definida'}</p>
                        <div className={styles.actionButtons}>
                            <Button
                                variant="primary"
                                onClick={() => handleDecision("deferido")}
                                disabled={isLoading}
                            >
                                {isLoading ? 'A Processar...' : 'Deferir'}
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDecision("indeferido")}
                                disabled={isLoading}
                            >
                                {isLoading ? 'A Processar...' : 'Indeferir'}
                            </Button>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}