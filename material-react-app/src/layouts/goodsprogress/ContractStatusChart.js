import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GoodsProgressChart({ goodsProgress }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (packages.length > 0) {
      const statusCounts = packages.reduce((acc, pkg) => {
        const status = pkg.contractStatus || "Unknown";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(statusCounts);
      const data = Object.values(statusCounts);

      setchartData = {
        labels: rows.map((row) => row.progressDetailsStart), // X-axis data (dates)
        datasets: [
          {
            label: "Current Progress",
            data: rows.map((row) => row.currentProgress), // Y-axis data (progress)
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Physical Progress (%)",
            data: rows.map((row) => row.physicalProgressPercentage), // Another dataset
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
        ],
      };
    }
  }, [goodsProgress]);
  return (
    <Bar
      data={chartData}
      options={{
        scales: {
          x: {
            title: { display: true, text: "Progress Dates" },
          },
          y: {
            title: { display: true, text: "Progress" },
          },
        },
      }}
    />
  );
}

export default GoodsProgressChart;
