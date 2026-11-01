import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import { url } from "../config/api.js";
import "./Register.css";

const defaultUser = {
  username: "",
  email: "",
  password: "",
};

export const Register = () => {
  const [user, setUser] = useState(defaultUser);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        await checkAuth();
        toast.success("Registration Successful");
        navigate("/");
      } else {
        const data = await response.json();
        toast.error(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration Failed");
    }
  };
  return (
    <div className="main">
      <form className="register-form" onSubmit={handleFormSubmit}>
        <h1>Register</h1>

        <div className="input-group">
          <input
            type="text"
            id="username"
            placeholder=" "
            name="username"
            autoComplete="username"
            value={user.username}
            onChange={handleInputChange}
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            id="email"
            placeholder=" "
            name="email"
            autoComplete="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder=" "
            name="password"
            autoComplete="new-password"
            value={user.password}
            onChange={handleInputChange}
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
        <p className="switch-text">
          Already have an account?&nbsp;
          <NavLink to="/login" className="switch-link">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};
