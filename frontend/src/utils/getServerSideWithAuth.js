
export async function getServerSideWithAuth(context, url, options = {}) {
    const cookie = context.req.headers.cookie || "";

    const fetchOptions = {
        ...options,
        credentials: "include",
        headers: {
            Cookie: options.headers?.Cookie || cookie,
            ...(options.headers || {}),
            "Content-Type": "application/json",
        },
    };
    
    let response = await fetch(url, fetchOptions)

    if ( response.status === 401) {
        console.log("Acesso não autorizado ou token não válido. Fazendo requisição para um novo token...")
        const refreshResponse = await fetch("http://localhost:3001/auth/refresh-token",
            {
                method: "POST",
                headers: {
                    Cookie: cookie,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!refreshResponse.ok) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        const setCookieHeader = refreshResponse.headers.get("set-cookie");

        if (setCookieHeader) {
            fetchOptions.headers.Cookie = setCookieHeader;
        }

        response = await fetch(url, fetchOptions)
    }

    if ( response.status === 403 ) {
        console.log("Redirecionando para Unauthorized...")
        return {
            redirect: {
                destination: "/unauthorized",
                permanent: false
            }
        }
    }

    return response
}