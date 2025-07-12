// Em frontend/components/Card.tsx
import styles from './Card.module.css';

// A única prop que ele precisa é 'children'
type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  // O componente é basicamente um 'div' com um estilo específico
  // que renderiza qualquer "filho" que for passado para ele.
  return <div className={styles.card}>{children}</div>;
}