
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Mercado', 'Eletrônicos', 'Academia', 'Outros'],
  datasets: [
    {
      label: 'Gastos',
      data: [300, 500, 100, 200], 
      backgroundColor: [
        '#ff6384', 
        '#36a2eb', 
        '#cc65fe', 
        '#ffce56', 
      ],
      hoverBackgroundColor: [
        '#ff6384',
        '#36a2eb',
        '#cc65fe',
        '#ffce56',
      ],
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: 'right', 
      align: 'center',
      labels: {
        usePointStyle: true, 
        pointStyle: 'circle',
        padding: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.label + ': ' + tooltipItem.raw;
        },
      },
    },
  },
  responsive: true,
};

function DoughnutChart() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={styles.title}>
        Gastos por Categoria
      </h2>
      <div>
        <div
          style={{
            width: "400px", 
            height: "400px", 
          }}
        >
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '1.5rem',
    fontWeight: 'regular',
    color: '#333',
    // fontFamily: "'Poppins', sans-serif",
  },
}

export default DoughnutChart;
