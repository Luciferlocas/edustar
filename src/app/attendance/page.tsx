"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useAttendance } from "@/context/AttendanceContext";
import { useAuth } from "@/context/AuthContext";
import Navmenu from "@/components/Navbar";
import Acard from "@/components/Acard";
import { ScrollShadow } from "@nextui-org/react";
import Graph from "@/components/Graph";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { data } = useAuth();
  const { loading, AttendanceData, attendance, profile, particular } =
    useAttendance();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const cardsToRender = particular.length > 0 ? particular : new Array(10).fill(0);

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
      <ScrollShadow
        orientation="vertical"
        hideScrollBar
        className="flex flex-col h-[calc(100vh-8rem)] gap-4 self-end"
      >
        {cardsToRender.map((e: any, i: number) => (
          <motion.div
            key={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: i * 0.5 }}
          >
            <Acard
              loading={loading}
              name={e.name}
              total={e.totalLeactures}
              present={e.presentLeactures}
            />
          </motion.div>
        ))}
      </ScrollShadow>
      <Graph />
    </div>
  );
};

export default Dashboard;
