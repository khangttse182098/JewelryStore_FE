import React, { useEffect, useState } from "react";
import { Chart, Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  PieController,
  ArcElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const [revenueList, setRevenueList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("7days");
  ChartJS.defaults.font.size = 24;

  useEffect(() => {
    const handleFetch = async () => {
      const res = await fetch(
        `http://mahika.foundation:8080/swp/api/revenue?time=${selectedFilter}`
      );
      const list = await res.json();
      if (selectedFilter === "7days") {
        setRevenueList({ ...list.data, revenueTitle: "7 ngày gần nhất" });
      } else if (selectedFilter === "4weeks") {
        setRevenueList({ ...list.data, revenueTitle: "4 tuần gần nhất" });
      } else if (selectedFilter === "12months") {
        setRevenueList({ ...list.data, revenueTitle: "12 tháng gần nhất" });
      } else if (selectedFilter === "today") {
        setRevenueList({ ...list.data, revenueTitle: "hôm nay" });
      }
    };
    console.log(revenueList);
    handleFetch();
  }, [selectedFilter]);

  function handleSelectFilter(event) {
    console.log(event.target.value);
    setSelectedFilter(event.target.value);
    // console.log(selectedFilter);
  }
  return (
    <div className="flex flex-col bg-white drop-shadow-xl h-[80%] w-[90%] mt-24 ml-24 rounded-xl ">
      <h1 className="text-3xl font-medium my-5 ml-5">
        {`Doanh thu ${revenueList.revenueTitle}`}
      </h1>
      <hr className="" />
      <select
        onChange={handleSelectFilter}
        className="w-40 h-15 mt-10 ml-5 border rounded p-2 bg-white text-2xl font-medium"
      >
        <option value="today">Hôm nay</option>;
        <option value="7days">7 ngày</option>;
        <option value="4weeks">4 tuần</option>;
        <option value="12months">12 tháng</option>;
        <option value="alltime">Tất cả</option>;
        <option value="custom">Tùy chỉnh</option>;
      </select>
      <div className="h-2/3 w-4/5 ml-20 mt-16">
        <Bar
          data={{
            labels: revenueList.createdDateList,
            datasets: [
              {
                label: "Doanh thu (VNĐ)",
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                ],
                borderWidth: 1,
                data: revenueList.sellTotalPriceList,
              },
            ],
          }}
          options={{
            circumference: 360,

            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  boxWidth: 20,
                },

                maxHeight: 200,
                maxWidth: 500,
              },
            },
          }}
        />

        <Bar
          data={{
            labels: [
              "Trần Thái Khang",
              "Phạm Hoàng Phúc",
              "Lê Đức Minh",
              "Hoàng Nguyên Khang",
              "Võ Nguyên Khoa",
            ],
            datasets: [
              {
                label: "Doanh thu (VNĐ)",
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                ],
                borderWidth: 1,
                data: [100000, 200000, 300000, 400000, 500000],
              },
            ],
          }}
          options={{
            circumference: 360,

            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  boxWidth: 20,
                },

                maxHeight: 200,
                maxWidth: 500,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DashboardChart;
