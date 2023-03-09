import classNames from "classnames";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../features/movieSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { MediaCard, PaginationButtons } from "../../components";
import styles from "./Movies.module.css";
import { TypeButton } from "../../components";
import { MediaType } from "../../types/MediaTypes";
import { ThreeDots } from "react-loader-spinner";
import { AiFillStar } from "react-icons/ai";

type PageType = "Trending" | "Top Rated" | "Upcoming";

export const Movies = () => {
  const movieState = useAppSelector((state) => state.movie.popularMovies);
  const topMovies = useAppSelector((state) => state.movie.topRatedMovies);
  const loading = useAppSelector((state) => state.movie.loading);

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
    dispatch(getTopRatedMovies(1));
    switch (pageType) {
      case "Trending":
        dispatch(getPopularMovies(page));
        break;
      case "Upcoming":
        dispatch(getUpcomingMovies(page));
        break;
      default:
        dispatch(getPopularMovies(page));
        break;
    }
  }, [dispatch, page, pageType]);

  useEffect(() => {
    dispatch(getTopRatedMovies(1));
  }, [dispatch]);

  return (
    <div className="flex gap-4 justify-between">
      <section className="flex-1">
        <h3
          className={classNames("font-bold text-4xl mt-8 w-96 min-w-full", {
            "text-dark-font-primary": isDarkMode,
            "text-light-font-primary": !isDarkMode,
          })}
        >
          {pageType}
        </h3>

        <div
          className={classNames(
            "mt-8 flex flex-wrap md:flex-row flex-col gap-4",
            {
              "text-dark-font-primary": isDarkMode,
              "text-light-font-primary": !isDarkMode,
            }
          )}
        >
          <TypeButton
            isDarkMode={isDarkMode}
            pageType={pageType}
            handlePageType={handlePageType}
            label="Trending"
          />

          <TypeButton
            isDarkMode={isDarkMode}
            pageType={pageType}
            handlePageType={handlePageType}
            label="Upcoming"
          />
        </div>

        <PaginationButtons page={page} handlePageChange={handlePageChange} />

        <div
          className={classNames(
            `${styles.cardExtraHeight} flex flex-wrap justify-center gap-x-4 gap-y-12 mt-12 text-xs card-test`,
            {
              "text-dark-font-primary": isDarkMode,
              "text-light-font-primary": !isDarkMode,
            }
          )}
        >
          {!loading && movieState ? (
            movieState?.results?.map((movie) => (
              <MediaCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                type={MediaType.MOVIE}
              />
            ))
          ) : (
            <div>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="fill"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass={
                  isDarkMode ? "fill-dark-tertiary" : "fill-light-tertiary"
                }
                visible={true}
              />
            </div>
          )}
        </div>
      </section>

      <div className="flex-shrink-0 basis-[22rem] hidden lg:block">
        <div
          className={classNames("text-2xl font-bold my-4", {
            "text-dark-font-primary": isDarkMode,
            "text-light-font-primary": !isDarkMode,
          })}
        >
          Top Movies
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {topMovies?.results?.slice(0, 10).map((movie) => (
              <div
                key={movie.id}
                className={classNames("flex text-xs gap-4 cursor-pointer", {
                  "text-dark-font-primary bg-dark-secondary hover:bg-dark-hover":
                    isDarkMode,
                  "text-light-font-primary bg-light-secondary hover:bg-light-hover":
                    !isDarkMode,
                })}
              >
                <img
                  className="h-20 w-16 flex-shrink-0"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="py-2 mt-2">
                  <p className="font-bold">{movie.title}</p>
                  <p className="inline-flex gap-1 mt-1 items-center">
                    <div className="inline-flex text-md items-center gap-1">
                      <AiFillStar color="gold" size={16} />
                      <span>{movie.vote_average}</span>
                    </div>
                    <span>&bull;</span>
                    <span>Popularity: {movie.popularity}</span>
                    <span>&bull;</span>
                    <span>{movie.release_date}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
