import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = ({ dataArray }) => {
  const labels = dataArray.map((_, index) => `Question ${index + 1}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Time Spent (s)",
        data: dataArray,
        borderColor: "rgba(251, 248, 250, 0.84)", // Fix the extra parenthesis here
        backgroundColor: "rgba(251, 248, 250, 0.84)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to take the full height
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Time Spent on Each Question"
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}> {/* Full height and width */}
      <Line data={data} options={options} className="graph" />
    </div>
  );
};

export default Graph;
