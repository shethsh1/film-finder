import { ThemeContext } from "./context/Theme/ThemeContext";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import { Home } from "./pages/home/Home";
import { useContext, useEffect, useCallback } from "react";
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
import { useAppDispatch } from "./store/hooks";
import { gql, useLazyQuery } from "@apollo/client";
import { setToken } from "./features/authSlice";

const QUERY_CHECK_JWT = gql`
  query CheckJWT {
    checkJwt
  }
`;

const RouteComponent = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const [checkJWT] = useLazyQuery<{ checkJwt: boolean }>(QUERY_CHECK_JWT);

  const checkToken = useCallback(async () => {
    try {
      const { data } = await checkJWT();
      if (data?.checkJwt) {
        dispatch(setToken(localStorage.getItem("authToken") || ""));
      }
    } catch (e) {
      console.log(e);
      // localStorage.removeItem('authToken');
    }
  }, [checkJWT, dispatch]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <div
      id="main-app"
      className={classNames("min-h-screen overflow-hidden flex flex-col", {
        "bg-light-primary": theme === "light",
        "bg-dark-primary": theme === "dark",
      })}
    >
      <main>
        <BrowserRouter>
          <Header />
          <div className="pt-[140px] pb-6 px-10">
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
