"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import BudgetItem from './BudgetItem'
import { useUser } from '@clerk/nextjs'

// Dados simulados
const mockBudgets = [
  { id: 1, name: 'January Budget', totalSpend: 150, totalItem: 5, createdBy: 'user@example.com' },
  { id: 2, name: 'February Budget', totalSpend: 200, totalItem: 8, createdBy: 'user@example.com' },
  { id: 3, name: 'March Budget', totalSpend: 300, totalItem: 10, createdBy: 'user@example.com' },
];

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  /**
   * Simula a obtenção da lista de orçamentos
   */
  const getBudgetList = async () => {
    // Simula um atraso na resposta
    setTimeout(() => {
      setBudgetList(mockBudgets.filter(budget => budget.createdBy === user?.primaryEmailAddress?.emailAddress));
    }, 1000);
  };

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0 ? budgetList.map((budget, index) => (
          <BudgetItem budget={budget} key={index} />
        )) : [1, 2, 3, 4, 5].map((item, index) => (
          <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
        ))}
      </div>
    </div>
  );
}

export default BudgetList;
