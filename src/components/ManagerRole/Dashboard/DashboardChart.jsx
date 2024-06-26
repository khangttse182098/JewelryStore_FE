import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  PieController,
  ArcElement,
  CategoryScale,
  LinearScale,

  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  return (
    <div className="h-1/2 w-1/2 mt-24 ml-24">
      <Pie
        data={{
          labels: [
            "Africa",
            "Asia",
            "Europe",
            "Latin America",
            "North America",
          ],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
              ],
              data: [2478, 5267, 734, 784, 433],
            },
          ],
        }}
        options={{
          circumference: 360,
          legend: { display: false },
          title: {
            display: true,
            text: "Predicted world population (millions) in 2050",
          },
        }}
      />
    </div>
  );
};

export default DashboardChart;
