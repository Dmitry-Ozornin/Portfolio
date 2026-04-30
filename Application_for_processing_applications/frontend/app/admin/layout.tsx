import Header from "@/components/headers/Header";
import ProtectedRoute from "@/contexts/ProtectedRoute";
import AdminProvider from "@/store/admin/AdminProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Header />
        <div>{children}</div>
      </ProtectedRoute>
    </AdminProvider>
  );
}
