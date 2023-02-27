import { useContext } from "react";
import { ThemeContext } from "./context/Theme/ThemeContext";

const Hi = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <h1>{theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default Hi;
