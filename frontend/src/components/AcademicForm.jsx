import React, { useState } from 'react';
import styles from '../styles/AcademicForm.module.css';
import SectionCard from './SectionCard'; // Reutiliza SectionCard como container principal
import InputField from './InputField'; // Reutiliza InputField
import RadioButtonGroup from './RadioButtonGroup'; // Reutiliza RadioButtonGroup

export default function AcademicForm() {
    // Estados para os campos do formulário acadêmico
    const [titulacao, setTitulacao] = useState('');
    const [instituicaoEmissora, setInstituicaoEmissora] = useState('');
    const [linhaPesquisa, setLinhaPesquisa] = useState('');

    // Opções para o RadioButtonGroup de Titulação
    const titulacaoOptions = [
        { label: 'Tecnólogo', value: 'tecnologo' },
        { label: 'Bacharel', value: 'bacharel' },
        { label: 'Licenciado', value: 'licenciado' },
        { label: 'Mestre', value: 'mestre' },
        { label: 'Doutor', value: 'doutor' },
    ];

    // Opções para o RadioButtonGroup de Linha de Pesquisa
    const linhaPesquisaOptions = [
        { label: 'Segurança Computacional', value: 'seguranca_computacional' },
        { label: 'Engenharia de Software', value: 'engenharia_software' },
        { label: 'Banco de Dados', value: 'banco_dados' },
        { label: 'Computação Gráfica', value: 'computacao_grafica' },
    ];

    return (
        <SectionCard title="Formulário"> {/* SectionCard como container da seção "Formulário" */}
            <div className={styles.formContentContainer}>
                {/* Seção: Titulação do Candidato */}
                <RadioButtonGroup
                    label="Titulação do Candidato"
                    name="titulacao"
                    options={titulacaoOptions}
                    selectedValue={titulacao}
                    onChange={(e) => setTitulacao(e.target.value)}
                />

                {/* Seção: Instituição emissora da última Titulação */}
                <div className={styles.inputFieldContainer}>
                    <InputField
                        label="Instituição emissora da última Titulação"
                        type="text"
                        value={instituicaoEmissora}
                        onChange={(e) => setInstituicaoEmissora(e.target.value)}
                    />
                </div>

                {/* Seção: Linha de pesquisa desejada */}
                <RadioButtonGroup
                    label="Linha de pesquisa desejada"
                    name="linhaPesquisa"
                    options={linhaPesquisaOptions}
                    selectedValue={linhaPesquisa}
                    onChange={(e) => setLinhaPesquisa(e.target.value)}
                />
            </div>
        </SectionCard>
    );
}