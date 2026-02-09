import { Navigation } from "./Navigation";
import "../app/css/TheHeader/theHeader.css";

const navItems = [
  { label: "Home", href: "/", title: "Главная" },
  { label: "Gallery", href: "/gallery", title: "Галерея" },
  { label: "prices", href: "/prices", title: "Стоимость и условия работы" },
  { label: "Contact", href: "/contact", title: "Контакты" },
];

const TheHeader = () => {
  return (
    <header className="theHeader">
      <Navigation navLinks={navItems} />
    </header>
  );
};
export { TheHeader };
