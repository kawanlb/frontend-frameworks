import React from 'react';
import styles from '../_styles/InvestmentForm.module.css';

export default function InputField({ label, value, onChange, type = 'text' }) {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input 
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}
