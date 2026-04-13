"use client";
import ProtectedRoute from "@/contexts/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={["ADMIN"]}>{children}</ProtectedRoute>;
}
