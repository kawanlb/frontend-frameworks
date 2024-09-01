import React from 'react';
import InvestmentForm from '../../../components/InvestmentForm';
import styles from '../../../styles/AddInvestment.module.css';

export default function Adicionar() {
  return (
    <div className={styles.pageContainer}>
      <InvestmentForm />
    </div>
  );
}
