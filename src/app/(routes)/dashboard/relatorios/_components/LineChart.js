import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import { Margin } from "@mui/icons-material";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const chartData = [
  { month: "JAN", entrada: 150, saida: 220 },
  { month: "FEV", entrada: 100, saida: 90 },
  { month: "MAR", entrada: 250, saida: 150 },
  { month: "ABR", entrada: 200, saida: 190 },
  { month: "MAI", entrada: 210, saida: 70 },
  { month: "JUN", entrada: 190, saida: 130 },
  { month: "JUL", entrada: 120, saida: 360 },
  { month: "AGO", entrada: 120, saida: 100 },
  { month: "SET", entrada: 250, saida: 200 },
  { month: "OUT", entrada: 180, saida: 50 },
  { month: "NOV", entrada: 320, saida: 80 },
  { month: "DEZ", entrada: 100, saida: 70 },
];

function LineChart() {
  const data = {
    labels: chartData.map((data) => data.month),
    datasets: [
      {
        label: "Entradas",
        data: chartData.map((data) => data.entrada),
        borderColor: "#876AFE",
        borderWidth: 3,
        pointBorderColor: "#876AFE",
        pointBorderWidth: 1,
        tension: 0.5,
        fill: false,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#876AFE");
          return gradient;
        },
      },
      {
        label: "Saídas",
        data: chartData.map((data) => data.saida),
        borderColor: "#FF4980",
        borderWidth: 3,
        pointBorderColor: "#FF4980",
        pointBorderWidth: 2,
        tension: 0.5,
        fill: false,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#FF4980");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        left: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14,
            weight: "lighter",
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
            weight: "lighter",
          },
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px", width: "80vw", height: "40vw" }}>
      <h2 style={styles.title}>
        Entradas e Saídas
      </h2>
      <div>
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '1.5rem',
    fontWeight: 'regular',
    color: '#333',
    marginBottom: '20px',
  },
}

export default LineChart;