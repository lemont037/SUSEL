
import Head from "next/head";
import { useState } from 'react';
import Link from 'next/link'; 
import styles from '../../styles/Login.module.css'; 
import customStyles from '../../styles/ForgotPassword.module.css'; 
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Card from '../../components/Card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  return (
    <>
      <Head>
        <title>SUSEL - Redefinir Senha</title>
        <meta name="description" content="Página para redefinição de senha do SUSEL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.loginPageContainer}>
        <div className={styles.formSide}>
          <h2 className={styles.loginTitle}>Redefinir senha</h2>
          <Card>
            <p className={customStyles.instructions}>
              Informe seu email cadastrado, para envio do código de verificação.
            </p>
            <form>
              <InputField
                label="Email:"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="primary">
                Enviar
              </Button>
            </form>
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