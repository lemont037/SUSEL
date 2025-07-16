import Head from "next/head";
import { useState, useEffect } from 'react';
import styles from '../../styles/Login.module.css'; // Reutilizamos o layout principal
import customStyles from '../../styles/NewPassword.module.css'; // Estilos específicos para esta página
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import Card from '../../components/Card';

export default function NewPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [validationState, setValidationState] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });

  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const minLength = newPassword.length >= 6;
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const passwordsMatch = newPassword && newPassword === confirmPassword;
    setValidationState({ minLength, hasNumber, hasSpecialChar, passwordsMatch });
  }, [newPassword, confirmPassword]);

  // Função para lidar com a submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento padrão da página

    // Verifica se todos os critérios são verdadeiros
    const { minLength, hasNumber, hasSpecialChar, passwordsMatch } = validationState;

    if (!passwordsMatch) {
      setSubmitError('Erro ao redefinir: As senhas não coincidem');
      return; // Para a execução
    }

    if (!minLength || !hasNumber || !hasSpecialChar) {
      setSubmitError('Erro ao redefinir: A senha não atende a todos os critérios');
      return; // Para a execução
    }

    // Se tudo estiver certo:
    setSubmitError(''); // Limpa qualquer erro anterior
    alert('Senha redefinida com sucesso! (simulação)'); // Simula uma submissão bem-sucedida
    // Aqui você enviaria os dados para o backend no futuro
  };

  return (
    <>
      <Head>
        <title>SUSEL - Nova Senha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.loginPageContainer}>
        <div className={styles.formSide}>
          <h2 className={styles.loginTitle}>Redefinir senha</h2>
          <Card>
            {submitError && (
              <div className={customStyles.errorBox}>
                {submitError}
              </div>
            )}

            <div className={customStyles.criteriaBox}>
              <p className={customStyles.criteriaTitle}>Critérios:</p>
              <ul>
                {/* Adicionamos classes dinâmicas baseadas no estado da validação */}
                <li className={validationState.minLength ? customStyles.valid : ''}>
                  Mínimo de 6 caracteres
                </li>
                <li className={validationState.hasNumber ? customStyles.valid : ''}>
                  Conter 1 número
                </li>
                <li className={validationState.hasSpecialChar ? customStyles.valid : ''}>
                  Conter 1 caractere especial
                </li>
              </ul>
            </div>
            
            <form onSubmit={handleSubmit}>
              <InputField
                label="Nova Senha"
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputField
                label="Confirmar Senha"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={confirmPassword && !validationState.passwordsMatch ? customStyles.mismatch : ''}
              />
              <Button type="submit" variant="primary">
                Confirmar
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