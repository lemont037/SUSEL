import Head from "next/head";
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Register.module.css'; // Usaremos um novo arquivo de estilo
import InputField from '../../components/InputField';
import Button from '../../components/Button';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <>
      <Head>
        <title>SUSEL - Cadastro</title>
        <meta name="description" content="Página de cadastro de usuário no SUSEL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.registerPageContainer}>
      <div className={styles.header}>
        <Link href="/">
          <h1 className={styles.logo}>SUSEL</h1>
        </Link>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formGrid}>
          <InputField label="Nome" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <InputField label="CPF" type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          <InputField label="Email" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className={styles.phoneContainer}>
            <InputField label="Telefone" type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <div className={styles.whatsappCheckbox}>
              <input type="checkbox" id="isWhatsapp" checked={isWhatsapp} onChange={(e) => setIsWhatsapp(e.target.checked)} />
              <label htmlFor="isWhatsapp">WhatsApp</label>
            </div>
          </div>
        </div>
          
        <InputField label="Senha" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <InputField label="Confirme a sua senha" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        

        <div className={styles.actionButtons}>
          <Button variant="primary">Cadastrar</Button>
          <Button variant="secondary">Cancelar</Button>
        </div>
      </div>
    </main>
    </>
  );
}