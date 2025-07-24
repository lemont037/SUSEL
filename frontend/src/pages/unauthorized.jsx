import styles from "../styles/Unauthorized.module.css";

export default function Unauthorized() {
    return (
        <div className={styles.main}>
            <h1>Acesso Negado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
        </div>
    );
}
