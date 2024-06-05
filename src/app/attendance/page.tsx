"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useAttendance } from "@/context/AttendanceContext";
import { useAuth } from "@/context/AuthContext";
import Navmenu from "@/components/Navbar";
import SubjectCard from "@/components/SubjectCard";
import { ScrollShadow } from "@nextui-org/react";
import GraphCard from "@/components/Graph";
import { motion } from "framer-motion";
import TotalCard from "@/components/TotalCard";


const Dashboard = () => {
  const { data } = useAuth();
  const { loading, AttendanceData, attendance, particular, pdp } =
    useAttendance();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const cardsToRender =
    particular.length > 0 ? particular : new Array(10).fill(0);
  const total = attendance.stdSubAtdDetails || {
    overallLecture: 0,
    overallPresent: 0,
  };
  const pdpTrue = pdp.filter((item: any) => item.isInAbsent).length;

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    if (!data) {
      redirect("/");
    } else if (attendance.length === 0) {
      const callFunction = AttendanceData();
      toast.promise(callFunction, {
        loading: "Processing...",
        error: "Error occurred, please refresh",
        success: "Success!",
      });
    }
  }, [data, attendance, isInitialLoad]);

  const cardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="px-4 py-6 min-h-screen w-screen bg-black flex flex-col gap-5">
      <Navmenu />
      <main className="flex md:flex-row flex-col-reverse gap-4 w-full">
        <ScrollShadow
          orientation="vertical"
          hideScrollBar
          className="flex flex-col gap-4 w-full md:h-[calc(100vh-7rem)] h-full min-w-[20rem]"
        >
          <div className="flex lg:flex-row flex-col gap-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 1 }}
              className="w-full z-50"
            >
              <TotalCard
                loading={loading}
                total={total.overallLecture}
                present={total.overallPresent}
                name="Total Attendance"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: 1 }}
              className="w-full"
            >
              <TotalCard
                loading={loading}
                total={pdp.length}
                present={pdp.length - pdpTrue}
                name="PDP Attendance"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            variants={cardVariants}
            transition={{ duration: 0.5, delay: 2 }}
            className="w-full"
          >
            <GraphCard />
          </motion.div>
        </ScrollShadow>
        <ScrollShadow
          orientation="horizontal"
          hideScrollBar
          className="flex md:flex-col flex-row gap-4 md:h-[calc(100vh-7rem)] h-40 min-w-[20rem]"
        >
          {cardsToRender.map((e: any, i: number) => (
            <motion.div
              key={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5, delay: i * 0.5 }}
            >
              <SubjectCard
                loading={loading}
                name={e.name}
                total={e.totalLeactures}
                present={e.presentLeactures}
              />
            </motion.div>
          ))}
        </ScrollShadow>
      </main>
    </div>
  );
};

export default Dashboard;
