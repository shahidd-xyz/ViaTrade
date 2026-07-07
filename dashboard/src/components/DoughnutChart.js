import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    // Sets inner margins for the canvas edges
    padding: {
      top: 120,
      bottom: 20,
      left: 30,
      right: 30
    }
  }
};


export function DoughnutChart({data}) {
  return <Doughnut data={data} options={options}/>;
}