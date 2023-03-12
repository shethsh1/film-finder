import classNames from "classnames";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../../features/movieSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { MediaCard, PaginationButtons, Sidebar } from "../../components";
import styles from "./Movies.module.css";
import { TypeButton } from "../../components";
import { MediaType } from "../../types/MediaTypes";
import { ThreeDots } from "react-loader-spinner";
import { useGetTopMoviesQuery } from "../../features/apiSlice";

type PageType = "Trending" | "Top Rated" | "Upcoming";

export const Movies = () => {
  const movieState = useAppSelector((state) => state.movie.popularMovies);
  const { data: topMovies } = useGetTopMoviesQuery(1);

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
          className={classNames("font-bold md:text-4xl text-3xl mt-8", {
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

      <Sidebar topMedia={topMovies} type={"movies"} title={"Top Movies"} />
    </div>
  );
};
