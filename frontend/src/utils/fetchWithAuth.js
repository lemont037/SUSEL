import Router from "next/router";

// A função deve retornar um objeto com a resposta e os dados
export async function fetchWithAuth(url, options) {
    const fetchOptions = {
        ...options,
        credentials: "include",
        // Adiciona o header Content-Type se estiver a enviar JSON
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        }
    };
    
    // Se o corpo for FormData, o navegador define o Content-Type, então removemo-lo
    if (options.body instanceof FormData) {
        delete fetchOptions.headers['Content-Type'];
    }

    let response = await fetch(url, fetchOptions);

    if (response.status === 401) {
        console.log("Token expirado. A tentar gerar novo token...");

        const refreshResponse = await fetch(
            "http://localhost:3001/auth/refresh-token",
            {
                method: "POST",
                credentials: "include",
            }
        );

        if (!refreshResponse.ok) {
            console.log("Falha ao gerar novo token. A redirecionar para o login...");
            Router.push("/");
            // Retorna um objeto de erro para evitar que o código continue
            return { response: refreshResponse, data: null };
        }

        console.log("Token renovado com sucesso! A reenviar requisição original.");
        response = await fetch(url, fetchOptions);
    }
    
    // Tenta obter os dados da resposta como JSON
    let data = null;
    try {
        data = await response.json();
    } catch (error) {
        // Se a resposta não tiver corpo ou não for JSON, não há problema
        console.log("A resposta não continha um corpo JSON.");
    }

    // A CORREÇÃO PRINCIPAL ESTÁ AQUI:
    // Retornamos um objeto padronizado com a resposta e os dados
    return { response, data };
}