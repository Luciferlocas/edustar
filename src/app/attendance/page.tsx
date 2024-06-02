"use client";

import { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useAttendance } from "@/context/AttendanceContext";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { data, logout } = useAuth();
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

  return (
    <div className="grid place-content-center min-h-screen w-screen">
      {loading ? (
        <Spinner />
      ) : (
        <Button onClick={logout} variant="flat" color="danger">
          Logout
        </Button>
      )}
    </div>
  );
};

export default Dashboard;
