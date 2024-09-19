import React from 'react';
import InvestmentForm from '../_components/InvestmentForm';
import styles from '../_styles/InvestmentForm.module.css';

export default function AdicionarInvestimento() {
  return (
    <>
    <h2 className="titulo">Adicionando Investimento</h2>
    <div className={styles.pageContainer}>
      <InvestmentForm mode="adicionar"/>
    </div>
    </>
  );
}
