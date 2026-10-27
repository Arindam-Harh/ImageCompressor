import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="main">
      <form className="login-form">
        <h1>Login</h1>

        <div className="input-group">
          <input type="email" id="email" placeholder=" " autoComplete="email" />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder=" "
            autoComplete="current-password"
          />
          <label htmlFor="password">Password</label>

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className="main-btn">
          Login
        </button>

        <p className="switch-text">
          Don't have an account?
          <NavLink to="/register" className="switch-link">
            Create one
          </NavLink>
        </p>
      </form>
    </div>
  );
};