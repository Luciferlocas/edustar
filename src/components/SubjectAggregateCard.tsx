import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Progress,
  Chip,
} from "@nextui-org/react";
import { useAttendance } from "@/context/AttendanceContext";
import { capitalizeTitle } from "@/lib/utils";
import { motion } from "framer-motion";

const SubjectAggregateCard = () => {
  const { particular, loading } = useAttendance();
  
  if (!particular || particular.length === 0) {
    return (
      <Card className="bg-black border-[0.5px] border-zinc-600 w-full p-4">
        <CardHeader className="pb-0 pt-0 flex-col items-start">
          <h4 className="text-xl font-bold">Subject-wise Attendance</h4>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-gray-400">No attendance data available</p>
        </CardBody>
      </Card>
    );
  }

  // Sort subjects by attendance percentage (highest first)
  const sortedSubjects = [...particular].sort(
    (a, b) => b.percentageAttendance - a.percentageAttendance
  );

  return (
    <Card className="bg-black border-[0.5px] border-zinc-600 w-full">
      <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
        <h4 className="text-xl font-bold">Subject-wise Attendance</h4>
      </CardHeader>
      <CardBody className="overflow-y-auto max-h-[500px]">
        {sortedSubjects.map((subject, index) => {
          const percent = subject.percentageAttendance || 0;
          const danger = percent <= 50;
          const warn = percent < 75 && percent > 50;
          const primary = percent >= 75;
          
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">
                    {capitalizeTitle(subject.name)}
                  </span>
                  <Chip
                    size="sm"
                    className={`${
                      danger 
                        ? "bg-danger-100 text-danger-600" 
                        : warn 
                        ? "bg-warning-100 text-warning-600" 
                        : "bg-success-100 text-success-600"
                    }`}
                  >
                    {percent.toFixed(1)}%
                  </Chip>
                </div>
                <Progress
                  size="md"
                  radius="sm"
                  value={percent}
                  classNames={{
                    base: "w-full",
                    track: "drop-shadow-md",
                    indicator: `${
                      danger
                        ? "bg-danger-500"
                        : warn
                        ? "bg-warning-500"
                        : "bg-success-500"
                    }`,
                  }}
                />
                <div className="flex justify-between mt-1 text-sm text-gray-400">
                  <span>Present: {subject.presentLeactures}/{subject.totalLeactures}</span>
                  <span>Absent: {subject.totalLeactures - subject.presentLeactures}</span>
                </div>
              </div>
              {index < sortedSubjects.length - 1 && <Divider className="my-2" />}
            </motion.div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default SubjectAggregateCard; 