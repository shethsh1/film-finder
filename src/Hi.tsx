import { useContext } from "react";
import { ThemeContext } from "./context/Theme/ThemeContext";

const Hi = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);
  return (
    <div>
      <h1 className="text-light-secondary">{theme}</h1>
      <div
        className={`${
          theme === "light" ? "bg-light-primary" : "bg-dark-primary"
        } w-16 h-16`}
      ></div>
      <div className="text-light-font-primary">
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

export default Hi;
