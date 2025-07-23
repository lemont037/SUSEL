import React from 'react';
import styles from '../styles/RadioButtonGroup.module.css';

export default function RadioButtonGroup({ label, name, options, selectedValue, onChange }) {
    return (
        <div className={styles.groupContainer}>
            {label && <span className={styles.groupLabel}>{label}</span>}
            <div className={styles.optionsContainer}>
                {options.map((option) => (
                    <label key={option.value} className={styles.radioOption}>
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={onChange}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
}