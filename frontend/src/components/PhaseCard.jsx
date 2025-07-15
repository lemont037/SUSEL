// Em src/components/PhaseCard.jsx
import styles from '../styles/PhaseCard.module.css';
import InputField from './InputField';
import Button from './Button';

// Placeholder para um futuro componente de Calendário
const Calendar = () => <div className={styles.calendarPlaceholder}></div>;

export default function PhaseCard({ phaseNumber }) {
  return (
    <div className={styles.phaseCard}>
      <div className={styles.header}>
        <h4 className={styles.phaseTitle}>Fase {phaseNumber}</h4>
        <div className={styles.controls}>
          <button>⬆️</button>
          <button>⬇️</button>
          <button className={styles.deleteButton}>🗑️</button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.inputs}>
          <InputField label="Título" type="text" id={`phase-title-${phaseNumber}`} />
          <div className={styles.textAreaWrapper}>
            <label htmlFor={`phase-desc-${phaseNumber}`}>Descrição da Fase</label>
            <textarea id={`phase-desc-${phaseNumber}`} rows={5}></textarea>
          </div>
        </div>
        <div className={styles.duration}>
          <label>Período de duração</label>
          <Calendar />
        </div>
      </div>
      <div className={styles.formSection}>
        <label>Formulário</label>
        <Button variant="primary">Criar Formulário</Button>
      </div>
    </div>
  );
}