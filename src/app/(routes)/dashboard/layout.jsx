'use client';

import React, { useState } from "react";
import { AuthProvider } from "@/context/authContext";
import Sidebar from "./_components/Sidebar";
import "@/styles/global_dashboard.css";

export default function DashboardLayout({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleSidebarToggle = (isVisible) => {
    setIsSidebarVisible(isVisible);
  };

  return (
    <AuthProvider>
      <div className="dashboard-container">
        <Sidebar onToggle={handleSidebarToggle} />
        <div
          className={`main-content transition-all duration-300 ease-in-out ${
            isSidebarVisible ? "ml-48" : "ml-16"
          }`}
        >
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
