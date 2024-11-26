import React, { useState } from "react";
import EditBudget from "./EditBudget";
import { PenTool, Trash } from "lucide-react";

function BudgetItem({ budget, refreshData, showActions = true }) {
  const [isEditing, setIsEditing] = useState(false);

  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const handleDelete = () => {
    const budgets = JSON.parse(localStorage.getItem("budgets")) || [];
    const updatedBudgets = budgets.filter((b) => b.id !== budget.id);
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
    refreshData();
  };

  return (
    <div className="relative p-4 border rounded-2xl hover:shadow-md cursor-pointer">
      {/* Top Section */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-xl p-2 px-3 bg-slate-100 rounded-full">{budget?.icon}</h2>
          <div>
            <h2 className="font-bold text-lg">{budget.name}</h2>
            <h2 className="text-xs text-gray-500">{budget.category}</h2>
          </div>
        </div>

        {/* Budget Amount */}
        <h2 className="font-bold text-primary text-lg md:text-xl text-right w-full md:w-auto mr-[30px]">
          R${budget.amount}
        </h2>
      </div>

      {/* Progress Bar Section */}
      <div className="mt-7">
        <div className="flex items-center justify-between mb-2 text-xs text-slate-400">
          <h2>R${budget.totalSpend || 0} Gasto</h2>
          <h2>R${budget.amount - budget.totalSpend} Sobrando</h2>
        </div>
        <div className="w-full bg-slate-300 h-1 rounded-full">
          <div
            className="bg-primary h-1 rounded-full"
            style={{ width: `${calculateProgressPerc()}%` }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="absolute top-2 right-2 flex flex-col gap-1 md:gap-2">
          <button
            className="p-1 text-blue-500 hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            <PenTool className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            className="p-1 text-red-500 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <Trash className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <EditBudget
          budgetInfo={budget}
          refreshData={refreshData}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

export default BudgetItem;
