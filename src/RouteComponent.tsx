import { ThemeContext } from "./context/Theme/ThemeContext";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import Hi from "./Hi";
import { useContext } from "react";
import { Header, Navigation } from "./components";
const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`overflow-auto min-h-screen ${
        theme === "light" ? "bg-light-primary" : "bg-dark-primary"
      }
        py-6 px-10
      
      `}
    >
      <Header />
      <Navigation />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hi />}></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

export default App;
