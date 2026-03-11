"use client";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";

type NavLink = {
  label: string;
  href: string;
  title: string;
};
type Props = {
  navLinks: NavLink[];
};

const DropDownNavigation = ({ navLinks }: Props) => {
  const pathName = usePathname();
  return (
    <nav className="theHeaderDropdown ">
      <Nav variant="pills" activeKey="1">
        <NavDropdown
          title={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="theHeaderDropdown__button">
              <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            </svg>
          }
          id="nav-dropdown "
          className="theHeaderDropdown_no-caret "
        >
          {navLinks.map((link) => {
            const isActive = pathName === link.href;

            return (
              <Nav.Item key={link.label} className="theHeaderDropdown__box">
                <Nav.Link eventKey={link.label} href={link.href} className="theHeaderDropdown__box__link">
                  {link.title}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </NavDropdown>
      </Nav>
    </nav>
  );
};

export { DropDownNavigation };
