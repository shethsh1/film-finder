import classNames from "classnames";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavDropdown } from "../NavDropdown/NavDropdown";

const NavItems = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/movies",
    label: "Movies",
  },
  {
    to: "/shows",
    label: "Shows",
  },
  {
    to: "/anime",
    label: "Anime",
  },
];

export const Navigation = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  return (
    <nav className="mt-4">
      <ul
        className={classNames("flex text-xl gap-16 py-4", {
          "text-light-font-primary": !isDarkMode,
          "text-dark-font-primary": isDarkMode,
        })}
      >
        {NavItems.map((item, i) => (
          <li className={"md:block hidden "}>
            <NavLink
              key={i}
              to={item.to}
              className={({ isActive }) =>
                classNames({ "font-bold": isActive })
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        <NavDropdown
          label={<GiHamburgerMenu size={25} />}
          hideArrow={true}
          className={"md:hidden block"}
        >
          {NavItems.map((item, i) => (
            <NavDropdown.Item key={i} href={item.to} label={item.label} />
          ))}
        </NavDropdown>
      </ul>
    </nav>
  );
};
