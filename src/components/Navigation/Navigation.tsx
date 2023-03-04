import classNames from "classnames";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/Theme/ThemeContext";
export const Navigation = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  return (
    <nav>
      <ul
        className={classNames("flex text-xl gap-8 py-4", {
          "text-light-font-primary": !isDarkMode,
          "text-dark-font-primary": isDarkMode,
        })}
      >
        <li>
          <NavLink to="/test">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/shows">Shows</NavLink>
        </li>
        <li>
          <NavLink to="/test">Anime</NavLink>
        </li>
      </ul>
    </nav>
  );
};
