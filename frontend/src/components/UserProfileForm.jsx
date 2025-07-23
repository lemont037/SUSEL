import React, { useState, useEffect } from 'react';
import styles from '../styles/UserProfileForm.module.css';
import EditableInfoField from './EditableInfoField'; // Reutiliza EditableInfoField
import UserAvatar from './UserAvatar'; // Reutiliza UserAvatar
import Button from './Button'; // Reutiliza Button

export default function UserProfileForm({ user, onSave }) {
    // Estados para os campos do usuário (com valores iniciais do prop 'user')
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [birthDate, setBirthDate] = useState(user?.birthDate || ''); // Formato dd/mm/aaaa
    const [cpf, setCpf] = useState(user?.cpf || '');
    const [avatarSrc, setAvatarSrc] = useState(user?.avatarUrl || '');

    // Lógica para preencher os campos se os dados do usuário mudarem
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setBirthDate(user.birthDate || '');
            setCpf(user.cpf || '');
            setAvatarSrc(user.avatarUrl || '');
        }
    }, [user]);

    const handleSave = () => {
        const updatedUser = {
            ...user, // Mantém outras propriedades do usuário
            name,
            email,
            phone,
            birthDate,
            cpf,
            avatarSrc,
        };
        onSave(updatedUser); // Chama a função onSave passada como prop
    };

    // Exemplo de função para edição (por enquanto, apenas um alerta)
    const handleEdit = (field) => {
        alert(`Clicou em editar o campo: ${field}`);
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Edite seu Cadastro!</h1>

            <div className={styles.contentColumns}>
                {/* Coluna dos Campos do Formulário */}
                <div className={styles.formFieldsColumn}>
                    <EditableInfoField
                        label="Nome:"
                        value={name}
                        onEditClick={() => handleEdit('Nome')}
                    />
                    <EditableInfoField
                        label="Email:"
                        value={email}
                        onEditClick={() => handleEdit('Email')}
                    />
                    <EditableInfoField
                        label="Telefone:"
                        value={phone}
                        onEditClick={() => handleEdit('Telefone')}
                    />
                    <EditableInfoField
                        label="Data de nascimento:"
                        value={birthDate}
                        onEditClick={() => handleEdit('Data de nascimento')}
                    />
                    <EditableInfoField
                        label="CPF:"
                        value={cpf}
                        onEditClick={() => handleEdit('CPF')}
                    />
                </div>

                {/* Coluna do Avatar */}
                <div className={styles.avatarColumn}>
                    <UserAvatar src={avatarSrc} />
                </div>
            </div>

            {/* Botão Salvar */}
            <div className={styles.saveButtonContainer}>
                <Button
                    onClick={handleSave}
                    style={{
                        backgroundColor: 'var(--azul-primario)',
                        color: 'white',
                        padding: '12px 30px',
                        fontSize: '18px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                    }}
                >
                    Salvar
                </Button>
            </div>
        </div>
    );
}