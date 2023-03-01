// @ts-nocheck
import classNames from "classnames";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { getPopularMovies } from "../../features/movieSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { NavLink } from "react-router-dom";
import { CardTooltip } from "../../components";
export const Movies = () => {
  const movieState = useAppSelector((state) => state.movie.popularMovies);
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const [page, setPage] = useState<number>(1);
  const isDarkMode = theme === "dark" ? true : false;

  useEffect(() => {
    dispatch(getPopularMovies(1));
  }, [dispatch, page]);

  useEffect(() => {
    console.log(movieState);
  }, [movieState]);
  useEffect(() => {});
  return (
    <section>
      <h3
        className={classNames("font-bold text-4xl mt-4 w-96 min-w-full", {
          "text-dark-font-primary": isDarkMode,
          "text-light-font-primary": !isDarkMode,
        })}
      >
        Popular Movies
      </h3>
      <div className="flex flex-wrap gap-4 mt-8 w-96 min-w-full text-white text-xs">
        {movieState?.results.map((movie) => (
          <div className="h-56 basis-36">
            <CardTooltip className="h-full" text="Hello there!">
              <NavLink
                key={movie.id}
                to="/test"
                className="flex flex-col h-full pb-8 gap-2"
              >
                <img
                  className="h-full rounded-xl"
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                <span>{movie.title}</span>
              </NavLink>
            </CardTooltip>
          </div>
        ))}
      </div>
    </section>
  );
};
