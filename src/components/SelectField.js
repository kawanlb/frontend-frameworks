import React from 'react';
import styles from '../styles/AddInvestment.module.css';

export default function SelectField({ label, options, value, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <select value={value} onChange={onChange} className={styles.select}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
