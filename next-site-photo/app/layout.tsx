import type { Metadata } from "next";
import "./globals.css";
import { TheHeader } from "@/components/TheHeader";
import { TheFooter } from "@/components/TheFooter";

export const metadata: Metadata = {
  title: "Фотограф Смирнова Диана",
  description: "Официальный сайт фотографа Смирновой Дианы",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <TheHeader />
        <main>{children}</main>
        <TheFooter />
      </body>
    </html>
  );
}
