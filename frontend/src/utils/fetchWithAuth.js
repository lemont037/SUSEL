import Router from "next/router";

export async function fetchWithAuth(url, options) {
    const fetchOptions = {
        ...options,
        credentials: "include",
    };

    let response = await fetch(url, fetchOptions);

    if (response.status === 401) {
        console.log("Token expirado. Tentando gerar novo token...");

        const refreshResponse = await fetch(
            "http://localhost:3001/auth/refresh-token",
            {
                method: "POST",
                credentials: "include",
            }
        );

        if (!refreshResponse.ok) {
            console.log(
                "Falha ao gerar novo token. Redirecionando para login..."
            );
            Router.push("/");
        }

        console.log(
            "Token renovado com sucesso!. Reenviando requisição original."
        );
        response = await fetch(url, fetchOptions);
    }

    return response;
}
