import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Holdings",
    },
  },
  scales: {
    x: {
      ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 },
    },
    y: {
      beginAtZero: true,
    },
  },
  layout: {
    padding: {
        left: 20,
        right: 20,
        top: 50,
        bottom: 10,
    }
  }
};



export function VerticalGraph({data}) {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Bar options={options} data={data} />
    </div>
  );
}