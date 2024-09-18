'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavItems } from './NavItens';

export default function Sidebar({ onToggle }) {
  const navItems = NavItems();

  const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('sidebarVisible');
      return saved === null ? true : JSON.parse(saved);
    }
    return true; // estado padrão se window não estiver definido
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sidebarVisible', JSON.stringify(isSidebarVisible));
    }
    onToggle(isSidebarVisible);
  }, [isSidebarVisible, onToggle]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white border-r shadow-sm transition-all duration-100 ease-in-out ${isSidebarVisible ? 'w-64' : 'w-16'} z-30`}
    >
      <div className="flex items-center justify-between mb-5 p-2">
        {isSidebarVisible && (
          <span className="text-purple-800 font-bold text-xl">Organiza</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 transition-transform duration-150"
          style={{ marginLeft: isSidebarVisible ? 'auto' : '0' }} // Alinha corretamente o botão com base no estado da sidebar
        >
          {isSidebarVisible ? (
            <ChevronLeft
              size={24}
              className="stroke-foreground text-purple-800 hover:stroke-purple-600 transition-colors duration-200"
            />
          ) : (
            <ChevronRight
              size={24}
              className="stroke-foreground text-purple-800 hover:stroke-purple-600 transition-colors duration-200"
            />
          )}
        </button>
      </div>
      <div>
        {navItems.map((item) => (
          <TooltipProvider key={item.name} delayDuration={70}>
            <Tooltip>
              <TooltipTrigger>
                <Link href={item.href}>
                  <div
                    className={`flex items-center gap-2 p-4 cursor-pointer rounded-full hover:bg-blue-100 ${
                      isSidebarVisible ? 'block' : 'justify-center'
                    }`}
                  >
                    {item.icon}
                    {isSidebarVisible && <span>{item.name}</span>}
                  </div>
                </Link>
              </TooltipTrigger>
              {!isSidebarVisible && (
                <TooltipContent side="left" className="px-3 py-1.5 text-xs" sideOffset={10}>
                  <span>{item.name}</span>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div className="absolute bottom-10 left-0 w-full flex justify-center">
        {isSidebarVisible && <span>Minha conta</span>}
      </div>
    </div>
  );
}
