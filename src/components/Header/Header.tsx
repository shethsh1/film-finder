import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo192.png";
import { ThemeChangeButton } from "../ThemeChangeButton/ThemeChangeButton";
import { Navigation } from "../Navigation/Navigation";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";

export const Header = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  return (
    <div
      className={classNames("h-[128px] fixed z-50 w-full px-6 pt-3", {
        "bg-light-primary text-light-font-primary": !isDarkMode,
        "bg-dark-primary text-dark-font-primary": isDarkMode,
      })}
    >
      <header className="flex justify-between items-center">
        <NavLink to="/" className="flex gap-4 items-center">
          <div>
            <img src={logo} alt="logo" className="w-8 h-8" />
          </div>
          <h1 className="text-3xl" style={{ fontFamily: "Lobster Two" }}>
            Film Finder
          </h1>
        </NavLink>
        <div>
          <ThemeChangeButton />
        </div>
      </header>
      <Navigation />
    </div>
  );
};
