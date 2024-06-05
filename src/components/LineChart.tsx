import { useAttendance } from "@/context/AttendanceContext";
import React from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Filler,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AttendanceRecord {
  absentDate: string;
  totalAbsent: number;
  totalPresent: number;
}

const LineChart: React.FC = () => {
  const { graphData } = useAttendance();
  const last10Data = graphData.slice(-10);

  const labels = last10Data.map((record: AttendanceRecord) =>
    moment(record.absentDate).format("DD-MMM")
  );

  const attendancePercentage = last10Data.map((record: AttendanceRecord) => {
    const total = record.totalAbsent + record.totalPresent;
    return total === 0 ? 0 : (record.totalPresent / total) * 100;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Attendance Percentage",
        data: attendancePercentage,
        borderColor: "blue",
        tension: 0.2,
        borderWidth: 1,
        fill: true,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, -80, 30, 200);
          gradient.addColorStop(0, "blue");
          gradient.addColorStop(1, "transparent");
          return gradient;
        },
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBorderWidth: 1,
        pointBackgroundColor: "blue",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "---Date---",
        },
      },
      y: {
        title: {
          display: true,
          text: "---Attendance Percentage---",
        },
        beginAtZero: true,
        max: 100,
      },
    },
    interaction: {
      mode: "nearest",
    },
    elements: {
      point: {
        hoverRadius: 10,
        hitRadius: 10,
        hoverBorderWidth: 2,
      },
    },
  };

  return (
    <div className="lg:w-1/2 w-full">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default LineChart;