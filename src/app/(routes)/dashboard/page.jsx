'use client'

import React from 'react'
import DoughnutChart from './relatorios/_components/DoughnutChart';
import styles from '@/app/(routes)/dashboard/relatorios/_styles/Reports.module.css';
import InvestmentChart from './investimentos/_components/InvestimentChart';
function Dashboard() {
  return (
    <div className='p-4'>
      <h2 className='font-bold text-3xl'>Dashboard</h2>
  
      <div className={styles.gastosPorCategoria}>
        <DoughnutChart />
      </div>  
    </div>

  )
}

export default Dashboard;