export async function getServerSideWithAuth(context, url, options = {}) {
    const cookie = context.req ? context.req.headers.cookie || "" : "";
    let setCookieHeader = null; // Para armazenar o novo cookie, se for gerado

    const fetchOptions = {
        ...options,
        credentials: "include",
        headers: {
            Cookie: cookie,
            ...(options.headers || {}),
            "Content-Type": "application/json",
        },
    };
    
    let response = await fetch(url, fetchOptions);

    // Se o token de acesso expirou (status 401)
    if (response.status === 401) {
        console.log("Token de acesso expirado. A tentar renovar...");
        const refreshResponse = await fetch("http://localhost:3001/auth/refresh-token", {
            method: "POST",
            headers: { Cookie: cookie, "Content-Type": "application/json" }
        });

        if (!refreshResponse.ok) {
            console.log("Falha ao renovar o token. Status da resposta:", refreshResponse.status);
            return {
                redirect: {
                    destination: "/", // Redireciona para a página de login
                    permanent: false
                }
            };
        }

        const newCookieHeader = refreshResponse.headers.get("set-cookie");
        
        console.log("Cabeçalho 'set-cookie' recebido do refresh:", newCookieHeader);

        if (newCookieHeader) {
            console.log("Token renovado com sucesso. A reenviar requisição original.");
            setCookieHeader = newCookieHeader;

            // --- CORREÇÃO APLICADA AQUI ---
            // Em vez de substituir todos os cookies, atualizamos apenas o token de acesso.
            const newCookieValue = newCookieHeader.split(';')[0]; // Pega o novo 'token=...'
            
            // Filtra os cookies antigos para remover o token expirado
            const otherCookies = cookie.split('; ').filter(c => !c.trim().startsWith('token='));
            
            // Junta os cookies antigos (como o refreshToken) com o novo token de acesso
            const updatedCookie = [...otherCookies, newCookieValue].join('; ');

            fetchOptions.headers.Cookie = updatedCookie;
            
            console.log("A usar o cabeçalho de cookie atualizado para a segunda tentativa:", updatedCookie);
        } else {
            console.log("A resposta de renovação não continha o cabeçalho 'set-cookie'. A usar cookies antigos.");
        }

        response = await fetch(url, fetchOptions);
        console.log("Status da segunda tentativa de requisição:", response.status);
    }

    if (response.status === 403) {
        console.log("Acesso negado (403). A redirecionar para /unauthorized.");
        return {
            redirect: {
                destination: "/unauthorized",
                permanent: false
            }
        };
    }

    return { response, setCookieHeader, redirect: null };
}