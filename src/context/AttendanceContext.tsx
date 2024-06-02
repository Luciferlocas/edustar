"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

interface AttendanceContextType {
  loading: boolean;
  AttendanceData: () => Promise<void>;
  attendance: any;
  profile: any;
  particular: any;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(
  undefined
);

interface AttendanceProviderProps {
  children: ReactNode;
}

const AttendanceProvider: React.FC<AttendanceProviderProps> = ({
  children,
}) => {
  const { data } = useAuth();
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [profile, setProfile] = useState([]);
  const [particular, setParticular] = useState([]);

  const AttendanceData = async () => {
    if (!data["X-UserId"]) return;
    setLoading(true);
    try {
      const response = await axios.get("/api/attendance", {
        params: {
          userId: data["X-UserId"],
          accessToken: data.access_token,
          sessionId: data.SessionId,
          xToken: data.X_Token,
        },
      });

      if (response.status === 200) {
        setAttendance(response.data);
        setParticular(response.data.stdSubAtdDetails.subjects);
        setProfile(response.data.stdSubAtdDetails.studentSubjectAttendance);
      } else {
        toast.error("Failed to fetch attendance");
      }
    } catch (error) {
      toast.error("Server not responponding..");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AttendanceContext.Provider
      value={{ loading, AttendanceData, attendance, profile, particular }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

const useAttendance = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error("useAttendance must be used within an AttendanceProvider");
  }
  return context;
};

export { AttendanceProvider, useAttendance };
