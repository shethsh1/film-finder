import { ThemeContext } from "./context/Theme/ThemeContext";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import Hi from "./Hi";
import { useContext } from "react";
const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`overflow-auto min-h-screen ${
        theme === "light" ? "bg-light-primary" : "bg-dark-primary"
      }`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hi />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
