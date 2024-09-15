"use client";

import React, { useState } from "react";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleSidebarToggle = (isVisible) => {
    setIsSidebarVisible(isVisible);
  };

  return (
    <div className="flex">
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`flex-1 transition-all ${isSidebarVisible ? "ml-64" : "ml-16"}`}>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
