// src/components/CandidateDataForm.jsx
import React, { useState } from 'react';
import styles from '../styles/CandidateDataForm.module.css'; // Importa o CSS Module
import InputField from './InputField'; // Reutiliza o componente InputField
import SectionCard from './SectionCard'; // Reutiliza SectionCard como um container, se desejar


// O componente agora recebe 'formData' e 'setFormData' como props
export default function CandidateDataForm({ formData, setFormData }) {
    
    // Função para atualizar o estado no componente pai
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <SectionCard title="Dados do Candidato">
            {/* Identificação */}
            <div className={styles.formSection}>
                <h3 className={styles.subSectionTitle}>Identificação</h3>
                <div className={styles.inputGrid}>
                    {/* O 'name' do input deve ser igual à chave no estado */}
                    <InputField label="Nome Completo" name="name" type="text" value={formData.name} onChange={handleChange} />
                    <InputField label="CPF" name="cpf" type="text" value={formData.cpf} onChange={handleChange} />
                    <InputField label="RG" name="rg" type="text" value={formData.rg} onChange={handleChange} />
                    <InputField label="Gênero" name="gender" type="text" value={formData.gender} onChange={handleChange} />
                </div>
            </div>
            {/* Contato */}
            <div className={styles.formSection}>
                <h3 className={styles.subSectionTitle}>Contato</h3>
                <div className={styles.inputGrid}>
                    <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    <InputField label="Telefone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                </div>
            </div>
            {/* Endereço */}
            <div className={styles.formSection}>
                <h3 className={styles.subSectionTitle}>Endereço</h3>
                <div className={styles.inputGrid}>
                    <InputField label="CEP" name="cep" type="text" value={formData.cep} onChange={handleChange} />
                    <InputField label="Rua" name="street" type="text" value={formData.street} onChange={handleChange} />
                    <InputField label="Número" name="number" type="text" value={formData.number} onChange={handleChange} />
                    <InputField label="Complemento" name="complement" type="text" value={formData.complement} onChange={handleChange} />
                    <InputField label="Bairro" name="neighborhood" type="text" value={formData.neighborhood} onChange={handleChange} />
                    <InputField label="Cidade" name="city" type="text" value={formData.city} onChange={handleChange} />
                </div>
            </div>
        </SectionCard>
    );
}
