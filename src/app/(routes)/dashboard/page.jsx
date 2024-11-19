"use client";

import React, { useState } from 'react';
import StatsCard from './investimentos/_components/StatsCard';
import BudgetList from './orcamento/_components/BudgetList'; 
import UserDataFetcher from '@/api//UserDataFetcher'; 

function Dashboard() {
  const [userName, setUserName] = useState(null); 

  const productsData = [
    { id: 1, tipo_investimento: 'Ações', instituicao: 'Banco A', valor_investido: 5000, rendimento: 200 },
    { id: 2, tipo_investimento: 'Fundo Imobiliário', instituicao: 'Banco B', valor_investido: 7000, rendimento: 300 },
  ];

  const totalInvestido = productsData.reduce((sum, product) => sum + product.valor_investido, 0);
  const totalGanho = productsData.reduce((sum, product) => sum + product.rendimento, 0);

  return (
    <div className="p-4">
      <UserDataFetcher
        onDataFetch={(data) => {
          setUserName(data.name); 
        }}
      />

      {/* Boas-vindas */}
      <div className="mb-6 bg-white p-4 rounded shadow-lg">
        <h2 className="font-bold text-3xl">Bem-vindo{userName ? `, ${userName}` : ''}!</h2>
        <p className="text-lg mt-2">Aqui está o resumo das suas finanças e orçamentos para hoje.</p>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Investment Stats Cards */}
        <div className="bg-white p-4 rounded shadow-lg grid grid-cols-1 gap-4">
          <StatsCard title="Total Investido" value={`R$ ${totalInvestido.toFixed(2)}`} icon="invest" />
          <StatsCard title="Total Ganho" value={`R$ ${totalGanho.toFixed(2)}`} icon="money" />
        </div>

        {/* Budget List */}
        <div className="bg-white p-4 rounded shadow-lg">
          <h3 className="font-bold text-xl mb-4">Orçamentos</h3>
          <BudgetList showActions={false} /> 

        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded shadow-lg">
  <h3 className="font-bold text-xl mb-4">Atualizações Recentes</h3>
  <ul className="list-disc pl-5">
    <li>Seu rendimento de investimentos subiu 5% esta semana!</li>
    <li>Um novo orçamento foi criado na categoria &#39;Alimentação&#39;.</li>
    <li>Você atingiu 80% do limite no orçamento de &#39;Lazer&#39;.</li>
  </ul>
</div>

<div className="mt-4 bg-white p-4 rounded shadow-lg">
  <p className="text-lg italic">
    &quot;O sucesso financeiro é construído com pequenos passos consistentes. Continue investindo em seus sonhos!&quot;
  </p>
</div>

    </div>
  );
}

export default Dashboard;
