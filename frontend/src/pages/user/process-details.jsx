// src/pages/user/process-details.jsx

import React from 'react';
import Head from 'next/head';

// --- IMPORTAÇÕES DE COMPONENTES ---
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import SectionCard from '../../components/SectionCard';
import PhaseItem from '../../components/PhaseItem';
import AttachmentDisplayItem from '../../components/AttachmentDisplayItem'; // Atualizado: usando este para anexos

// --- CONSTANTES DE ESTILO (DEFINIDAS AQUI PARA SEREM ACESSÍVEIS) ---

const layoutContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
};

const mainContentStyle = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: 'white',
    maxWidth: '900px',
    margin: '20px auto',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

const pageTitleStyle = {
    fontSize: '28px',
    marginBottom: '20px',
    color: 'var(--azul-primario)',
    textAlign: 'center',
};

const sectionTitleStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: 'var(--azul-primario)',
};

const detailItemStyle = {
    marginBottom: '8px',
    fontSize: '16px',
    color: 'var(--foreground)',
};

const blueBoxStyle = {
    backgroundColor: 'var(--azul-secundario)',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
};

const blueBoxTextStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: 'var(--azul-primario)',
};

const blueBoxSmallTextStyle = {
    fontSize: '17px',
    marginBottom: '3px',
};

const buttonRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    color: '#12B76A',
};

// --- DADOS DE EXEMPLO ---
const process = {
    id: '0001/2025.2',
    title: 'Seleção 2025.2 MODO C - Mestrado',
    duration: '20/06/2025 -> 20/07/2025',
    editais: [{ name: 'Edital_0001_2025.pdf', url: '/caminho/do/edital.pdf', type: 'pdf' }],
    phases: [
        {
            id: '1',
            title: 'Fase 1',
            description: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
            endDate: '01/07/2025',
        },
    ],
    attachments: [
        { name: 'Modelo de Declaração de Residência', url: '/caminho/do/modelo.pdf', type: 'pdf' },
        { name: 'Formulário de Inscrição.pdf', url: '/caminho/do/formulario.pdf', type: 'pdf' },
    ],
};

// --- COMPONENTE DA PÁGINA ---
export default function ProcessDetailsPage() {
    return (
        <>
            <Head>
                <title>SUSEL - Detalhes do Processo</title>
                <meta name="description" content="Detalhes de um processo seletivo no SUSEL" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div style={layoutContainerStyle}>
                <Header />

                <main style={mainContentStyle}>
                    <h1 style={pageTitleStyle}>Processo Seletivo 01</h1>

                    <SectionCard title="Dados gerais">
                        <div style={blueBoxStyle}>
                            <div style={{ flex: 1, minWidth: '250px' }}>
                                <p style={blueBoxTextStyle}>Processo {process.id}</p>
                                <br />
                                <p style={blueBoxSmallTextStyle}>Título: {process.title}</p>
                                <br />
                                <p style={blueBoxSmallTextStyle}>Duração: {process.duration}</p>
                            </div>
                            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <p style={{ ...blueBoxSmallTextStyle, textAlign: 'right', marginBottom: '10px', color: 'white' }}>
                                    <strong>Arquivo Edital:</strong>
                                </p>
                                {process.editais.map((edital, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => window.open(edital.url, '_blank')}
                                        style={{
                                            backgroundColor: 'var(--azul-primario)',
                                            color: 'white',
                                            padding: '8px 12px',
                                            fontSize: '14px',
                                            borderRadius: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        <span style={{ fontSize: '16px', color: 'white' }}>&#x1F4C4;</span>
                                        {edital.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard title="Fases do Processo">
                        <div style={{ borderBottom: '1px solid var(--azul-secundario)', marginBottom: '20px' }}></div>
                        {process.phases.map((phase) => (
                            <PhaseItem
                                key={phase.id}
                                phaseNumber={phase.id}
                                title={phase.title}
                                description={phase.description}
                                endDate={phase.endDate}
                            />
                        ))}
                    </SectionCard>

                    {/* Seção: Anexos - ATUALIZADO */}
                    <SectionCard title="Anexos">
                        {process.attachments.map((attachment, index) => (
                            <AttachmentDisplayItem
                                key={index}
                                fileName={attachment.name}
                                fileType={attachment.type}
                                fileUrl={attachment.url}
                                onDelete={() => alert(`Deletar anexo: ${attachment.name}`)}
                            />
                        ))}
                    </SectionCard>

                    <div style={buttonRowStyle}>
                        <Button
                            onClick={() => {}}
                            style={{
                                backgroundColor: '#12B76A',
                                padding: '12px 25px',
                                fontSize: '18px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                            }}
                        >
                            Fazer Inscrição
                        </Button>
                    </div>
                </main>
            </div>
        </>
    );
}
