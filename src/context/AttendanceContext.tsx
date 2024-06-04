"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

interface AttendanceContextType {
  loading: boolean;
  AttendanceData: () => Promise<void>;
  attendance: any;
  profile: any;
  particular: any;
  student: number;
  pdp: any;
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
  const [student, setStudent] = useState<number>(0);
  const [pdp, setPdp] = useState([]);

  useEffect(() => {
    if (student) {
      PDPData();
    }
  }, [student]);

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
        setStudent(
          response.data.stdSubAtdDetails.studentSubjectAttendance[0]
            .admissionNumber
        );
      } else {
        toast.error("Failed to fetch attendance");
      }
    } catch (error) {
      toast.error("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  const PDPData = async () => {
    if (!student) return;
    setLoading(true);
    try {
      const res = await axios.get("/api/pdp", {
        params: {
          studentId: student,
          userId: data["X-UserId"],
          accessToken: data.access_token,
          sessionId: data.SessionId,
          xToken: data.X_Token,
        },
      });

      if (res.status === 200) {
        setPdp(res.data);
      } else {
        toast.error("Failed to fetch PDP data");
      }
    } catch (error) {
      toast.error("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        loading,
        AttendanceData,
        attendance,
        profile,
        particular,
        student,
        pdp,
      }}
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
