import "../styles/globals.css";
import Layout from '../components/Layout';

// A função App recebe a prop 'router' além de Component e pageProps
export default function App({ Component, pageProps, router }) {
  // Lógica para verificar se a página atual está dentro de /admin
  if (router.pathname.startsWith('/admin')) {
    // Se for uma página de admin, envolvemos o Componente com o nosso Layout
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }

  // Se não for uma página de admin (ex: tela de login pública), 
  // renderiza a página normalmente, sem o layout da barra lateral.
  return <Component {...pageProps} />;
}