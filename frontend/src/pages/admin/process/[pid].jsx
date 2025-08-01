import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/AdminProcessDetails.module.css";
import ClientModal from "../../../components/ClientModal";
import PhaseItem from "../../../components/PhaseItem";
import { FileText, Download, Edit } from "lucide-react";
import { format } from "date-fns";
import { getServerSideWithAuth } from "../../../utils/getServerSideWithAuth";

// --- FUNÇÃO getServerSideProps CORRIGIDA ---
export async function getServerSideProps(context) {
    const { pid } = context.params; 
    try {
        const url = `http://localhost:3001/admin/process/${pid}`;
        
        // 1. Obtém o resultado completo do helper
        const authResult = await getServerSideWithAuth(context, url);

        // 2. Verifica se o helper retornou um objeto de redirecionamento
        if (authResult.redirect) {
            return authResult;
        }

        // 3. Agora podemos desestruturar com segurança
        const { response, setCookieHeader } = authResult;

        // Se um novo cookie foi gerado, nós o definimos na resposta para o navegador
        if (setCookieHeader) {
            context.res.setHeader('Set-Cookie', setCookieHeader);
        }

        // 4. A verificação 'ok' agora funciona porque 'response' está garantido que existe
        if (!response.ok) {
            throw new Error("Processo não encontrado.");
        }

        const process = await response.json();
        return { props: { process } };

    } catch (error) {
        console.error("Error fetching process details:", error);
        return { props: { process: null, error: error.message } };
    }
}

export default function ProcessDetailsPage({ process, error }) {
    if (error || !process) {
        return <div>Erro ao carregar o processo: {error || "Processo não encontrado."}</div>;
    }

    const getFileNameFromPath = (filePath) => {
        if (!filePath) return "Nome Indisponível";
        return filePath.replace(/\\/g, '/').split('/').pop();
    };

    return (
        <>
            <Head>
                <title>SUSEL - {process.title}</title>
            </Head>
            <div className={styles.pageContainer}>
                <div className={styles.detailHeader}>
                    <div className={styles.detailTitle}>
                        <FileText size={28} />
                        <div>
                            {process.title}
                            <br />
                            <span>Criado em: {format(new Date(process.date), "dd/MM/yyyy")}</span>
                        </div>
                    </div>
                    <div className={styles.detailActions}>                      
                        <ClientModal processId={process._id} />
                    </div>
                </div>
                
                <p className={styles.detailDescription}>
                    <strong>Descrição:</strong><br /> {process.description}
                </p>

                <div className={styles.attachmentsContainer}>
                    {process.editalPath && (
                        <a href={`http://localhost:3001/${process.editalPath}`} target="_blank" rel="noopener noreferrer" className={styles.attachmentLink}>
                            <Download size={18} /> Edital Principal: {getFileNameFromPath(process.editalPath)}
                        </a>
                    )}
                    {process.attachmentsPaths && process.attachmentsPaths.length > 0 && (
                        <div className={styles.attachmentList}>
                            <strong>Modelos de Declaração:</strong>
                            {process.attachmentsPaths.map((path, index) => (
                                <a key={index} href={`http://localhost:3001/${path}`} target="_blank" rel="noopener noreferrer" className={styles.attachmentLink}>
                                    <Download size={16} /> {getFileNameFromPath(path)}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    {process.phases.map((phase, index) => (
                        <PhaseItem
                            key={phase._id}
                            phaseNumber={index + 1}
                            title={phase.title}
                            description={phase.description}
                            endDate={format(new Date(phase.endDate), "dd/MM/yyyy")}
                        />
                    ))}
                </div>

                <h3 className={styles.submissionListTitle}>Lista de Submissões</h3>
                <div>
                    {process.submissions && process.submissions.length > 0 ? (
                        process.submissions.map((submission) => (
                            <Link
                                href={`/admin/analyse-submission/${submission._id}`}
                                key={submission._id}
                                legacyBehavior
                            >
                                <a className={styles.submissionItem}>
                                    <div>
                                        <FileText size={20} />
                                        {submission.applicant.name} ({submission.status})
                                    </div>
                                    <span>{format(new Date(submission.submissionDate), "dd/MM/yyyy")}</span>
                                </a>
                            </Link>
                        ))
                    ) : (
                        <p>Nenhuma inscrição foi encontrada para este processo.</p>
                    )}
                </div>
            </div>
        </>
    );
}