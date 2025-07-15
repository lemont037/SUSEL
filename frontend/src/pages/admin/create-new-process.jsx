import Head from "next/head";
import { useState } from 'react';
import styles from '../../styles/CreateProcess.module.css';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import PhaseCard from '../../components/PhaseCard';
import AttachmentItem from '../../components/AttachmentItem';

// Placeholder para um futuro componente de Upload de Arquivo
const FileUpload = () => (
  <div className={styles.fileUploadBox}>
    <p>Selecione o Arquivo</p>
  </div>
);

export default function CreateNewProcessPage() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const [phases, setPhases] = useState([
    { id: 1 } // Começamos com uma fase
  ]);

  const handleAddPhase = () => {
    setPhases([...phases, { id: phases.length + 1 }]);
  };

  const [attachments, setAttachments] = useState([
    // Começamos com um item de exemplo
    { id: 1, title: 'Modelo de Declaração de Residência', type: 'pdf' }
  ]);

  const handleAddAttachment = () => {
    const newId = attachments.length > 0 ? Math.max(...attachments.map(a => a.id)) + 1 : 1;
    const newAttachment = {
      id: newId,
      title: `Novo Anexo ${newId}`,
      type: 'pdf'
    };
    setAttachments([...attachments, newAttachment]);
  };

  const handleDeleteAttachment = (idToDelete) => {
    setAttachments(attachments.filter(attachment => attachment.id !== idToDelete));
  };

  return (
    <>
      <Head>
        <title>SUSEL - Criar Processo Seletivo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.adminContainer}>
        {/* Header (podemos componentizar depois) */}
        <header className={styles.header}>
          <h1>SUSEL</h1>
          <div className={styles.userProfile}></div>
        </header>

        <main className={styles.content}>
          <h2 className={styles.pageTitle}>Criação Processo Seletivo</h2>

          {/* Seção Dados Gerais */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Dados gerais</h3>
            <div className={styles.sectionContent}>
              <div className={styles.generalDataGrid}>
                <div className={styles.generalDataInputs}>
                  <InputField label="Título" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <InputField label="Código do Edital" id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                  <div className={styles.textAreaWrapper}>
                    <label htmlFor="description">Descrição do Processo</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5}></textarea>
                  </div>
                </div>
                <div className={styles.fileUploadWrapper}>
                    <label>PDF do Edital</label>
                    <FileUpload />
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Fases do Processo</h3>
            {phases.map((phase) => (
              <PhaseCard key={phase.id} phaseNumber={phase.id} />
            ))}
            <button className={styles.addButton} onClick={handleAddPhase}>+</button>
          </section>

           <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Anexos</h3>
                <div className={styles.attachmentsList}>
                    {attachments.map((attachment) => (
                    <AttachmentItem
                        key={attachment.id}
                        attachment={attachment}
                        onDelete={() => handleDeleteAttachment(attachment.id)}
                    />
                    ))}
                </div>
                <button className={styles.addButton} onClick={handleAddAttachment}>+</button>
            </section>

          {/* Botões de Ação */}
          <div className={styles.actionButtons}>
            <Button variant="primary">Criar</Button>
            <Button variant="secondary">Salvar Rascunho</Button>
          </div>
        </main>
      </div>
    </>
  );
}