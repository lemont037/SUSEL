import React from 'react';
import styles from '../styles/AcademicForm.module.css';
import SectionCard from './SectionCard';
import InputField from './InputField';
import RadioButtonGroup from './RadioButtonGroup';

export default function AcademicForm({ formData, setFormData }) {
    // A função genérica para atualizar o estado no componente pai
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // As opções para os botões de rádio continuam as mesmas
    const titulacaoOptions = [
        { label: 'Tecnólogo', value: 'tecnologo' },
        { label: 'Bacharel', value: 'bacharel' },
        { label: 'Licenciado', value: 'licenciado' },
        { label: 'Mestre', value: 'mestre' },
        { label: 'Doutor', value: 'doutor' },
    ];

    const linhaPesquisaOptions = [
        { label: 'Segurança Computacional', value: 'seguranca_computacional' },
        { label: 'Engenharia de Software', value: 'engenharia_software' },
        { label: 'Banco de Dados', value: 'banco_dados' },
        { label: 'Computação Gráfica', value: 'computacao_grafica' },
    ];

    return (
        <SectionCard title="Formulário">
            <div className={styles.formContentContainer}>
                {/* Seção: Titulação do Candidato */}
                <RadioButtonGroup
                    label="Titulação do Candidato"
                    name="titulacao"
                    options={titulacaoOptions}
                    // CORREÇÃO: Lê o valor de 'formData'
                    selectedValue={formData.titulacao} 
                    // CORREÇÃO: Usa a função genérica 'handleChange'
                    onChange={handleChange} 
                />

                {/* Seção: Instituição emissora da última Titulação */}
                <div className={styles.inputFieldContainer}>
                    <InputField
                        label="Instituição emissora da última Titulação"
                        // CORREÇÃO: Adiciona o 'name' para o handleChange funcionar
                        name="instituicaoEmissora"
                        type="text"
                        // CORREÇÃO: Lê o valor de 'formData'
                        value={formData.instituicaoEmissora}
                        // CORREÇÃO: Usa a função genérica 'handleChange'
                        onChange={handleChange}
                    />
                </div>

                {/* Seção: Linha de pesquisa desejada */}
                <RadioButtonGroup
                    label="Linha de pesquisa desejada"
                    name="linhaPesquisa"
                    options={linhaPesquisaOptions}
                    // CORREÇÃO: Lê o valor de 'formData'
                    selectedValue={formData.linhaPesquisa}
                    // CORREÇÃO: Usa a função genérica 'handleChange'
                    onChange={handleChange}
                />
            </div>
        </SectionCard>
    );
}