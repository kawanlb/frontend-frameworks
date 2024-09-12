"use client";

import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import BudgetItem from './BudgetItem';

// Dados falsos para simulação
const mockBudgetList = [
  {
    id: 1,
    name: 'Orçamento 1',
    amount: 100,
    totalSpend: 50,
    totalItem: 3,
    createdBy: 'user@example.com',
    icon: '💵',
  },
  {
    id: 2,
    name: 'Orçamento 2',
    amount: 200,
    totalSpend: 100,
    totalItem: 5,
    createdBy: 'user@example.com',
    icon: '🎨',
  },
  // Adicione outros dados simulados conforme necessário
];

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    // Simula a obtenção de orçamentos
    setBudgetList(mockBudgetList); // Dados falsos usados no lugar da chamada ao banco de dados
  }, []);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={() => setBudgetList(mockBudgetList)} />
        {budgetList?.length > 0 ? (
          budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetList;
