import classNames from "classnames";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={classNames("mt-auto py-6", {
        "bg-light-secondary text-light-font-primary": theme === "light",
        "bg-dark-secondary text-dark-font-primary": theme === "dark",
      })}
    >
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 justify-between items-center">
        <div className="text-sm">
          © 2023 Film Finder created by Shaahid Sheth
        </div>
      </div>
    </footer>
  );
}

export default Footer;
