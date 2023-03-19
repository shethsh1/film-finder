import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo192.png";
import { ThemeChangeButton } from "../ThemeChangeButton/ThemeChangeButton";
import { Navigation } from "../Navigation/Navigation";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";
import MediaSearchQuery from "../MediaSearchQuery/MediaSearchQuery";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  return (
    <div
      className={classNames("h-[140px] fixed z-50 w-full px-6 pt-3", {
        "bg-light-primary text-light-font-primary": !isDarkMode,
        "bg-dark-primary text-dark-font-primary": isDarkMode,
      })}
    >
      <header className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <NavLink to="/" className="flex gap-4 items-center">
            <div>
              <img src={logo} alt="logo" className="w-8 h-8" />
            </div>
            <h1 className="text-3xl" style={{ fontFamily: "Lobster Two" }}>
              Film Finder
            </h1>
          </NavLink>
          {location.pathname !== "/" && (
            <MediaSearchQuery
              style={{ width: "500px", marginLeft: "20px" }}
              className="lg:block hidden relative"
            />
          )}
        </div>

        <div>
          <ThemeChangeButton />
        </div>
      </header>
      <Navigation />
    </div>
  );
};
