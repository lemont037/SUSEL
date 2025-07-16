import { useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/AdminIndex.module.css";
import { ChevronDown, FileText } from 'lucide-react';

function Accordion({ title, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className={styles.accordion}>
            <div className={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
                <h3>{title}</h3>
                <ChevronDown size={20} className={styles.accordionIcon} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default function AdminIndexPage({ activeProcesses, finishedProcesses }) {
    return (
        <>
            <Head>
                <title>SUSEL - Painel Principal</title>
            </Head>
            <div className={styles.pageContainer}>
                <Accordion title="Processos em Andamento" defaultOpen={true}>
                    {activeProcesses.map((process) => (
                        <Link href={`/admin/process-details?id=${process.id}`} key={process.id} legacyBehavior>
                            <a className={styles.processItem}>
                                <FileText size={20} />
                                {process.title}
                                <span>Finaliza em: {process.endDate}</span>
                            </a>
                        </Link>
                    ))}
                </Accordion>
                <Accordion title="Processos Finalizados">
                    {finishedProcesses.map((process) => (
                        <Link href={`/admin/process-details?id=${process.id}`} key={process.id} legacyBehavior>
                            <a className={styles.processItem} style={{ opacity: 0.7 }}>
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

export async function getServerSideProps() {
    // Dados de simulação
    const activeProcesses = [
        { id: 'p3', title: 'Processo Seletivo 03', endDate: '25 Jun'},
        { id: 'p4', title: 'Processo Seletivo 04', endDate: '28 Jun'},
    ];
    const finishedProcesses = [
        { id: 'p1', title: 'Processo Seletivo 01', endDate: '22 Jun'},
        { id: 'p2', title: 'Processo Seletivo 02', endDate: '23 Jun'},
    ];
    return { props: { activeProcesses, finishedProcesses } };
}
