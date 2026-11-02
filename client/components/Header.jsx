import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "./img1.png";
import "./Header.css";
import { ThemeToggle } from "./ThemeToggle";

const SITE_NAME = "ImageZen";

const links = [
  { label: "Home", to: "/", end: true },
  { label: "Compress", to: "/compress" },
  { label: "Convert", to: "/convert" },
  { label: "History", to: "/history" },
];

export const Header = () => {
  return (
    <header className="nav">
      <NavLink to="/" end className="nav-logo" aria-label={SITE_NAME}>
        <img src={logo} alt={SITE_NAME} />
      </NavLink>

      <div className="nav-right">
        <nav className="nav-links" aria-label="Primary">
          {links.map(({ label, to, end }) => (
            <NavLink key={to} to={to} end={end} className="nav-link">
              {label}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle/>

        <NavLink to="/account" className="nav-account" aria-label="Account">
          <FaUserCircle aria-hidden="true" />
          <span>Account</span>
        </NavLink>
      </div>
    </header>
  );
};