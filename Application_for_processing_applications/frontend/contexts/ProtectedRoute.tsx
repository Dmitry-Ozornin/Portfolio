"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
      return;
    }

    // 👇 ТОЛЬКО ЭТО ДОБАВИТЬ
    if (!isLoading && user && allowedRoles && !allowedRoles.includes(user.role)) {
      logout(); // удаляет токен и кидает на логин
    }
  }, [isAuthenticated, isLoading, user, router, allowedRoles, logout]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
