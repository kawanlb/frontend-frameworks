import { Home, BarChart2, Wallet, FileText, PieChart } from 'lucide-react';

export const NavItems = () => {
  return [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={20} />,
      position: 'top',
    },
    {
      name: 'Investimentos',
      href: '/dashboard/investimentos',
      icon: <BarChart2 size={20} />,
      position: 'top',
    },
    {
      name: 'Orçamentos',
      href: '/dashboard/orcamento',
      icon: <Wallet size={20} />,
      position: 'top',
    },
    {
      name: 'Transações',
      href: '/dashboard/transacoes',
      icon: <FileText size={20} />,
      position: 'top',
    },
    {
      name: 'Relatórios',
      href: '/dashboard/relatorios',
      icon: <PieChart size={20} />,
      position: 'top',
    },
  ];
};
