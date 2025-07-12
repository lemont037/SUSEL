import Head from "next/head"; // <-- Importação do Head que já existia
import { useState } from 'react';
import styles from '../../styles/Login.module.css'; // Verifique se o nome do arquivo CSS está correto
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Card from '../../components/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <> {/* Usamos um Fragment (<>) para agrupar o Head e o div principal */}
      <Head>
        <title>SUSEL - Login</title> {/* Mudei o título para ser mais específico */}
        <meta name="description" content="Sistema Unificado de Seleções" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" /> {/* Corrigi o caminho do ícone */}
      </Head>

      <main className={styles.loginPageContainer}> {/* Usei <main> que é mais semântico */}
        <div className={styles.formSide}>
          <h2 className={styles.loginTitle}>Login</h2>

          <Card>
            <form>
              <InputField
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Senha"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className={styles.forgotPasswordLink}>
                <a href="#">Esqueceu sua senha?</a>
              </div>
              <Button type="submit" variant="primary">
                Entrar
              </Button>
            </form>
            <Button variant="secondary">
              Cadastre-se
            </Button>
          </Card>
        </div>

        <div className={styles.infoSide}>
          <h1>SUSEL</h1>
          <p>Sistema Unificado de Seleções</p>
          <p>Seu sistema de gerência para Processos Seletivos</p>
        </div>
      </main>
    </>
  );
}