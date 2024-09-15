import React from 'react';
import ProductsList from './ProductsList';
import StatsCard from './StatsCard';
import InvestmentChart from './InvestimentChart';
import NewInvestmentButton from './NewInvestmentButton';
import styles from '../_styles/InvestmentDashboard.module.css';

export default function InvestmentsDashboard({ data }) {
  const totalInvestido = data.reduce((sum, investment) => sum + investment.valor_investido, 0);
  const totalGanho = data.reduce((sum, investment) => sum + (investment.rendimento / 100) * investment.valor_investido, 0);
  
  const chartData = {
    labels: data.map(investment => investment.data_investimento),
    data: data.map(investment => (investment.rendimento / 100) * investment.valor_investido),
  };

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.header}>
          <h2 className="titulo">Investimentos</h2>
          <NewInvestmentButton />
        </div>
        <div className={styles.content}>
          <div className={styles.leftPane}>
            <ProductsList products={data} />
          </div>
          <div className={styles.rightPane}>
            <StatsCard title="Total Ganho" value={totalGanho.toFixed(2)} icon="money" />
            <StatsCard title="Total Investido" value={totalInvestido.toFixed(2)} icon="invest" />
          </div>
        </div>
        <div className={styles.chartContainer}>
          <InvestmentChart chartData={chartData} />
        </div>
      </div>
    </>
  );
}
