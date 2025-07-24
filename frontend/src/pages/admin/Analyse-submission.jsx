import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/AnalyseSubmission.module.css";
import Button from "../../components/Button";

export default function AnalyseSubmissionPage({ submission, process }) {
    const router = useRouter();
    const [notification, setNotification] = useState({ message: '', type: '' });
    const handleDecision = async (decision) => {
        // TODO: Conectar com a API do back-end para enviar a decisão
        try {
            const response = await fetch(
                `http://localhost:3001/admin/submission/${submission.id}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ decision }), // 'deferido' ou 'indeferido'
                }
            );

            if (!response.ok) throw new Error("Falha ao registrar decisão");

            setNotification({ message: `Inscrição marcada como ${decision}!`, type: 'success' });

            // Redireciona após um pequeno delay para o usuário ver a mensagem
            setTimeout(() => {
                router.push(`/admin/process-details?id=${process.id}`);
            }, 2000); // Atraso de 2 segundos

            router.push(`/admin/process-details?id=${process.id}`);
        } catch (error) {
            setNotification({ message: `Erro: ${error.message}`, type: 'error' });
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
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>Inscrito</h3>
                            <div className={styles.infoBox}>
                                <p>
                                    <strong>Nome:</strong>{" "}
                                    {submission.applicant.name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {submission.applicant.email}
                                </p>
                                <p>
                                    <strong>CPF:</strong>{" "}
                                    {submission.applicant.cpf}
                                </p>
                            </div>
                        </section>
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>
                                Respostas do Formulário
                            </h3>
                            <div className={styles.infoBox}>
                                {/* Mapear e exibir as respostas do formulário aqui */}
                                <p>Respostas do candidato...</p>
                            </div>
                        </section>
                        <section className={styles.section}>
                            <h3 className={styles.sectionTitle}>Anexos</h3>
                            <div className={styles.infoBox}>
                                {/* Mapear e exibir os anexos para download aqui */}
                                <p>Links para os documentos...</p>
                            </div>
                        </section>
                    </div>

                    <aside className={styles.processInfoCard}>
                        <h4>{process.title}</h4>
                        <p>
                            <strong>Fase Atual:</strong> {process.currentPhase}
                        </p>
                        <div className={styles.actionButtons}>
                            <Button
                                variant="primary"
                                onClick={() => handleDecision("deferido")}
                            >
                                Deferir
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDecision("indeferido")}
                            >
                                Indeferir
                            </Button>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}

// TODO: Conectar com a API do back-end
export async function getServerSideProps(context) {
    const { id } = context.query;
    try {
        const response = await fetch(
            `http://localhost:3001/admin/submission/${id}`
        );
        if (!response.ok) return { notFound: true };
        const { submission, process } = await response.json();
        return { props: { submission, process } };
    } catch (error) {
        console.error(`Could not fetch submission ${id}:`, error);
        return { notFound: true };
    }
}
