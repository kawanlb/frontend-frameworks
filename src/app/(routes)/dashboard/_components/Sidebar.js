"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, BarChart2, Wallet, FileText, PieChart } from "lucide-react";

export default function Sidebar({ onToggle }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    onToggle(!isSidebarVisible); // Comunica o estado para o layout
  };

  const menuList = [
    { id: 1, name: "Dashboard", icon: Home, path: "/dashboard" },
    { id: 2, name: "Investimentos", icon: BarChart2, path: "/dashboard/investimentos" },
    { id: 3, name: "Orçamentos", icon: Wallet, path: "/dashboard/orcamento" },
    { id: 4, name: "Transações", icon: FileText, path: "/dashboard/transacoes" },
    { id: 5, name: "Relatórios", icon: PieChart, path: "/dashboard/relatorios" },
  ];

  return (
    <div className={`fixed h-screen p-5 border-r shadow-sm transition-all ${isSidebarVisible ? "w-64" : "w-16"}`}>
      <div className="flex items-center justify-between mb-5">
        {isSidebarVisible && (
          <span className="text-purple-800 font-bold text-xl">Organiza</span>
        )}
        <button onClick={toggleSidebar} className="ml-2">
          {isSidebarVisible ? ">" : "<"}
        </button>
      </div>
      <div>
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <div className={`flex items-center gap-2 p-4 cursor-pointer rounded-full hover:bg-blue-100 ${isSidebarVisible ? "block" : "justify-center"}`}>
              <menu.icon />
              {isSidebarVisible && <span>{menu.name}</span>}
            </div>
          </Link>
        ))}
      </div>
      <div className={`fixed bottom-10 p-5 flex items-center gap-2 transition-all ${isSidebarVisible ? "left-0" : "left-16"} w-full`}>
        {/* Componente de usuário removido */}
        {isSidebarVisible && <span>Minha conta</span>}
      </div>
    </div>
  );
}
