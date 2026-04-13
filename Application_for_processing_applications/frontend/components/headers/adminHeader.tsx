"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";


export default function AdminHeader() {
  const { logout, user } = useAuth();

  return (
    <header style={{ width: "100vw", backgroundColor: "red" }}>
      <h1>Добро пожаловать {user?.firstName} </h1>

      <nav><Link href={`/admin/createUser`}>Создать пользователя</Link></nav>
      <button onClick={logout}>Выход</button>
    </header>
  );
}
