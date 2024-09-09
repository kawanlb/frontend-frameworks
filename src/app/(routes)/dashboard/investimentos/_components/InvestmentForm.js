"use client";
import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import DatePicker from './DatePicker';
import Button from './ButtonInvestment';
import styles from '../_styles/InvestmentForm.module.css';
import { useRouter } from 'next/navigation'; 

export default function InvestmentForm({ mode = 'adicionar', product = {} }) {
  const router = useRouter(); 

  // Define os estados, preenchendo com os dados do produto no modo "editar"
  const [investmentType, setInvestmentType] = useState('');
  const [institution, setInstitution] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [monthlyReturn, setMonthlyReturn] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  // Garantir que os valores do produto sejam carregados ao editar
  useEffect(() => {
    if (mode === 'editar') {
      // Normaliza o tipo de investimento para o formato correto (exemplo: Tesouro Direto -> tesouro)
      const tipoInvestimentoNormalizado = product.tipo_investimento.toLowerCase().replace(' ', '_');
      setInvestmentType(tipoInvestimentoNormalizado || '');
      setInstitution(product.instituicao || '');
      setInvestedAmount(product.valor_investido || '');
      setMonthlyReturn(product.rendimento || '');

      // Formata a data de início (caso exista)
      if (product.data_investimento) {
        const formattedExpiryDate = new Date(product.data_investimento).toISOString().split('T')[0]; // Formata para YYYY-MM-DD
        setExpiryDate(formattedExpiryDate);
      }
    }
  }, [mode, product]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (!investmentType || !institution || !investedAmount || !monthlyReturn || !expiryDate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const investmentData = {
      user_id: "1", 
      tipo_investimento: investmentType,
      instituicao: institution,
      valor_investido: parseFloat(investedAmount),
      rendimento: parseFloat(monthlyReturn),
      data_investimento: expiryDate,
      data_criacao: product.data_criacao || new Date().toISOString(),
      data_atualizacao: new Date().toISOString(),
    };

    let apiEndpoint = '';

    // Verifica o modo (adicionar ou editar)
    if (mode === 'adicionar') {
      apiEndpoint = '/api/dashboard/investimentos/adicionar'; 
    } else if (mode === 'editar') {
      apiEndpoint = `/api/dashboard/investimentos/editar/${product.id}`; 
    }
    console.log(investmentData)
    // try {
    //   const response = await fetch(apiEndpoint, {
    //     method: mode === 'adicionar' ? 'POST' : 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(investmentData),
    //   });

    //   if (response.ok) {
    //     alert(`Investimento ${mode === 'adicionar' ? 'adicionado' : 'editado'} com sucesso!`);
    //     router.push('/investimentos');
    //   } else {
    //     alert("Ocorreu um erro. Tente novamente.");
    //   }
    // } catch (error) {
    //   console.error("Erro ao salvar o investimento:", error);
    // }
  };

  const handleCancel = () => {
    router.push('/dashboard/investimentos');
  };

  return (
    <div className={styles.formContainer}>
      <h2>{mode === 'adicionar' ? 'Adicionar Investimento' : 'Editar Investimento'}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.formGrid}>

          {/* Campo de Tipo de Investimento */}
          <div className={styles.inputContainer}>
            <label htmlFor="investmentType" className={styles.formLabel}>Tipo de Investimento</label>
            <SelectField 
              id="investmentType"
              options={[
                { value: 'tesouro_direto', label: 'Tesouro Direto' },
                { value: 'cdb', label: 'CDB' },
                { value: 'lc', label: 'Letra de Câmbio (LC)' },
                { value: 'lca', label: 'Letra de Crédito do Agronegócio (LCA)' },
                { value: 'lci', label: 'Letra de Crédito Imobiliário (LCI)' },
                { value: 'fundo_renda_fixa', label: 'Fundo de Renda Fixa' },
                { value: 'fundo_multimercado', label: 'Fundo Multimercado' },
                { value: 'fundo_acoes', label: 'Fundo de Ações' }
              ]} 
              value={investmentType} // Assegura que o valor do SelectField é o estado
              onChange={(e) => setInvestmentType(e.target.value)} // Atualiza o estado ao mudar o valor
            />
          </div>

          {/* Campo de Instituição */}
          <div className={styles.inputContainer}>
            <label htmlFor="institution" className={styles.formLabel}>Instituição</label>
            <InputField 
              id="institution" 
              value={institution} 
              onChange={(e) => setInstitution(e.target.value)} 
            />
          </div>

          {/* Campo de Valor Investido */}
          <div className={styles.inputContainer}>
            <label htmlFor="investedAmount" className={styles.formLabel}>Valor Investido</label>
            <InputField 
              id="investedAmount"
              value={investedAmount} 
              onChange={(e) => setInvestedAmount(e.target.value)} 
            />
          </div>

          {/* Campo de Rendimento ao Mês */}
          <div className={styles.inputContainer}>
            <label htmlFor="monthlyReturn" className={styles.formLabel}>Rendimento ao Mês</label>
            <InputField 
              id="monthlyReturn"
              value={monthlyReturn} 
              onChange={(e) => setMonthlyReturn(e.target.value)} 
            />
          </div>

          {/* Campo de Data de Início */}
          <div className={styles.inputContainer}>
            <label htmlFor="expiryDate" className={styles.formLabel}>Data de Início</label>
            <DatePicker 
              id="expiryDate"
              value={expiryDate} 
              onChange={(e) => setExpiryDate(e.target.value)} 
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className={styles.buttonContainer}>
          <Button label="Salvar" type="submit" className={styles.saveButton} />
          <Button label="Cancelar" className={styles.cancelButton} onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
}
