"use client";
import React from "react";
import Sidebar from "./_components/Sidebar"; // Certifique-se de que o nome está correto

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar /> {/* Sidebar com largura fixa */}
        <main>
          {children}
        </main>
      </div>
  );
}

export default DashboardLayout;
