import React from 'react';
import Image from 'next/image';
import styles from '../styles/UserAvatar.module.css';

export default function UserAvatar({ src, alt = "Foto de perfil do usuário", size = 180 }) {
    const iconFallback = '&#x1F464;'; // Ícone de pessoa Unicode

    return (
        <div
            className={styles.avatarContainer}
            style={{ width: size, height: size }} // Permite ajustar o tamanho via prop 'size'
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    width={size}
                    height={size}
                    className={styles.avatarImage}
                />
            ) : (
                <span
                    className={styles.userIcon}
                    dangerouslySetInnerHTML={{ __html: iconFallback }}
                />
            )}
        </div>
    );
}