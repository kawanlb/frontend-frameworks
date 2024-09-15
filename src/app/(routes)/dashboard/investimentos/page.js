"use client"
import React, { useEffect, useState } from 'react';
import InvestmentsDashboard from './_components/InvestmentsDashboard';

export default function Investimentos() {
  const [investmentsData, setInvestmentsData] = useState([]);

  useEffect(() => {
    // Recupera os dados do localStorage quando o componente é montado
    const storedData = JSON.parse(localStorage.getItem('investments')) || [];
    setInvestmentsData(storedData);
  }, []);

  return <InvestmentsDashboard data={investmentsData} />;
}
