import { Navigation } from "./Navigation";
import "../app/css/TheHeader/theHeader.css";
import { DropDownNavigation } from "./DropDownNavigation";

const navItems = [
  { label: "Home", href: "/", title: "Главная" },
  { label: "Gallery", href: "/gallery", title: "Галерея" },
  { label: "prices", href: "/prices", title: "Стоимость и условия работы" },
  { label: "Contact", href: "/contact", title: "Контакты" },
];

const TheHeader = () => {
  return (
    <>
      <Navigation navLinks={navItems} />
      <DropDownNavigation navLinks={navItems} />
    </>
  );
};
export { TheHeader };
