import classNames from "classnames";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";

export const ThemeChangeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDarkMode = theme !== "light";
  return (
    <button
      className={classNames("px-4 py-2 rounded-md", {
        "bg-dark-secondary": isDarkMode,
        "bg-light-secondary": !isDarkMode,
      })}
      onClick={toggleTheme}
    >
      {theme === "light" ? "Light Mode" : "Dark Mode"}
    </button>
  );
};
