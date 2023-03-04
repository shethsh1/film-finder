import { ThemeContext } from "./context/Theme/ThemeContext";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import Hi from "./Hi";
import { useContext } from "react";
import { Header, Navigation } from "./components";
import { Movies } from "./pages/movies/Movies";
import { Watch } from "./pages/watch/Watch";
import { getMovieDetails } from "./features/movieSlice";
import classNames from "classnames";
import { Shows } from "./pages/shows/Shows";
import { getShowDetails } from "./features/showSlice";
import { Anime } from "./pages/anime/Anime";
const RouteComponent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={classNames("min-h-screen py-6 px-10 overflow-hidden", {
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
            <Route path="/shows" element={<Shows />}></Route>
            <Route path="/anime" element={<Anime />}></Route>
            <Route
              path="/watch/movies/:id"
              element={<Watch detailMethod={getMovieDetails} type={"movie"} />}
            ></Route>
            <Route
              path="/watch/shows/:id"
              element={<Watch detailMethod={getShowDetails} type={"show"} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

export default RouteComponent;
