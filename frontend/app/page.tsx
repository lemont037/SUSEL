"use client";

import { useState } from 'react';
import styles from './page.module.css';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Card from '../components/Card'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.formSide}>
        {/* Usamos o Card como um "container" */}
        <Card>
          <h2>Login</h2>
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
            <a href="#">Esqueceu sua senha?</a>
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
    </div>
  );
}