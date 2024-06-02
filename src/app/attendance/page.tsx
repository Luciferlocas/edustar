"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useAttendance } from "@/context/AttendanceContext";
import { useAuth } from "@/context/AuthContext";
import Navmenu from "@/components/Navbar";

const Dashboard = () => {
  const { data } = useAuth();
  const { loading, AttendanceData, attendance, profile, particular } =
    useAttendance();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

  return <div className="px-2 py-4">{loading ? <Spinner /> : <Navmenu />}</div>;
};

export default Dashboard;
