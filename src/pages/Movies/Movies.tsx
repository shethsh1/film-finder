import classNames from "classnames";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
export const Movies = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  return (
    <section>
      <h3
        className={classNames("font-bold text-4xl mt-4", {
          "text-dark-font-primary": isDarkMode,
          "text-light-font-primary": !isDarkMode,
        })}
      >
        Property Movies
      </h3>
    </section>
  );
};
