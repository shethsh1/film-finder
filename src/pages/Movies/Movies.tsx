// @ts-nocheck
import classNames from "classnames";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { getPopularMovies, getMovieDetails } from "../../features/movieSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { NavLink } from "react-router-dom";
import { CardTooltip, Fade, MediaCard } from "../../components";
export const Movies = () => {
  const movieState = useAppSelector((state) => state.movie.popularMovies);
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(getPopularMovies(1));
  }, [dispatch, page]);

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
      <div
        className={classNames(
          "flex flex-wrap gap-x-4 gap-y-6 mt-8 w-96 min-w-full text-xs",
          {
            "text-dark-font-primary": isDarkMode,
            "text-light-font-primary": !isDarkMode,
          }
        )}
      >
        {movieState?.results.map((movie) => (
          <MediaCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            detailMethod={getMovieDetails}
          />
        ))}
      </div>
    </section>
  );
};
