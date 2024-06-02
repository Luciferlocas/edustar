"use client";
import { useAttendance } from "@/context/AttendanceContext";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const page = () => {
  const { res } = useAuth();
  if (!res) redirect("/");

  const { loading, attendance, AttendanceData } = useAttendance();

  useEffect(() => {
    if (attendance.length === 0) {
      const callFunction = AttendanceData();
      toast.promise(callFunction, {
        loading: "Processing...",
        error: "Error occured, please refresh",
        success: "Success!",
      });
    }
  }, [attendance]);

  return (
    <div className="grid place-content-center min-h-screen w-screen">
      {loading ? <Spinner /> : <p>Hello dear</p>}
    </div>
  );
};

export default page;
