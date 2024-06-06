import { useAttendance } from "@/context/AttendanceContext";
import React from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ScriptableContext,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const { aggregatedData } = useAttendance();
  const a = window.screen.width;
  const dates = Object.keys(aggregatedData).slice(-10);
  const absentCounts = dates.map((date) => aggregatedData[date].totalAbsent);
  const presentCounts = dates.map((date) => aggregatedData[date].totalPresent);
  const formattedDates = dates.map((date) => moment(date).format("DD-MMM"));

  const chartData = {
    labels: formattedDates,
    datasets: [
      {
        label: "Absent",
        data: absentCounts,
        fill: true,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, -80, 30, 300);
          gradient.addColorStop(0, "black");
          gradient.addColorStop(1, "#9b2c2c");
          return gradient;
        },
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Present",
        data: presentCounts,
        fill: true,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, -80, 30, 500);
          gradient.addColorStop(0, "black");
          gradient.addColorStop(1, "blue");
          return gradient;
        },
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: "---Date---",
        },
        ticks: {
          font: {
            size: a > 786 ? 12 : 8,
          },
        },
      },
      y: {
        stacked: false,
        title: {
          display: true,
          text: "---Attendance Count---",
        },
        ticks: {
          font: {
            size: a > 786 ? 12 : 8,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="lg:w-1/2 w-full">
      <Bar className="min-h-72" options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
