// src/components/CandidateDataForm.jsx
import React, { useState } from 'react';
import styles from '../styles/CandidateDataForm.module.css'; // Importa o CSS Module
import InputField from './InputField'; // Reutiliza o componente InputField
import SectionCard from './SectionCard'; // Reutiliza SectionCard como um container, se desejar

export default function CandidateDataForm() {
    // Estados para os campos de identificação
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [gender, setGender] = useState('');

    // Estados para os campos de contato
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Estados para os campos de endereço
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');

    return (
        // Reutilizando SectionCard como container principal da seção "Dados do Candidato"
        <SectionCard title="Dados do Candidato">
            {/* Sub-seção: Identificação */}
            <div className={styles.formSection}>
                <h3 className={styles.subSectionTitle}>Identificação</h3>
                <div className={styles.inputGrid}>
                    <InputField label="Nome Completo" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <InputField label="CPF" type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    <InputField label="RG" type="text" value={rg} onChange={(e) => setRg(e.target.value)} />
                    <InputField label="Gênero" type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                </div>
            </div>

            {/* Sub-seção: Contato */}
            <div className={styles.formSection}>
                <h3 className={styles.subSectionTitle}>Contato</h3>
                <div className={styles.inputGrid}>
                    <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputField label="Telefone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
            </div>

            {/* Sub-seção: Endereço */}
            <div className={styles.formSection}>
                <h3 className={styles.subSectionTitle}>Endereço</h3>
                <div className={styles.inputGrid}>
                    <InputField label="CEP" type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
                    <InputField label="Endereço" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <InputField label="Nº" type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
                    <InputField label="Complemento" type="text" value={complement} onChange={(e) => setComplement(e.target.value)} />
                    <InputField label="Bairro" type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                    <InputField label="Cidade" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
            </div>
        </SectionCard>
    );
}