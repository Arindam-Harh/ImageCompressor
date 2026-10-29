import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const defaultUser = {
  email: "",
  password: "",
};

export const Login = () => {
  const [user, setUser] = useState(defaultUser);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        toast.success(`Login Successful`);
        setUser(defaultUser);
        navigate("/");
      } else if (response.status === 404) {
        toast.error(`Email not found`);
      } else if (response.status === 401) {
        toast.error(`Incorrect Password`);
      } else {
        console.error("Login failed with status:", response.status);
        toast.error(`Login Failed`);
      }
    } catch (error) {
      toast.error(`Login Failed`);
    }
  };
  return (
    <div className="main">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <h1>Login</h1>

        <div className="input-group">
          <input
            type="email"
            id="email"
            placeholder=" "
            autoComplete="email"
            name="email"
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
            autoComplete="current-password"
            name="password"
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
