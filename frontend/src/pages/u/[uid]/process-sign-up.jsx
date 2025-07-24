import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'; // Para pegar o UID da URL
import Header from '../../../components/header'; 
import Button from '../../../components/Button'; 
import ProcessInfoPanel from '../../../components/ProcessInfoPanel'; 
import CandidateDataForm from '../../../components/CandidateDataForm'; 
import AcademicForm from '../../../components/AcademicForm'; 
import FileUploader from '../../../components/FileUploader'; 

// --- CONSTANTES DE ESTILO PARA O LAYOUT DA PÁGINA ---
// Estilos para o container principal da página (Header no topo, conteúdo abaixo)
const layoutContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--background)', // Fundo da página (branco ou escuro do globals.css)
};

// Estilos para o layout de duas colunas (formulário e painel lateral)
const twoColumnLayout = {
    display: 'flex',
    flex: 1, // Permite que ocupe o espaço vertical restante
    gap: '30px', // Espaçamento entre as colunas
    padding: '20px',
    maxWidth: '1200px', // Limita a largura total do conteúdo
    margin: '20px auto', // Centraliza o layout
    flexWrap: 'wrap', // Permite que as colunas quebrem linha em telas menores
    alignItems: 'flex-start', // Alinha as colunas ao topo
};

// Estilos para a coluna do formulário (esquerda)
const formColumnStyle = {
    flex: 3, // Ocupa mais espaço que o painel lateral
    minWidth: '500px', // Largura mínima antes de quebrar linha
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Espaçamento entre as seções do formulário
};

// Estilos para a coluna do painel de informações (direita)
const infoPanelColumnStyle = {
    flex: 1, // Ocupa menos espaço
    minWidth: '300px', // Largura mínima do painel
    // Alinhamento vertical para o painel se a coluna for maior que ele
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centraliza horizontalmente o painel dentro da coluna
};

// Estilos para o container dos botões inferiores
const bottomButtonsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', // Espaçamento entre os botões
    marginTop: '40px', // Margem acima dos botões
    paddingBottom: '40px', // Padding abaixo para espaço no final da página
};

const notificationBoxBaseStyle = {
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
};

const successBoxStyle = {
    ...notificationBoxBaseStyle,
    backgroundColor: '#dcfce7',
    color: '#166534',
    border: '1px solid #bbf7d0',
};

const errorBoxStyle = {
    ...notificationBoxBaseStyle,
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: '1px solid #fecaca',
};

// --- DADOS DE EXEMPLO DO PROCESSO (SERIAM CARREGADOS DE UMA API REAL) ---
// Adaptei os dados para o que o ProcessInfoPanel espera
const processData = {
    id: '0001/2025.2',
    title: 'Seleção 2025.2 MODO C - Mestrado',
    duration: '20/06/2025 -> 20/07/2025',
    currentPhase: 'Fase de Inscrição', // Exemplo de fase atual
};

// --- COMPONENTE DA PÁGINA ---
export default function ProcessSignUpPage() {
    const router = useRouter();
    const { uid } = router.query; // Pega o UID da URL, ex: /u/123 -> uid = "123"
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleSubmit = () => {
        setNotification({ message: 'Formulário Submetido com Sucesso!', type: 'success' });

        // Simula o redirecionamento após o usuário ver a mensagem
        setTimeout(() => {
            router.back(); // Volta para a página anterior
        }, 3000); // Atraso de 3 segundos
    };

    const handleCancel = () => {
        router.back(); // Volta para a página anterior
    };

    return (
        <>
            {/* Head para SEO e metadados da página */}
            <Head>
                <title>SUSEL - Inscrição no Processo</title>
                <meta name="description" content="Página de inscrição em processo seletivo no SUSEL" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Container principal da página (Header no topo, Conteúdo abaixo) */}
            <div style={layoutContainerStyle}>
                <Header /> {/* Componente de cabeçalho */}

                {/* Layout de duas colunas */}
                <div style={twoColumnLayout}>
                    {/* Coluna do Formulário (Esquerda) */}
                    <div style={formColumnStyle}>
                        {notification.message && (
                            <div style={notification.type === 'success' ? successBoxStyle : errorBoxStyle}>
                                {notification.message}
                            </div>
                        )}
                        <CandidateDataForm />
                        <AcademicForm />
                        <FileUploader />
                    </div>

                    {/* Coluna do Painel de Informações (Direita) */}
                    <div style={infoPanelColumnStyle}>
                        <ProcessInfoPanel
                            processId={processData.id}
                            title={processData.title}
                            duration={processData.duration}
                            currentPhase={processData.currentPhase}
                            onDetailsClick={() => router.push(`/u/${uid}/process-details`)} // Leva para a tela de detalhes
                        />
                    </div>
                </div>

                {/* Botões Inferiores */}
                <div style={bottomButtonsContainerStyle}>
                    <Button
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: '#12B76A', // Verde
                            color: 'white',
                            padding: '12px 25px',
                            fontSize: '18px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Submeter
                    </Button>
                    <Button
                        onClick={handleCancel}
                        style={{
                            backgroundColor: 'transparent',
                            border: '1px solid var(--azul-primario)', // Borda azul
                            color: 'var(--azul-primario)', // Texto azul
                            padding: '12px 25px',
                            fontSize: '18px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </>
    );
}