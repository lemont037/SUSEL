import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/"><h1>SUSEL</h1></Link>
      <div className={styles.userProfileIcon}></div>
    </header>
  );
}