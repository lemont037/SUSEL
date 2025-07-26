import React, { useState, useEffect } from "react";
import styles from "../styles/UserProfileForm.module.css";
import EditableInfoField from "./EditableInfoField";
import UserAvatar from "./UserAvatar";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";

export default function UserProfileForm({ user, onSave }) {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [birthDate, setBirthDate] = useState(
        user?.birthDate ? new Date(user.birthDate) : null
    );
    const [cpf, setCpf] = useState(user?.cpf || "");
    const [avatarSrc, setAvatarSrc] = useState(user?.avatarUrl || "");
    const [formMessage, setFormMessage] = useState("");

    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
            setBirthDate(user.birthDate ? new Date(user.birthDate) : null);
            setCpf(user.cpf || "");
            setAvatarSrc(user.avatarUrl || "");
        }
    }, [user]);

    const handleSave = async () => {
        const updatedUser = {
            ...user,
            name,
            email,
            phone,
            birthDate: birthDate ? birthDate.toString() : null,
            cpf,
            avatarSrc,
        };
        try {
            await onSave(updatedUser);
        } catch (error) {
            console.error("Erro: ", error)
        }
    };

    const handleEdit = (fieldName) => {
        setEditingField(fieldName);
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.title}>Edite seu Cadastro!</h1>

            <div className={styles.contentColumns}>
                <div className={styles.formFieldsColumn}>
                    <EditableInfoField
                        label="Nome:"
                        value={name}
                        isEditing={editingField === "name"}
                        onEditClick={() => handleEdit("name")}
                        onChange={setName}
                        type="text"
                    />
                    <EditableInfoField
                        label="Email:"
                        value={email}
                        isEditing={editingField === "email"}
                        onEditClick={() => handleEdit("email")}
                        onChange={setEmail}
                        type="text"
                    />
                    <EditableInfoField
                        label="Telefone:"
                        value={phone}
                        isEditing={editingField === "phone"}
                        onEditClick={() => handleEdit("phone")}
                        onChange={setPhone}
                        type="text"
                    />
                    <EditableInfoField
                        label="Data de Nascimento:"
                        value={birthDate}
                        isEditing={editingField === "birthDate"}
                        onEditClick={() => handleEdit("birthDate")}
                        onChange={setPhone}
                        type="date"
                    />
                    <EditableInfoField
                        label="CPF:"
                        value={cpf}
                        isEditing={editingField === "cpf"}
                        onEditClick={() => handleEdit("cpf")}
                        onChange={setCpf}
                        type="text"
                    />
                </div>

                <div className={styles.avatarColumn}>
                    <UserAvatar src={avatarSrc} />
                </div>
            </div>

            <div className={styles.saveButtonContainer}>
                <Button
                    onClick={handleSave}
                    style={{
                        backgroundColor: "var(--azul-primario)",
                        color: "white",
                        padding: "12px 30px",
                        fontSize: "18px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                    }}
                >
                    Salvar
                </Button>
            </div>
        </div>
    );
}
