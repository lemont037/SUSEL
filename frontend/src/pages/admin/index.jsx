import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/AdminIndex.module.css";
import { ChevronDown, FileText } from "lucide-react";

export async function getServerSideProps() {
    try {
        const response = await fetch("http://localhost:3001/admin");
        const data = await response.json();

        return {
            props: {
                activeProcesses: data.activeProcesses || [],
                inactiveProcesses: data.inactiveProcesses || [],
            },
        };
    } catch (error) {
        console.error("Error fetching processes:", error);
        return {
            props: {
                activeProcesses: [],
                inactiveProcesses: [],
            },
        };
    }
}

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

export default function AdminIndexPage({ activeProcesses, inactiveProcesses }) {
    return (
        <>
            <Head>
                <title>SUSEL - Painel Principal</title>
            </Head>
            <div className={styles.pageContainer}>
                <Accordion title="Processos em Andamento" defaultOpen={true}>
                    {activeProcesses.map((process) => (
                        <Link
                            href={`/admin/process-details?id=${process._id}`}
                            key={process._id}
                            legacyBehavior
                        >
                            <a className={styles.processItem}>
                                <FileText size={20} />
                                {process.title}
                                <span>Finaliza em: {process.endDate}</span>
                            </a>
                        </Link>
                    ))}
                </Accordion>
                <Accordion title="Processos Finalizados">
                    {inactiveProcesses.map((process) => (
                        <Link
                            href={`/admin/process-details?id=${process._id}`}
                            key={process._id}
                            legacyBehavior
                        >
                            <a
                                className={styles.processItem}
                                style={{ opacity: 0.7 }}
                            >
                                <FileText size={20} />
                                {process.title}
                                <span>Finalizado em: {process.endDate}</span>
                            </a>
                        </Link>
                    ))}
                </Accordion>
            </div>
        </>
    );
}
