// frontend/src/pages/u/[uid]/config.jsx

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'; // Para navegação após salvar, se quiser
// --- IMPORTAÇÕES DE COMPONENTES ---
import Header from '../../../components/Header'; // Componente de Cabeçalho
import SettingsSidebar from '../../../components/SettingSidebar'; // A barra lateral de configurações
import UserProfileForm from '../../../components/UserProfileForm'; // O formulário de perfil que acabamos de criar

// Importa os estilos de layout que já existem em UserIndex.module.css (usados em delete-account.jsx)
import layoutStyles from '../../../styles/UserIndex.module.css';

// --- FUNÇÃO PARA BUSCAR DADOS DO USUÁRIO NO SERVIDOR (getServerSideProps) ---
// Com dados mockados para visualização do frontend
export async function getServerSideProps(context) {
    const { uid } = context.params;

    // --- DADOS MOCKADOS PARA VISUALIZAÇÃO DO FRONTEND ---
    const mockUser = {
        _id: uid, // Usa o UID real da URL
        name: "Nome e Sobrenome Exemplo",
        email: "exemplo@email.com",
        phone: "+55 (11) 99999-9999",
        birthDate: "15/05/1990", // dd/mm/aaaa
        cpf: "123.456.789-00",
        avatarUrl: "/icon-login.png"
    };

    return {
        props: { user: mockUser }, // Retorna os dados mockados como prop
    };

    // --- CÓDIGO DA QUE SERIA DA REQUISIÇÃO REAL ---
    /*
    try {
        const response = await fetch(`http://localhost:3001/u/${uid}/config`); 
        const user = await response.json();

        if (!response.ok || !user) {
            console.error(`Erro: Usuário com UID ${uid} não encontrado ou erro na API.`);
            return {
                notFound: true, // Retorna 404 se o usuário não for encontrado
            };
        }
        return {
            props: { user }, // Retorna os dados reais como prop
        };
    } catch (error) {
        console.error("Erro ao buscar dados do usuário em getServerSideProps:", error);
        return {
            notFound: true, // Retorna 404 em caso de erro na conexão/fetch
        };
    }
    */
}

// --- COMPONENTE DA PÁGINA ---
export default function UserConfigPage({ user }) {
    const router = useRouter();
    // const { uid } = router.query; // uid já vem em user._id, se você precisar

    // Função para lidar com o salvamento dos dados do perfil
    const handleSaveUserProfile = (updatedUser) => {
        console.log('SIMULAÇÃO: Dados do usuário a serem salvos:', updatedUser);
        alert('SIMULAÇÃO: Dados salvos com sucesso!');
        // AQUI você faria a requisição REAL para o seu backend (PATCH/PUT)
        // Exemplo: fetch(`http://localhost:3001/u/${updatedUser._id}/config`, { method: 'PATCH', body: JSON.stringify(updatedUser), headers: { 'Content-Type': 'application/json' }});
    };

    // NENHUM 'if (!user)' É NECESSÁRIO AQUI, pois user sempre virá mockado ou do SSR.

    return (
        <>
            {/* Head para SEO e metadados da página */}
            <Head>
                <title>SUSEL - Configurações do Usuário</title>
                <meta name="description" content="Página de configurações e edição de perfil do usuário" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Container principal do layout (usa estilos de UserIndex.module.css) */}
            <div className={layoutStyles.layoutContainer}>
                <Header /> {/* Componente de cabeçalho */}

                {/* Área de conteúdo (Sidebar + Main Content) */}
                <div className={layoutStyles.contentArea}>
                    <SettingsSidebar /> {/* Barra lateral de configurações */}

                    {/* Área de conteúdo principal */}
                    <main className={layoutStyles.mainContent}>
                        {/* O UserProfileForm abrange todo o conteúdo da direita */}
                        <UserProfileForm
                            user={user} // Passa os dados do usuário (mockados ou reais)
                            onSave={handleSaveUserProfile} // Passa a função de salvar
                        />
                    </main>
                </div>
            </div>
        </>
    );
}