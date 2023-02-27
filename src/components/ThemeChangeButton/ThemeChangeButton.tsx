import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";

export const ThemeChangeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-900"
      onClick={toggleTheme}
    >
      {theme === "light" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};
