"use client";
import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import DatePicker from './DatePicker';
import Button from './ButtonInvestment';
import styles from '../styles/AddInvestment.module.css';
import '../styles/globals.css'
import { useRouter } from 'next/navigation'; // Use o router do next/navigation

export default function InvestmentForm() {
  const router = useRouter(); // Inicializa o hook useRouter

  const [title, setTitle] = useState('');
  const [investmentType, setInvestmentType] = useState('');
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [monthlyReturn, setMonthlyReturn] = useState('');
  const [startDate, setStartDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [institution, setInstitution] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if (!title || !investmentType || !institution || !investedAmount || !monthlyReturn || !startDate || !expiryDate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    const investmentData = {
      user_id: "1",
      tipo_investimento: investmentType,
      instituicao: institution,
      valor_investido: parseFloat(investedAmount),
      rendimento: parseFloat(monthlyReturn),
      data_investimento: startDate,
      data_criacao: new Date().toISOString(),
      data_atualizacao: new Date().toISOString(),
    };
  
    console.log("Dados do Investimento:", investmentData);
  
    alert("Dados do investimento capturados com sucesso!");

    router.push('/investimentos');
  };

  const handleCancel = () => {
    router.push('/investimentos');
  };

  return (
    <>
      <h2 className="titulo">Adicionando Investimento</h2>
      <div className={styles.formContainer}>
        <div className={styles.formGrid}>
          <div className={styles.inputContainer}>
            <label htmlFor="title" className={styles.formLabel}>Título Investimento</label>
            <InputField id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="investmentType" className={styles.formLabel}>Tipo de Investimento</label>
            <SelectField 
              id="investmentType"
              options={[
                { value: '', label: 'Selecione um tipo de investimento' },
                { value: 'tesouro', label: 'Tesouro Direto' },
                { value: 'cdb', label: 'CDB' }
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

          <div className={`${styles.inputContainer} ${styles.fullWidth}`}>
            <label htmlFor="description" className={styles.formLabel}>Descrição</label>
            <textarea 
              id="description"
              className={styles.textarea}
              placeholder="Escreva uma Descrição..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <label htmlFor="monthlyReturn" className={styles.formLabel}>Rendimento ao Mês</label>
            <InputField 
              id="monthlyReturn"
              value={monthlyReturn} 
              onChange={(e) => setMonthlyReturn(e.target.value)} 
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="startDate" className={styles.formLabel}>Data de Início</label>
            <DatePicker 
              id="startDate"
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="expiryDate" className={styles.formLabel}>Data de Expiração</label>
            <DatePicker 
              id="expiryDate"
              value={expiryDate} 
              onChange={(e) => setExpiryDate(e.target.value)} 
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button label="Salvar" onClick={handleFormSubmit} type="submit" className={styles.saveButton} />
          <Button label="Cancelar" className={styles.cancelButton} onClick={handleCancel} />
        </div>
      </div>
    </>
  );
}
