import { Metadata } from "next";
import Login from "@/components/forms/loginForm/Login";


export const metadata: Metadata = {
  title: "Страница входа",
  description: "Данная страница предназначена для входа в систему",
};

export default function Home() {
  return (
    <main>
      <Login />
    </main>
  );
}
