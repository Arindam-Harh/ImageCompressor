import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";

export const Header = () => {
  return (
    <header className="nav">
      <NavLink to="/" end className="nav-logo">
        Logo
      </NavLink>

      <NavLink to="/account" className="nav-account" aria-label="Account">
        <FaUserCircle />
        <span>Account</span>
      </NavLink>
    </header>
  );
};