"use client";

import { useAuth } from "@/contexts/AuthContext";
export default function AdminPage() {
  const { logout } = useAuth();
  return (
    <main>
      <h1>Привет Админ</h1>
      <button onClick={logout} className="logout-button">
        Выйти
      </button>
    </main>
  );
}
