import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/AdminProcessDetails.module.css';
import ClientModal from '../../components/ClientModal';
import { FileText, User } from 'lucide-react';

export async function getServerSideProps(context) {
    const { id } = context.query;
    console.log("Fetching process details for ID:", id);

    try {
        const response = await fetch(`http://localhost:3001/admin/process/${id}`);
        const process = await response.json();
        if (!process) {
            return { props: { process: null } };
        }

        return { props: { process } };
    } catch (error) {
        console.error('Error fetching process details:', error);
        return { props: { process: null } };
    }
};

export default function ProcessDetailsPage({ process }) {
    if (!process) {
        return <div>Processo não encontrado.</div>;
    }

    console.log("Process Details:", process);

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
                            <span>{process.creationDate}</span>
                        </div>
                    </div>
                    <div className={styles.detailActions}>
                        <p className={styles.detailDate}>Data de Entrega: {process.endDate}</p>
                        <ClientModal processId={process._id} />
                    </div>
                </div>

                <p className={styles.detailDescription}>
                    (Descrição) <br/> {process.description}
                </p>

                <h3 className={styles.submissionListTitle}>Lista de Submissões</h3>
                <div>
                    { process.subscribers.length === 0 ? (
                        <p>Nenhuma inscrição foi encontrada para esse processo.</p>
                    ) : (
                        process.subscribers.map((sub) => (
                        <Link href={`/admin/analyse-submission?id=${sub.id}`} key={sub.id} legacyBehavior>
                            <a className={styles.submissionItem}>
                                <div>
                                    <FileText size={20} />
                                    {sub.applicantName}
                                </div>
                                <span>Envio: {sub.submissionDate}</span>
                            </a>
                        </Link>)
                    ))}
                </div>
            </div>
        </>
    );
}
