import { useState } from "react";

export const Register = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="main">
      <form className="register-form">
        <input
          type="text"
          name="username"
          className="username-form"
          placeholder="Enter Username"
          required
        />
        <input
          type="email"
          name="email"
          className="email-form"
          placeholder="Enter Email"
          required
        />
        <section className="password-section">
          <input
            type={toggle ? "password" : "text"}
            name="password"
            className="password-form"
            placeholder="Enter Password"
            required
          />
          <button type="button" onClick={() => setToggle(!toggle)}>
            {toggle ? "show" : "hide"}
          </button>
        </section>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
