import classNames from "classnames";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavDropdown } from "../NavDropdown/NavDropdown";
import { LoginModal } from "..";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import * as HelperService from "../../util/helper";
import { logout } from "../../features/authSlice";
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
  const isDarkMode = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const signOut = () => {
    dispatch(logout());
  };

  const handleTab = (newTab: "login" | "signup") => {
    setTab(newTab);
  };

  return (
    <>
      {isOpen && (
        <LoginModal
          isOpen={isOpen}
          onClose={closeModal}
          tab={tab}
          handleTab={handleTab}
        ></LoginModal>
      )}

      <nav className="mt-4 flex justify-between items-center">
        <ul
          className={classNames("flex text-xl gap-16 py-4", {
            "text-light-font-primary": !isDarkMode,
            "text-dark-font-primary": isDarkMode,
          })}
        >
          {NavItems.map((item, i) => (
            <li key={i} className={"md:block hidden "}>
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
        {!token ? (
          <div className="inline-flex gap-2">
            <button
              onClick={() => {
                handleTab("login");
                openModal();
              }}
              className={classNames("", {
                "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white py-2 px-4 rounded border border-gray-800 transition-colors duration-200":
                  true,
              })}
            >
              Login
            </button>
            <button
              onClick={() => {
                handleTab("signup");
                openModal();
              }}
              className={classNames("", {
                "bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-indigo-900 hover:to-blue-900 text-white py-2 px-4 rounded":
                  true,
              })}
            >
              Register
            </button>
          </div>
        ) : (
          <div>
            <NavDropdown
              label={
                <span className="text-sm">
                  Welcome back, {HelperService.decodeJWT(token).username}
                </span>
              }
            >
              <NavDropdown.DivItem
                onClick={() => signOut()}
                label={"Sign out"}
                href="/"
              />
            </NavDropdown>
          </div>
        )}
      </nav>
    </>
  );
};
