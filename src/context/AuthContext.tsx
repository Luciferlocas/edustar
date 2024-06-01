"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

interface AuthContextType {
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  res: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<any>(null);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/login', { username, password });

      if (response.status === 200) {        
        setRes(response.data);
        router.push("/attendance");
      } else {
        toast.error("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loading, login, res }}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            border: "1.5px solid #858585",
            padding: "8px 16px",
            color: "#b0b0b0",
            backgroundColor: "black",
            borderRadius: "4px",
            fontSize: "14px"
          },
          error: {
            iconTheme: {
              primary: "#b50404",
              secondary: "black",
            },
          },
          success: {
            iconTheme: {
              primary: "#016ae4",
              secondary: "black",
            },
          },
        }}
      />
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
