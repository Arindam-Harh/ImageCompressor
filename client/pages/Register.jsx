import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="main">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className="input-group">
          <input
            type="text"
            name="username"
            id="username"
            placeholder=" "
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" "
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder=" "
            autoComplete="new-password"
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
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