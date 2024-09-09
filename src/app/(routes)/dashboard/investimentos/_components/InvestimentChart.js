"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../_styles/InvestmentChart.module.css';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function InvestmentChart({ chartData }) {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'ROI',
        data: chartData.data,
        fill: true,
        backgroundColor: function(context) {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height); // Mudança aqui
          gradient.addColorStop(0, 'rgba(128, 91, 233, 0.8)');
          gradient.addColorStop(1, 'rgba(128, 91, 233, 0)');
          return gradient;
        },
        borderColor: 'rgb(128, 91, 233)', // Cor da linha
        borderWidth: 2,
        tension: 0.4, // Criar o efeito de onda
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, 
    responsive: true, 
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Line data={data} options={options} className={styles.chartWrapper} />
    </div>
  );
}
