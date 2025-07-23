import styles from '../styles/Button.module.css';
import React from 'react';


type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({ children, onClick, variant = 'primary', type = 'button' }: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}