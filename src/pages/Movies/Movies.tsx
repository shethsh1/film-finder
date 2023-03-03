import classNames from "classnames";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import {
  getPopularMovies,
  getMovieDetails,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../features/movieSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { MediaCard, PaginationButtons } from "../../components";
import styles from "./Movies.module.css";

type PageType = "Trending" | "Top Rated" | "Upcoming";

export const Movies = () => {
  const movieState = useAppSelector((state) => state.movie.popularMovies);
  const [pageType, setPageType] = useState<PageType>("Trending");
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  const [page, setPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageType = (newPageType: PageType) => {
    setPage(1);
    setPageType(newPageType);
  };

  useEffect(() => {
    switch (pageType) {
      case "Trending":
        dispatch(getPopularMovies(page));
        break;
      case "Top Rated":
        dispatch(getTopRatedMovies(page));
        break;
      case "Upcoming":
        dispatch(getUpcomingMovies(page));
        break;
      default:
        dispatch(getPopularMovies(page));
        break;
    }
  }, [dispatch, page, pageType]);

  return (
    <section>
      <h3
        className={classNames("font-bold text-4xl mt-4 w-96 min-w-full", {
          "text-dark-font-primary": isDarkMode,
          "text-light-font-primary": !isDarkMode,
        })}
      >
        {pageType}
      </h3>

      <div
        className={classNames("text-white mt-8 flex flex-wrap gap-4", {
          "text-dark-font-primary": isDarkMode,
          "text-light-font-primary": !isDarkMode,
        })}
      >
        <button
          disabled={pageType === "Trending"}
          onClick={() => handlePageType("Trending")}
          className={classNames(
            "px-4 py-2 transition duration-500 ease-in-out",
            {
              "bg-dark-secondary": isDarkMode && pageType === "Trending",
              "bg-light-secondary": !isDarkMode && pageType === "Trending",
            }
          )}
        >
          Trending
        </button>
        <button
          disabled={pageType === "Top Rated"}
          onClick={() => handlePageType("Top Rated")}
          className={classNames(
            "px-4 py-2 transition duration-500 ease-in-out",
            {
              "bg-dark-secondary": isDarkMode && pageType === "Top Rated",
              "bg-light-secondary": !isDarkMode && pageType === "Top Rated",
            }
          )}
        >
          Top Rated
        </button>
        <button
          disabled={pageType === "Upcoming"}
          onClick={() => handlePageType("Upcoming")}
          className={classNames(
            "px-4 py-2 transition duration-500 ease-in-out",
            {
              "bg-dark-secondary": isDarkMode && pageType === "Upcoming",
              "bg-light-secondary": !isDarkMode && pageType === "Upcoming",
            }
          )}
        >
          Upcoming
        </button>
      </div>

      <PaginationButtons page={page} handlePageChange={handlePageChange} />

      <div
        className={classNames(
          `${styles.cardExtraHeight} flex flex-wrap gap-x-4 gap-y-6 mt-8 text-xs card-test`,
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
