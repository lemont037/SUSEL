import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header({ uid }) {
    return (
        <header className={styles.header}>
            <Link href={`/u/${uid}`}>
                <h1>SUSEL</h1>
            </Link>
            <Link href={`/u/${uid}/config`}>
                <div className={styles.userProfileIcon}></div>
            </Link>
        </header>
    );
}
