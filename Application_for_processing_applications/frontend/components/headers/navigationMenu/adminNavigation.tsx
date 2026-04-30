"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import styles from "../../../Css/header/header.module.css";

interface NavItem {
  title: string;
  href: string;
}

const AdminNavigation: NavItem[] = [
  { title: "Главная", href: "/admin" },
  { title: "База пользователей", href: "/admin/users" },
  { title: "Создать пользователя", href: "/admin/createUser" },
];

export default function AdminHeadNav() {
  const { logout } = useAuth();

  return (
    <nav className={styles.Header__navMenu}>
      {AdminNavigation.map((item) => (
        <Link key={item.title} href={item.href} className={`${styles.Header__navMenu__link}`}>
          {item.title}
        </Link>
      ))}
      <button onClick={logout} className={`${styles.Header__navMenu__logoutBtn}`}>
        Завершить сеанс
      </button>
    </nav>
  );
}
