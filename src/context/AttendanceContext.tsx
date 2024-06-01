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
import { useRouter } from "next/navigation";

interface AttendanceContextType {
  loading: boolean;
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
  const router = useRouter();

  useEffect(() => {
    if (res) {
      const extractedUserId = res?.["X-UserId"];
      setUserId(extractedUserId);
    }
  }, [res]);

  const AttendanceData = async () => {
    if (!userId) {
      toast.error("Please login!");
      router.push("/");
    }

    try {
      const response = await axios.get(
        `https://beta.edumarshal.com/api/SubjectAttendance/GetPresentAbsentStudent?isDateWise=${false}&termId=${0}&userId=${userId}&y=${0}`,
        {
          headers: {
            Cookie: `_ga_P21KD3ESV2=GS1.1.1717220027.3.0.1717220027.0.0.0; _ga=GA1.2.257840654.1716482344; _gid=GA1.2.287587932.1716482344`,
            Authorization: `Bearer ${res?.access_token}`,
            "X-Wb": 1,
            Sessionid: `${res?.SessionId}`,
            "X-Contextid": 194,
            "X-Userid": userId,
            X_token: res?.X_Token,
            "X-Rx": 1,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    AttendanceData();
  }, [userId]);

  return (
    <AttendanceContext.Provider value={{ loading }}>
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
