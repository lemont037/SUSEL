import styles from "../styles/PhaseCard.module.css";
import InputField from "./InputField";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default function PhaseCard({
    phaseNumber,
    phaseData,
    onChange,
    onDelete,
}) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const handleInputChange = (field, value) => {
        const updatedPhase = { ...phaseData, [field]: value };
        onChange(updatedPhase);
    };
    return (
        <div className={styles.phaseCard}>
            <div className={styles.header}>
                <h4 className={styles.phaseTitle}>Fase {phaseNumber}</h4>
                <div className={styles.controls}>
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
                    <div className={styles.calendarPlaceholder}>
                        <DatePicker
                            selectsRange
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            placeholderText="Selecione a duração da Fase"
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                console.log("Selected Range: ", update)
                                setDateRange(update);
                                if (update[0]) {
                                    console.log("Start date: ", update[0])
                                    handleInputChange("startDate", update[0])
                                }
                                if (update[1]) {
                                    console.log("End date: ", update[1])
                                    handleInputChange("endDate", update[1])
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
