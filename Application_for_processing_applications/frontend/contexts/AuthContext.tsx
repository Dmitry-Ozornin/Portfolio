"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  login: string;
  role: string;
  firstName: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Проверка токен при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/me");
        setUser(data);

        // Если пользователь авторизован и пытается зайти на на страницу логина
        if (window.location.pathname === "/login") {
          switch (data.role) {
            case "ADMIN":
              router.push("/admin");
              break;
            case "MANAGER":
              router.push("/manager");
              break;
            case "WORKER":
              router.push("/worker");
              break;
            default:
              router.push("/");
              break;
          }
        }
      } catch (error) {
        console.log("Ошибка доступа");
        setUser(null);
        // Если не на странице логина, редирект туда
        if (window.location.pathname !== "/") {
          router.push("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth надо использовать вместе с AuthProvider");
  }
  return context;
}
