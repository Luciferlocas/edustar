"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";

interface AuthContextType {
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  data: dataType;
  logout: () => void;
}

interface dataType {
  access_token: string;
  token_type: string;
  expires_in: number;
  "X-ContextId": string;
  "X-UserId": string;
  "X-LogoId": string;
  "X-RX": string;
  PChangeSetting: string;
  PChangeStatus: string;
  SessionId: string;
  X_Token: string;
  ".issued": string;
  ".expires": string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const res = Cookies.get("user");
    if (res) {
      setData(JSON.parse(atob(res)));
      router.push("/attendance");
    }
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/login", { username, password });

      if (response.status === 200) {
        const encoded = btoa(JSON.stringify(response.data));
        Cookies.set("user", encoded, {
          expires: 331,
          sameSite: "Strict",
          secure: true,
        });
        setData(response.data);
        router.push("/attendance");
      } else {
        toast.error("Please check your credentials and try again.");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("user");
    toast.error("Login again!");
    router.push("/");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ loading, login, logout, data }}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            border: "1.5px solid #858585",
            padding: "8px 16px",
            color: "#b0b0b0",
            backgroundColor: "black",
            borderRadius: "4px",
            fontSize: "14px",
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
