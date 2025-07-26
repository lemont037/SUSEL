import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Header from "../../../components/Header";
import SettingsSidebar from "../../../components/SettingSidebar";
import UserProfileForm from "../../../components/UserProfileForm";
import layoutStyles from "../../../styles/UserIndex.module.css";
import { getServerSideWithAuth } from "../../../utils/getServerSideWithAuth";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

export async function getServerSideProps(context) {
    const { uid } = context.params;
    console.log(uid);

    try {
        const response = await getServerSideWithAuth(
            context,
            `http://localhost:3001/u/${uid}/config`,
            {
                method: "GET",
            }
        );

        if (response?.redirect?.destination) return response;

        const user = await response.json();

        if (!user)
            return {
                props: {},
            };

        return {
            props: {
                user,
            },
        };
    } catch (error) {
        console.error(
            "Erro ao buscar dados do usuário em getServerSideProps:",
            error
        );
        return {
            props: {},
        };
    }
}

export default function UserConfigPage({ user }) {
    const uid = user._id;

    const [notification, setNotification] = useState({ message: "", type: "" });

    const handleSaveUserProfile = async (updatedUser) => {
        const response = await fetchWithAuth(
            `http://localhost:3001/u/${user._id}/config/edit`,
            {
                method: "PUT",
                body: JSON.stringify(updatedUser),
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            try {
                const error = await response.json();
                setNotification({
                    message: error.message || "Erro ao salvar os dados.",
                    type: "error",
                });
                throw new Error(error.message || "Erro ao salvar os dados.");
            } catch (e) {
                setNotification({
                    message: "Já Existe um usuário com os dados informados. Por favor, certifique que os dados estão corretos.",
                    type: "error",
                });
            }
        } else {
            setNotification({
                message:
                    "Dados salvos com sucesso!",
                type: "success",
            });
        }
    };

    return (
        <>
            <Head>
                <title>SUSEL - Configurações do Usuário</title>
                <meta
                    name="description"
                    content="Página de configurações e edição de perfil do usuário"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={layoutStyles.layoutContainer}>
                <Header uid={uid} />

                <div className={layoutStyles.contentArea}>
                    <SettingsSidebar uid={uid} />{" "}
                    <main className={layoutStyles.mainContent}>
                        {notification.message && (
                            <div
                                className={
                                    notification.type === "success"
                                        ? layoutStyles.successBox
                                        : layoutStyles.errorBox
                                }
                            >
                                {notification.message}
                            </div>
                        )}

                        <UserProfileForm
                            user={user}
                            onSave={handleSaveUserProfile}
                        />
                    </main>
                </div>
            </div>
        </>
    );
}
