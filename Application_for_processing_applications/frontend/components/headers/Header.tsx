"use client";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import styles from "../../Css/header/header.module.css";
import AdminHeadNav from "./navigationMenu/adminNavigation";
import { ReactNode } from "react";

export enum PageTitle {
  createUser = "Создание пользователя",
  users = "База пользователей",
  changeUser = "Изменение пользователя",
}

export default function Header() {
  const pathName = usePathname();
  const { logout, user } = useAuth();

  const getTitle = (): string => {
    if (pathName.startsWith("/admin/users/") && pathName !== "/admin/users") {
      return PageTitle.changeUser;
    }
    switch (pathName) {
      case "/admin":
        return `Добро пожаловать, ${user?.firstName}`;
      case "/admin/createUser":
        return PageTitle.createUser;
      case "/admin/users":
        return PageTitle.users;

      default:
        return "";
    }
  };

  const renderNav = (): ReactNode => {
    switch (user?.role) {
      case "ADMIN":
        return <AdminHeadNav />;
      case "MANAGER":
      // return <ManagerHeadNav />;
      default:
        return null;
    }
  };
  return (
    <>
      <header className={styles.Header}>
        <h1> {getTitle()} </h1>
        <section>{renderNav()}</section>
      </header>
    </>
  );
}
