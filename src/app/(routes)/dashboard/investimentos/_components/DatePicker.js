import React from 'react';
import styles from '../_styles/InvestmentForm.module.css';

export default function DatePicker({ label, value, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input 
        type="date"
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}
