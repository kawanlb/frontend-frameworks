"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";

// Função para obter orçamentos do localStorage
const getBudgetsFromLocalStorage = () => {
  const budgets = localStorage.getItem('budgets');
  return budgets ? JSON.parse(budgets) : [];
};

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);

  const refreshData = () => {
    setBudgetList(getBudgetsFromLocalStorage()); // Atualiza com os dados do localStorage
  };

  useEffect(() => {
    // Carrega os dados do localStorage ao inicializar
    refreshData();
  }, []);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={refreshData} />
        {budgetList.length > 0 &&
          budgetList.map((budget) => (
            <BudgetItem budget={budget} key={budget.id} refreshData={refreshData} />
          ))}
      </div>
    </div>
  );
}

export default BudgetList;
