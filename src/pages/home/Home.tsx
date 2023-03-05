import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";

export const Home = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  return (
    <div>
      <div
        className={classNames("mt-8", {
          "text-dark-font-primary": isDarkMode,
          "text-light-font-primary": !isDarkMode,
        })}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </div>
    </div>
  );
};
