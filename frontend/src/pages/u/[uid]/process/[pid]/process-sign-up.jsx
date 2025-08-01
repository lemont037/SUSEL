import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// --- CORREÇÃO APLICADA NOS CAMINHOS DE IMPORTAÇÃO ---
// Os caminhos agora têm um nível a menos para corresponder à nova localização do ficheiro.
import { getServerSideWithAuth } from '../../../../../utils/getServerSideWithAuth';
import { fetchWithAuth } from '../../../../../utils/fetchWithAuth';
import Header from '../../../../../components/Header';
import Button from '../../../../../components/Button';
import ProcessInfoPanel from '../../../../../components/ProcessInfoPanel';
import CandidateDataForm from '../../../../../components/CandidateDataForm';
import AcademicForm from '../../../../../components/AcademicForm';
import FileUploader from '../../../../../components/FileUploader';

// Revertido para os estilos inline originais, como solicitado
const layoutContainerStyle = { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--background)' };
const twoColumnLayout = { display: 'flex', flex: 1, gap: '30px', padding: '20px', maxWidth: '1200px', margin: '20px auto', flexWrap: 'wrap', alignItems: 'flex-start' };
const formColumnStyle = { flex: 3, minWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' };
const infoPanelColumnStyle = { flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' };
const bottomButtonsContainerStyle = { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', paddingBottom: '40px' };
const notificationBoxBaseStyle = { borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', fontWeight: 'bold', textAlign: 'center' };
const successBoxStyle = { ...notificationBoxBaseStyle, backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' };
const errorBoxStyle = { ...notificationBoxBaseStyle, backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fecaca' };


// --- FUNÇÃO PARA BUSCAR OS DADOS DO PROCESSO ANTES DE A PÁGINA CARREGAR ---
export async function getServerSideProps(context) {
    const { uid, pid } = context.params;
    const url = `http://localhost:3001/u/${uid}/process/${pid}`;

    try {
        const authResult = await getServerSideWithAuth(context, url);
        if (authResult.redirect) return authResult;

        const { response, setCookieHeader } = authResult;
        if (setCookieHeader) context.res.setHeader('Set-Cookie', setCookieHeader);
        if (!response.ok) return { notFound: true };

        const processData = await response.json();
        return { props: { processData } };
    } catch (error) {
        console.error("Erro ao buscar detalhes do processo para inscrição:", error);
        return { notFound: true };
    }
}

// --- COMPONENTE DA PÁGINA ---
export default function ProcessSignUpPage({ processData, error }) {
    const router = useRouter();
    const { uid, pid } = router.query;
    
    // Estado centralizado para todos os dados do formulário
    const [candidateData, setCandidateData] = useState({ name: '', cpf: '', rg: '', gender: '', email: '', phone: '', cep: '', address: '', number: '', complement: '', neighborhood: '', city: '' });
    const [academicData, setAcademicData] = useState({ titulacao: '', instituicaoEmissora: '', linhaPesquisa: '' });
    const [files, setFiles] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    if (error || !processData) {
        return (
             <div style={layoutContainerStyle}>
                <Header />
                <main style={{ padding: '2rem', textAlign: 'center' }}>
                    <h2>Erro ao Carregar</h2>
                    <p>{error || "Não foi possível carregar os dados do processo."}</p>
                </main>
            </div>
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const submissionFormData = new FormData();
        submissionFormData.append('candidateData', JSON.stringify(candidateData));
        submissionFormData.append('academicData', JSON.stringify(academicData));
        files.forEach(file => {
            submissionFormData.append('documents', file);
        });

        try {
            const url = `http://localhost:3001/u/${uid}/process/${pid}/submit`;
            const { response, data } = await fetchWithAuth(url, { method: 'POST', body: submissionFormData });

            if (!response.ok) throw new Error(data.message || 'Ocorreu um erro ao submeter o formulário.');

            setNotification({ message: 'Formulário Submetido com Sucesso!', type: 'success' });
            setTimeout(() => router.push(`/u/${uid}/process/${pid}`), 3000);
        } catch (err) {
            setNotification({ message: err.message, type: 'error' });
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>SUSEL - Inscrição: {processData.title}</title>
            </Head>
            <div style={layoutContainerStyle}>
                <Header />
                <form onSubmit={handleSubmit}>
                    <div style={twoColumnLayout}>
                        <div style={formColumnStyle}>
                            {notification.message && (
                                <div style={notification.type === 'success' ? successBoxStyle : errorBoxStyle}>
                                    {notification.message}
                                </div>
                            )}
                            <CandidateDataForm formData={candidateData} setFormData={setCandidateData} />
                            <AcademicForm formData={academicData} setFormData={setAcademicData} />
                            <FileUploader files={files} setFiles={setFiles} />
                        </div>
                        <div style={infoPanelColumnStyle}>
                            <ProcessInfoPanel
                                processId={processData.code}
                                title={processData.title}
                                duration={`${new Date(processData.phases[0].startDate).toLocaleDateString()} - ${new Date(processData.phases[processData.phases.length - 1].endDate).toLocaleDateString()}`}
                                currentPhase={processData.phases[0].title}
                                onDetailsClick={() => router.push(`/u/${uid}/process/${pid}`)}
                            />
                        </div>
                    </div>
                    <div style={bottomButtonsContainerStyle}>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'A Enviar...' : 'Submeter Inscrição'}
                        </Button>
                        <Button type="button" variant="secondary" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}