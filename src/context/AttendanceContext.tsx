"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

interface AttendanceContextType {
  loading: boolean;
  AttendanceData: () => Promise<void>;
  attendance: any;
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
  const { res } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (res) {
      const extractedUserId = res?.["X-UserId"];
      setUserId(extractedUserId);
    }
  }, [res]);

  const accessToken = res?.access_token;
  const sessionId = res?.SessionId;
  const xToken = res?.X_Token;

  const AttendanceData = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/attendance", {
        userId,
        accessToken,
        sessionId,
        xToken,
      });
      if (response.status === 200) {
        setAttendance(response.data);
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
    <AttendanceContext.Provider value={{ loading, AttendanceData, attendance }}>
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
