// src/pages/user/index.jsx

import React from 'react';
import Head from 'next/head';

// Importa os componentes diretamente
import Header from '../../components/Header'; // O componente Header (seu cabeçalho adaptado)
import Sidebar from '../../components/Sidebar'; // O componente Sidebar
import ProcessListItem from '../../components/ProcessListItem'; // O componente de item da lista

// Estilos para o layout geral (movidos de UserLayout.jsx)
const layoutContainerStyle = {
  display: 'flex',
  flexDirection: 'column', // Faz com que o Header fique em cima e o resto embaixo
  minHeight: '100vh', // Garante que o layout ocupe a altura total da viewport
  backgroundColor: 'var(--background)', // Fundo claro ou escuro global
};

// Estilos para a área de conteúdo (sidebar + conteúdo principal)
const contentAreaStyle = {
  display: 'flex',
  flex: 1, // Faz com que ocupe o espaço restante verticalmente
};

// Estilos para o conteúdo principal da página
const mainContentStyle = {
  flex: 1, // Faz com que ocupe o espaço restante horizontalmente
  padding: '20px',
  overflowY: 'auto', // Adiciona scroll se o conteúdo principal for muito grande
};


// Estilos para o título da lista (já estavam aqui)
const pageTitleStyle = {
  fontSize: '28px',
  marginBottom: '20px',
  color: 'var(--foreground)', // Ou 'white', dependendo da sua última escolha
};

const processListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

export default function UserHome() {
  return (
    <>
      <Head>
        <title>SUSEL - Dashboard do Usuário</title>
        <meta name="description" content="Dashboard principal do usuário no SUSEL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* AQUI ESTÁ A ESTRUTURA DO LAYOUT AGORA */}
      <div style={layoutContainerStyle}>
        <Header /> {/* O Header */}
        <div style={contentAreaStyle}>
          <Sidebar /> {/* A Sidebar */}
          <main style={mainContentStyle}>
            {/* Conteúdo específico da página (Lista de Processos) */}
            <h1 style={pageTitleStyle}>Lista de Processos</h1>

            <div style={processListStyle}>
              <ProcessListItem title="Submissão 1" />
              <ProcessListItem title="Submissão 2" />
              <ProcessListItem title="Submissão 3" />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}