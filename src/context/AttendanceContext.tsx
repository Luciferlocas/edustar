"use client"

import React, { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";

interface AttendanceContextType {
  loading: boolean;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

interface AttendanceProviderProps {
  children: ReactNode;
}

const AttendanceProvider: React.FC<AttendanceProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  

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
