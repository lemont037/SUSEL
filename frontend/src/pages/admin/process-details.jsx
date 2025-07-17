import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/AdminProcessDetails.module.css';
import ClientModal from '../../components/ClientModal';
import { FileText, User } from 'lucide-react';

export default function ProcessDetailsPage({ process }) {
    if (!process) {
        return <div>Processo não encontrado.</div>;
    }

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
                        <ClientModal processId={process.id} />
                    </div>
                </div>

                <p className={styles.detailDescription}>
                    (Descrição) {process.description} (Descrição)
                </p>

                <h3 className={styles.submissionListTitle}>Lista de Submissões</h3>
                <div>
                    {process.submissions.map((sub) => (
                        <Link href={`/admin/analyse-submission?id=${sub.id}`} key={sub.id} legacyBehavior>
                            <a className={styles.submissionItem}>
                                <div>
                                    <FileText size={20} />
                                    {sub.applicantName}
                                </div>
                                <span>Envio: {sub.submissionDate}</span>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    
    // Dados de simulação:
    const process = {
        id: id,
        title: 'Nome do Processo',
        creationDate: '15 de jun',
        endDate: '25 de jun',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.',
        submissions: [
            { id: 's1', applicantName: 'Aluno da Silva', submissionDate: '25 de jun'},
            { id: 's2', applicantName: 'Aluno da Silva', submissionDate: '21 de jun'},
            { id: 's3', applicantName: 'Aluno da Silva', submissionDate: '17 de jun'},
        ]
    };

    return { props: { process } };
}
