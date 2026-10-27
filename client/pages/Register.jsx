import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="main">
      <form className="register-form">
        <h1>Register</h1>

        <div className="input-group">
          <input type="text" id="username" placeholder=" " autoComplete="username" />
          <label htmlFor="username">Username</label>
        </div>

        <div className="input-group">
          <input type="email" id="email" placeholder=" " autoComplete="email" />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder=" "
            autoComplete="new-password"
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
          Register
        </button>
      </form>
    </div>
  );
};