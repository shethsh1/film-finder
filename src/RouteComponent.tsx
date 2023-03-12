import { ThemeContext } from "./context/Theme/ThemeContext";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import { Home } from "./pages/home/Home";
import { useContext } from "react";
import { Header } from "./components";
import { Movies } from "./pages/movies/Movies";
import { Watch } from "./pages/watch/Watch";
import { getMovieDetails } from "./features/movieSlice";
import classNames from "classnames";
import { Shows } from "./pages/shows/Shows";
import { getShowDetails } from "./features/showSlice";
import { Anime } from "./pages/anime/Anime";
import { getAnimeDetails } from "./features/animeSlice";
import Footer from "./components/Footer/Footer";
const RouteComponent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={classNames("min-h-screen overflow-hidden flex flex-col", {
        "bg-light-primary": theme === "light",
        "bg-dark-primary": theme === "dark",
      })}
    >
      <main>
        <BrowserRouter>
          <Header />
          <div className="pt-[128px] pb-6 px-10">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/movies" element={<Movies />}></Route>
              <Route path="/shows" element={<Shows />}></Route>
              <Route path="/anime" element={<Anime />}></Route>
              <Route
                path="/watch/movies/:id"
                element={
                  <Watch detailMethod={getMovieDetails} type={"movie"} />
                }
              ></Route>
              <Route
                path="/watch/shows/:id"
                element={<Watch detailMethod={getShowDetails} type={"show"} />}
              ></Route>
              <Route
                path="/watch/anime/:id"
                element={
                  <Watch detailMethod={getAnimeDetails} type={"anime"} />
                }
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
};

export default RouteComponent;
