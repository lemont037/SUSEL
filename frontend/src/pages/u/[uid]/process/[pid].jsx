import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Download } from "lucide-react"; // Ícone para os botões

// Seus helpers e componentes
import { getServerSideWithAuth } from "../../../../utils/getServerSideWithAuth";
import Header from "../../../../components/Header";
import Button from "../../../../components/Button";
import SectionCard from "../../../../components/SectionCard";
import PhaseItem from "../../../../components/PhaseItem";
import styles from "../../../../styles/UserProcessDetails.module.css";

// --- FUNÇÃO QUE RODA NO SERVIDOR ANTES DA PÁGINA CARREGAR ---
export async function getServerSideProps(context) {
    try {
        const { uid, pid } = context.params;
        // A rota no backend para buscar detalhes de um processo para o utilizador é /u/:uid/process/:pid
        const url = `http://localhost:3001/u/${uid}/process/${pid}`;
        const { response, setCookieHeader } = await getServerSideWithAuth(context, url);

        if (setCookieHeader) {
            context.res.setHeader('Set-Cookie', setCookieHeader);
        }

        if (response?.redirect) return response;
        if (!response.ok) return { notFound: true };

        const processData = await response.json();
        return { props: { process: processData } };

    } catch (error) {
        console.error("Erro ao buscar detalhes do processo:", error);
        return { notFound: true };
    }
}


// --- COMPONENTE DA PÁGINA ---
export default function ProcessDetailsPage({ process }) {
    const router = useRouter();
    const { uid, pid } = router.query;

    const handleSignUpClick = () => {
        router.push(`/u/${uid}/process/${pid}/process-sign-up`);
    };

    // Função auxiliar para extrair um nome de ficheiro legível do caminho (path)
    const getFileNameFromPath = (filePath) => {
        if (!filePath) return "Nome Indisponível";
        // Remove o hash inicial e a extensão para um nome mais limpo, se desejar
        // Ex: "uploads/a1b2c3d4e5f6.pdf" -> "a1b2c3d4e5f6"
        const nameWithHash = filePath.replace(/\\/g, '/').split('/').pop();
        return nameWithHash; // Ou pode adicionar lógica para nomes mais amigáveis
    }

    return (
        <>
            <Head>
                <title>SUSEL - {process.title}</title>
                <meta name="description" content={process.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.layoutContainerStyle}>
                <Header />

                <main className={styles.mainContentStyle}>
                    <h1 className={styles.pageTitleStyle}>{process.title}</h1>

                    <SectionCard title="Dados gerais">
                        <div className={styles.blueBoxStyle}>
                            <div style={{ flex: 1, minWidth: "250px" }}>
                                <p className={styles.blueBoxTextStyle}>Processo {process.code}</p>
                                <p className={styles.blueBoxSmallTextStyle}><strong>Descrição:</strong> {process.description}</p>
                            </div>
                             {/* --- INÍCIO DA LÓGICA DO EDITAL --- */}
                            <div className={styles.editalContainer}>
                                {process.editalPath ? (
                                    <>
                                        <strong>Arquivo Edital:</strong>
                                        <a 
                                            href={`http://localhost:3001/${process.editalPath.replace(/\\/g, '/')}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className={styles.downloadButton}
                                        >
                                            <Download size={16} />
                                            Baixar Edital
                                        </a>
                                    </>
                                ) : (
                                    <p>Edital não disponível.</p>
                                )}
                            </div>
                             {/* --- FIM DA LÓGICA DO EDITAL --- */}
                        </div>
                    </SectionCard>

                    <SectionCard title="Fases do Processo">
                        <div className={styles.sectionDivider}></div>
                        {process.phases.map((phase, index) => (
                            <PhaseItem
                                key={phase._id}
                                phaseNumber={index + 1}
                                title={phase.title}
                                description={phase.description}
                                endDate={format(new Date(phase.endDate), "dd/MM/yyyy")}
                            />
                        ))}
                    </SectionCard>

                    {/* --- INÍCIO DA LÓGICA DOS ANEXOS --- */}
                    <SectionCard title="Anexos (Modelos de Declaração)">
                        <div className={styles.sectionDivider}></div>
                        {process.attachmentsPaths && process.attachmentsPaths.length > 0 ? (
                            <div className={styles.attachmentsGrid}>
                                {process.attachmentsPaths.map((filePath, index) => (
                                    <a 
                                        key={index}
                                        href={`http://localhost:3001/${filePath.replace(/\\/g, '/')}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className={styles.attachmentLink}
                                    >
                                        <Download size={16} />
                                        {`Modelo ${index + 1}`}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p>Nenhum anexo disponível para este processo.</p>
                        )}
                    </SectionCard>
                    {/* --- FIM DA LÓGICA DOS ANEXOS --- */}

                    <div className={styles.buttonRowStyle}>
                        <Button
                            onClick={handleSignUpClick}
                            style={{ backgroundColor: "#12B76A", padding: "12px 25px", fontSize: "18px", borderRadius: "8px", fontWeight: "bold" }}
                        >
                            Fazer Inscrição
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
}
