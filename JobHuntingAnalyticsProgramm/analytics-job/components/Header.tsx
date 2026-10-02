import Link from "next/link";
import "@/styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <Link href="/">Главная</Link>
      <Link href="/job_website">Площадки</Link>
      <Link href="/settings">Настройки</Link>
    </header>
  );
};
export default Header;
