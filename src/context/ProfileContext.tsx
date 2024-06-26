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

interface ProfileContextType {
  loading: boolean;
  userProfile: any;
  blob: number;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface AttendanceProviderProps {
  children: ReactNode;
}

const ProfileProvider: React.FC<AttendanceProviderProps> = ({ children }) => {
  const { data } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [blob, setBlob] = useState<number>(0);

  useEffect(() => {
    if (data) UserData();
  }, [data]);

  const UserData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get("/api/profile", {
        params: {
          userId: data["X-UserId"],
          accessToken: data.access_token,
          sessionId: data.SessionId,
          xToken: data.X_Token,
        },
      });

      if (response.status === 200) {
        setUserProfile(response.data);
        setBlob(response.data.profilePictureId);
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

  return (
    <ProfileContext.Provider
      value={{
        loading,
        userProfile,
        blob,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within an ProfileProvider");
  }
  return context;
};

export { ProfileProvider, useProfile };
