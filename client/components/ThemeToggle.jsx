import { useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark",
  );

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", next);

    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked: the theme still changes for this visit */
    }

    setTheme(next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      {theme === "dark" ? (
        <LuSun aria-hidden="true" />
      ) : (
        <LuMoon aria-hidden="true" />
      )}
    </button>
  );
};