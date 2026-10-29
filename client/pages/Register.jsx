import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const defaultUser = {
  username: "",
  email: "",
  password: "",
};

export const Register = () => {
  const [user, setUser] = useState(defaultUser);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const handelFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        toast.success(`Registration Successful`);
        setUser(defaultUser);
        navigate("/login");
      } else if (response.status === 409) {
        toast.error(`Email already exists`);
      } else {
        console.error("Registration error:", error);
        toast.error(`Registration Failed`);
      }
    } catch (error) {
      toast.error(`Registration Failed`);
    }
  };
  return (
    <div className="main">
      <form className="register-form" onSubmit={handelFormSubmit}>
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
      </form>
    </div>
  );
};
