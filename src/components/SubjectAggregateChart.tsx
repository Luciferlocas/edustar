import React, { useMemo } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useAttendance } from "@/context/AttendanceContext";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SubjectAggregateChart = () => {
  const { particular, loading } = useAttendance();

  const chartData = useMemo(() => {
    if (!particular || particular.length === 0) {
      return null;
    }

    // Sort subjects by attendance percentage (highest first)
    const sortedSubjects = [...particular].sort(
      (a, b) => b.percentageAttendance - a.percentageAttendance
    );

    // Get top 5 subjects for better visualization
    const topSubjects = sortedSubjects.slice(0, 5);

    // Generate colors based on attendance percentage
    const generateColors = (percent: number) => {
      if (percent <= 50) return "rgba(243, 18, 96, 0.8)"; // Danger
      if (percent < 75) return "rgba(234, 179, 8, 0.8)"; // Warning
      return "rgba(54, 211, 153, 0.8)"; // Success
    };

    const backgroundColors = topSubjects.map(subject => 
      generateColors(subject.percentageAttendance)
    );

    return {
      labels: topSubjects.map(subject => subject.name),
      datasets: [
        {
          data: topSubjects.map(subject => subject.percentageAttendance),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace("0.8", "1")),
          borderWidth: 1,
        },
      ],
    };
  }, [particular]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "white",
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: true,
        text: "Subject Attendance Distribution",
        color: "white",
        font: {
          size: 14,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    },
  };

  if (!chartData) {
    return (
      <Card className="bg-black border-[0.5px] border-zinc-600 h-[300px] w-full p-4">
        <CardHeader className="pb-0 pt-0 flex-col items-start">
          <h4 className="text-xl font-bold">Subject Attendance Chart</h4>
        </CardHeader>
        <CardBody className="flex items-center justify-center">
          <p className="text-sm text-gray-400">No attendance data available</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="bg-black border-[0.5px] border-zinc-600 h-[300px] w-full p-4">
      <CardHeader className="pb-0 pt-0 flex-col items-start">
        <h4 className="text-xl font-bold">Subject Attendance Chart</h4>
      </CardHeader>
      <CardBody>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          <Doughnut data={chartData} options={options} />
        </motion.div>
      </CardBody>
    </Card>
  );
};

export default SubjectAggregateChart; 