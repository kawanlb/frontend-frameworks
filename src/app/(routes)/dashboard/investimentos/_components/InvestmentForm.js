"use client";
import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import DatePicker from './DatePicker';
import Button from './ButtonInvestment';
import styles from '../_styles/InvestmentForm.module.css';
import { useRouter } from 'next/navigation'; 
import { v4 as uuidv4 } from 'uuid'; // Importa a função para gerar UUID

export default function InvestmentForm({ mode = 'adicionar', product = {} }) {
  const router = useRouter(); 

  const [investmentType, setInvestmentType] = useState('');
  const [institution, setInstitution] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [monthlyReturn, setMonthlyReturn] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    if (mode === 'editar') {
      const tipoInvestimentoNormalizado = product.tipo_investimento.toLowerCase().replace(' ', '_');
      setInvestmentType(tipoInvestimentoNormalizado || '');
      setInstitution(product.instituicao || '');
      setInvestedAmount(product.valor_investido || '');
      setMonthlyReturn(product.rendimento || '');
      if (product.data_investimento) {
        const formattedExpiryDate = new Date(product.data_investimento).toISOString().split('T')[0];
        setExpiryDate(formattedExpiryDate);
      }
    }
  }, [mode, product]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (!investmentType || !institution || !investedAmount || !monthlyReturn || !expiryDate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const investmentData = {
      id: mode === 'adicionar' ? uuidv4() : product.id, // Gera um UUID se for adicionar, caso contrário, usa o ID existente
      user_id: "1", 
      tipo_investimento: investmentType,
      instituicao: institution,
      valor_investido: parseFloat(investedAmount),
      rendimento: parseFloat(monthlyReturn),
      data_investimento: expiryDate,
      data_criacao: product.data_criacao || new Date().toISOString(),
      data_atualizacao: new Date().toISOString(),
    };

    let investments = JSON.parse(localStorage.getItem('investments')) || [];

    if (mode === 'adicionar') {
      investments.push(investmentData);
    } else if (mode === 'editar') {
      investments = investments.map(inv => inv.id === product.id ? investmentData : inv);
    }

    localStorage.setItem('investments', JSON.stringify(investments));

    alert(`Investimento ${mode === 'adicionar' ? 'adicionado' : 'editado'} com sucesso!`);
    router.push('/dashboard/investimentos');
  };

  const handleCancel = () => {
    router.push('/dashboard/investimentos');
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.inputContainer}>
            <label htmlFor="investmentType" className={styles.formLabel}>Tipo de Investimento</label>
            <SelectField 
              id="investmentType"
              options={[
                { value: '', label: 'Selecione'},
                { value: 'tesouro_direto', label: 'Tesouro Direto' },
                { value: 'cdb', label: 'CDB' },
                { value: 'lc', label: 'Letra de Câmbio (LC)' },
                { value: 'lca', label: 'Letra de Crédito do Agronegócio (LCA)' },
                { value: 'lci', label: 'Letra de Crédito Imobiliário (LCI)' },
                { value: 'fundo_renda_fixa', label: 'Fundo de Renda Fixa' },
                { value: 'fundo_multimercado', label: 'Fundo Multimercado' },
                { value: 'fundo_acoes', label: 'Fundo de Ações' }
              ]} 
              value={investmentType} 
              onChange={(e) => setInvestmentType(e.target.value)} 
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="institution" className={styles.formLabel}>Instituição</label>
            <InputField 
              id="institution" 
              value={institution} 
              onChange={(e) => setInstitution(e.target.value)} 
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="investedAmount" className={styles.formLabel}>Valor Investido</label>
            <InputField 
              id="investedAmount"
              value={investedAmount} 
              onChange={(e) => setInvestedAmount(e.target.value)} 
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="monthlyReturn" className={styles.formLabel}>Rendimento ao Mês (%)</label>
            <InputField 
              id="monthlyReturn"
              type="number"
              step="0.01" 
              value={monthlyReturn} 
              onChange={(e) => setMonthlyReturn(e.target.value)} 
              placeholder="Exemplo: 5.25"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="expiryDate" className={styles.formLabel}>Data de Início</label>
            <DatePicker 
              id="expiryDate"
              value={expiryDate} 
              onChange={(e) => setExpiryDate(e.target.value)} 
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button label="Salvar" type="submit" className={styles.saveButton} />
          <Button label="Cancelar" className={styles.cancelButton} onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
}
