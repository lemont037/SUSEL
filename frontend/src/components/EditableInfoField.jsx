import React from "react";
import styles from "../styles/EditableInfoField.module.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

export default function EditableInfoField({
    label,
    value,
    onEditClick,
    isEditing,
    onChange,
    type,
}) {
    const currentYear = new Date().getFullYear();
    const earliestYear = 1900
    const totalYearsAvailabe = currentYear - earliestYear

    return (
        <div className={styles.fieldContainer}>
            <label className={styles.label}>{label}</label>
            <div className={styles.contentWrapper}>
                {isEditing ? (
                    type === "date" ? (

                        <DatePicker
                            selected={value ? format(new Date(value), "dd/MM/yyyy") : null}
                            onChange={(date) => onChange(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecione a data de nascimento"
                            maxDate={new Date()}
                            minDate={new Date(1900, 0, 1)}
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={totalYearsAvailabe}
                        />
                    ) : (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    )
                ) : (
                    <>
                        <span className={styles.value}>
                            {type === "date" && value
                                ? format(new Date(value), "dd/MM/yyyy")
                                : value}
                        </span>
                        {onEditClick && (
                            <span
                                className={styles.editIcon}
                                onClick={onEditClick}
                            >
                                &#x270F;&#xFE0F;{" "}
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
