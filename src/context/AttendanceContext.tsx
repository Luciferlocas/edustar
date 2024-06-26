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
  graphData: AggregatedRecord[];
  aggregatedData: AggregatedRecordData;
  attendanceBySubject: AttendanceBySubject;
}

interface AttendanceBySubject {
  [subjectId: number]: AttendanceEntry[];
}

interface AggregatedRecordData {
  [key: string]: AggregatedRecord;
}

interface pdpData{
  [key: number]: any;
}

interface AttendanceEntry {
  date: string;
  P: number;
  A: number;
}

interface AggregatedRecord {
  absentDate: string;
  totalAbsent: number;
  totalPresent: number;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [attendance, setAttendance] = useState([]);
  const [profile, setProfile] = useState([]);
  const [particular, setParticular] = useState([]);
  const [student, setStudent] = useState<number>(0);
  const [pdp, setPdp] = useState<pdpData[]>([]);
  const [everyday, setEveryday] = useState([]);
  const aggregatedData: AggregatedRecordData = {};
  const attendanceBySubject: AttendanceBySubject = {};

  console.log(pdp);
  

  everyday.forEach((item: any) => {
    const { isAbsent, absentDate } = item;
    if (!aggregatedData[absentDate]) {
      aggregatedData[absentDate] = {
        absentDate,
        totalAbsent: 0,
        totalPresent: 0,
      };
    }
    if (isAbsent) aggregatedData[absentDate].totalAbsent += 1;
    else aggregatedData[absentDate].totalPresent += 1;
  });

  everyday.forEach(
    (record: { subjectId: number; absentDate: string; isAbsent: boolean }) => {
      const { subjectId, absentDate, isAbsent } = record;
      if (!attendanceBySubject[subjectId]) {
        attendanceBySubject[subjectId] = [];
      }

      let entry = attendanceBySubject[subjectId].find(
        (entry) => entry.date === absentDate
      );

      if (!entry) {
        entry = { date: absentDate, P: 0, A: 0 };
        attendanceBySubject[subjectId].push(entry);
      }

      if (isAbsent) {
        entry.A++;
      } else {
        entry.P++;
      }
    }
  );

  let pAbsent = 0;
  let pPresnt = 0;

  const graphData: AggregatedRecord[] = Object.values(aggregatedData).map(
    (record) => {
      pAbsent += record.totalAbsent;
      pPresnt += record.totalPresent;
      return {
        absentDate: record.absentDate,
        totalAbsent: pAbsent,
        totalPresent: pPresnt,
      };
    }
  );

  useEffect(() => {
    if (student) {
      PDPData();
    }
  }, [student]);

  const AttendanceData = async (): Promise<void> => {
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
        setEveryday(
          response.data.attendanceData.concat(response.data.extraLectures)
        );
      } else {
        return Promise.reject(new Error("Failed to fetch attendance"));
      }
    } catch (error: any) {
      if (error.response) {
        return Promise.reject(
          new Error(
            error.response.data.message || "Error fetching attendance data"
          )
        );
      } else if (error.request) {
        return Promise.reject(new Error("No Internet Connection"));
      } else {
        return Promise.reject(new Error(error.message));
      }
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
      toast.error("No Internet Connection");
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
        graphData,
        aggregatedData,
        attendanceBySubject,
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
