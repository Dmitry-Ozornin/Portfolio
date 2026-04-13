import AdminHeader from "@/components/headers/adminHeader";
import ProtectedRoute from "@/contexts/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <main className="admin" style={{ width: "100%" }}>
        <AdminHeader />
        {children}
      </main>
    </ProtectedRoute>
  );
}
