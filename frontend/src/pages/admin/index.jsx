import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/AdminIndex.module.css";
import { ChevronDown, FileText } from "lucide-react";
import { getServerSideWithAuth } from "../../utils/getServerSideWithAuth";
import { format } from "date-fns"; // Importado para formatar a data

// --- FUNÇÃO getServerSideProps CORRIGIDA ---
export async function getServerSideProps(context) {
    try {
        // 1. O helper agora retorna um objeto com 'response', 'setCookieHeader' e 'redirect'
        const authResult = await getServerSideWithAuth(
            context,
            "http://localhost:3001/admin",
            { method: "GET" }
        );

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

        // Se a resposta não for 'ok', lança um erro
        if (!response.ok) {
            throw new Error("Falha ao buscar os processos.");
        }

        const data = await response.json();

        return {
            props: {
                activeProcesses: data.activeProcesses || [],
                inactiveProcesses: data.inactiveProcesses || [],
            },
        };
    } catch (error) {
        console.error("Error fetching processes:", error);
        // Em caso de erro, é mais seguro redirecionar para o login
        return {
            redirect: {
                destination: '/', // Redireciona para a página de login principal
                permanent: false,
            }
        };
    }
}

// Componente Accordion (sem alterações)
function Accordion({ title, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className={styles.accordion}>
            <div
                className={styles.accordionHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3>{title}</h3>
                <ChevronDown
                    size={20}
                    className={styles.accordionIcon}
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
            </div>
            <div
                className={`${styles.accordionContent} ${
                    isOpen ? styles.open : ""
                }`}
            >
                {children}
            </div>
        </div>
    );
}

// Componente da Página Principal do Admin
export default function AdminIndexPage({ activeProcesses, inactiveProcesses }) {
    // Função para encontrar a data de fim da última fase de um processo
    const getFinalEndDate = (phases) => {
        if (!phases || phases.length === 0) return 'N/A';
        const lastPhase = phases[phases.length - 1];
        return format(new Date(lastPhase.endDate), "dd/MM/yyyy");
    };

    return (
        <>
            <Head>
                <title>SUSEL - Painel Principal</title>
            </Head>
            <div className={styles.pageContainer}>
                <Accordion title="Processos em Andamento" defaultOpen={true}>
                    {activeProcesses.length > 0 ? (
                        activeProcesses.map((process) => (
                            <Link
                                href={`/admin/process/${process._id}`}
                                key={process._id}
                                legacyBehavior
                            >
                                <a className={styles.processItem}>
                                    <FileText size={20} />
                                    {process.title}
                                    {/* CORREÇÃO: Usa a função para pegar a data de fim correta */}
                                    <span>Finaliza em: {getFinalEndDate(process.phases)}</span>
                                </a>
                            </Link>
                        ))
                    ) : <p className={styles.emptyMessage}>Nenhum processo em andamento.</p>}
                </Accordion>
                <Accordion title="Processos Finalizados">
                    {inactiveProcesses.length > 0 ? (
                        inactiveProcesses.map((process) => (
                            <Link
                                href={`/admin/process/${process._id}`}
                                key={process._id}
                                legacyBehavior
                            >
                                <a
                                    className={styles.processItem}
                                    style={{ opacity: 0.7 }}
                                >
                                    <FileText size={20} />
                                    {process.title}
                                    {/* CORREÇÃO: Usa a função para pegar a data de fim correta */}
                                    <span>Finalizado em: {getFinalEndDate(process.phases)}</span>
                                </a>
                            </Link>
                        ))
                    ) : <p className={styles.emptyMessage}>Nenhum processo finalizado.</p>}
                </Accordion>
            </div>
        </>
    );
}