import { NavLink } from "react-router-dom";
import "./Footer.css";
import {
  FaHome,
  FaCompressAlt,
  FaExchangeAlt,
  FaHistory,
  FaUserCircle,
} from "react-icons/fa";

const tabs = [
  { label: "Home", to: "/", icon: FaHome, end: true },
  { label: "Compress", to: "/compress", icon: FaCompressAlt },
  { label: "Convert", to: "/convert", icon: FaExchangeAlt },
  { label: "History", to: "/history", icon: FaHistory },
];

const links = [
  { label: "Home", to: "/", end: true },
  { label: "Compress", to: "/compress" },
  { label: "Convert", to: "/convert" },
  { label: "History", to: "/history" },
];
export const Footer = () => {
  return (
    <footer className="footer">
      <p className="cpy">
        &copy; {new Date().getFullYear()} All rights reserved
      </p>

      <nav className="footer-tabs" aria-label="Main">
        {tabs.map(({ label, to, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="footer-tab">
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};