// Em src/components/PhaseCard.jsx
import styles from "../styles/PhaseCard.module.css";
import InputField from "./InputField";
import Button from "./Button";

// Placeholder para um futuro componente de Calendário
const Calendar = () => <div className={styles.calendarPlaceholder}></div>;

export default function PhaseCard({
    phaseNumber,
    phaseData,
    onChange,
    onDelete,
}) {
    const handleInputChange = (field, value) => {
        const updatedPhase = { ...phaseData, [field]: value };
        onChange(updatedPhase);
    };
    return (
        <div className={styles.phaseCard}>
            <div className={styles.header}>
                <h4 className={styles.phaseTitle}>Fase {phaseNumber}</h4>
                <div className={styles.controls}>
                    <button>⬆️</button>
                    <button>⬇️</button>
                    <button className={styles.deleteButton} onClick={onDelete}>
                        🗑️
                    </button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.inputs}>
                    <InputField
                        label="Título"
                        type="text"
                        id={`phase-title-${phaseNumber}`}
                        value={phaseData.title || ""}
                        onChange={(e) =>
                            handleInputChange("title", e.target.value)
                        }
                    />
                    <div className={styles.textAreaWrapper}>
                        <label htmlFor={`phase-desc-${phaseNumber}`}>
                            Descrição da Fase
                        </label>
                        <textarea
                            id={`phase-desc-${phaseNumber}`}
                            rows={5}
                            value={phaseData.description || ""}
                            onChange={(e) =>
                                handleInputChange("description", e.target.value)
                            }
                        ></textarea>
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
