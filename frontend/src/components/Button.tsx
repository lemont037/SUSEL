import styles from '../styles/Button.module.css';
import React from 'react';

// Definimos os tipos de "props" que nosso botão aceita
type ButtonProps = {
  children: React.ReactNode; // O texto ou ícone dentro do botão
  onClick?: () => void; // Uma função para ser chamada no clique
  variant?: 'primary' | 'secondary'; // Nossos dois estilos de botão
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({ children, onClick, variant = 'primary', type = 'button' }: ButtonProps) {
  // Combina a classe base com a classe da variante
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}