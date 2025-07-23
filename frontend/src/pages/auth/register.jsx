import Head from "next/head";
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Register.module.css'; 
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
  const [error, setError] = useState('');

  const [validationState, setValidationState] = useState({
      minLength: false,
      hasNumber: false,
      hasSpecialChar: false,
  });

  useEffect(() => {
      const minLength = password.length >= 6;
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      setValidationState({ minLength, hasNumber, hasSpecialChar });
  }, [password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
                setError('As senhas não coincidem');
        return;
    }

    if (!validationState.minLength || !validationState.hasNumber || !validationState.hasSpecialChar) {
        setError('A senha não atende a todos os critérios de segurança');
        return;
    }

    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, cpf, email, phone, isWhatsapp, password }),
        credentials: "include"
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário');
      }

      const data = await response.json();
      console.log('Usuário cadastrado com sucesso:', data);

      Router.push('/'); // Redireciona para a página de login após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setError(error.message || 'Ocorreu um erro inesperado');
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

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
        {error && <div className={styles.errorBox}>{error}</div>}  
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
        <div className={styles.criteriaBox}>
            <ul>
                <li className={validationState.minLength ? styles.valid : ''}>Mínimo de 6 caracteres</li>
                <li className={validationState.hasNumber ? styles.valid : ''}>Conter 1 número</li>
                <li className={validationState.hasSpecialChar ? styles.valid : ''}>Conter 1 caractere especial</li>
            </ul>
        </div>
        <InputField label="Confirme a sua senha" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        

        <div className={styles.actionButtons}>
          <Button variant="primary" onClick={handleRegister}>Cadastrar</Button>
          <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
        </div>
      </div>
    </main>
    </>
  );
}