// src/components/ThemeSwitch.jsx
import React from "react";
import useTheme from "../hooks/useTheme";
import "./ThemeSwitch.css"; // Budeme potrebovať štýly pre samotný switch

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-switch-container">
      {/* Label pre prístupnosť */}
      <label className="switch-label">
        <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <span className="mode-text">
        {isDarkMode ? "Tmavá téma" : "Svetlá téma"}
      </span>
    </div>
  );
};

export default ThemeSwitch;
