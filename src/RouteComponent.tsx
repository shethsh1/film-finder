import { ThemeContext } from "./context/Theme/ThemeContext";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import Hi from "./Hi";
import { useContext } from "react";
import { Header, Navigation } from "./components";
import { Movies } from "./pages/Movies/Movies";
import classNames from "classnames";
const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={classNames("overflow-auto min-h-screen py-6 px-10", {
        "bg-light-primary": theme === "light",
        "bg-dark-primary": theme === "dark",
      })}
    >
      <main>
        <BrowserRouter>
          <Header />
          <Navigation />
          <Routes>
            <Route path="/" element={<Hi />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

export default App;
