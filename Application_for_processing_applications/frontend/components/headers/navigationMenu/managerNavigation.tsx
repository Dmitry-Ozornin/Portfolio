"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import styles from "../../../Css/siberBar/siderBar.module.css";

interface NavItem {
  title: string;
  href: string;
}

const ManagerNavigation: NavItem[] = [{ title: "Главная", href: "/manager" }];

export default function AdminSidebar() {
  const { logout, user } = useAuth();

  return;
}
