import React, { useState } from 'react'; 
import Head from 'next/head';
import { useRouter } from 'next/router'; 
import Header from '../../../components/Header'; 
import SettingsSidebar from '../../../components/SettingSidebar';
import UserProfileForm from '../../../components/UserProfileForm';
import layoutStyles from '../../../styles/UserIndex.module.css';

// --- FUNÇÃO PARA BUSCAR DADOS DO USUÁRIO NO SERVIDOR (getServerSideProps) ---
export async function getServerSideProps(context) {
    const { uid } = context.params;

    // --- DADOS MOCKADOS PARA VISUALIZAÇÃO DO FRONTEND ---
    const mockUser = {
        _id: uid, // Usa o UID real da URL
        name: "Nome e Sobrenome Exemplo",
        email: "exemplo@email.com",
        phone: "+55 (11) 99999-9999",
        birthDate: "15/05/1990", 
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

    const [notification, setNotification] = useState({ message: '', type: '' });

    // Função para lidar com o salvamento dos dados do perfil
    const handleSaveUserProfile = (updatedUser) => {
        console.log('SIMULAÇÃO: Dados do usuário a serem salvos:', updatedUser);
        setNotification({ message: 'Dados salvos com sucesso!', type: 'success' });

        // Remove a notificação após alguns segundos
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000); // A mensagem some após 3 segundos
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
                        {notification.message && (
                            <div className={notification.type === 'success' ? layoutStyles.successBox : layoutStyles.errorBox}>
                                {notification.message}
                            </div>
                        )}
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