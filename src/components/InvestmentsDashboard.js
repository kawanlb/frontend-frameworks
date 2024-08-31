import React from 'react';
import ProductsList from './ProductsList';
import StatsCard from './StatsCard';
import InvestmentChart from './InvestimentChart';
import NewInvestmentButton from './NewInvestmentButton';
import styles from '../styles/components/InvestmentDashboard.module.css';

export default function InvestmentsDashboard({ data }) {
  const totalInvestido = data.reduce((sum, investment) => sum + investment.valor_investido, 0);
  const totalGanho = data.reduce((sum, investment) => sum + investment.rendimento, 0);
  
  const chartData = {
    labels: data.map(investment => investment.data_investimento),
    data: data.map(investment => investment.rendimento),
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h2>Investimentos</h2>
        <NewInvestmentButton />
      </div>
      <div className={styles.content}>
        <ProductsList products={data} />
        <div className={styles.statsAndChart}>
          <div className={styles.stats}>
            <StatsCard title="Total Ganho" value={totalGanho} icon="money" />
            <StatsCard title="Total Investido" value={totalInvestido} icon="invest" />
          </div>
          <InvestmentChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
