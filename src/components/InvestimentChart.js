"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import styles from '../styles/components/InvestmentChart.module.css';

// Registra os componentes que você quer usar
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function InvestmentChart({ chartData }) {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'ROI',
        data: chartData.data,
        backgroundColor: 'rgba(134, 239, 172, 0.2)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <Line data={data} />
    </div>
  );
}
