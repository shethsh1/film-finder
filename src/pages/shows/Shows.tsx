import classNames from "classnames";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";

import { getPopularShows, getTopRatedShows } from "../../features/showSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { MediaCard, PaginationButtons } from "../../components";
import styles from "./Shows.module.css";
import { TypeButton } from "../../components";
import { MediaType } from "../../types/MediaTypes";

type PageType = "Trending" | "Top Rated" | "Upcoming";

export const Shows = () => {
  const Showstate = useAppSelector((state) => state.show.activeShows);
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
        dispatch(getPopularShows(page));
        break;
      case "Top Rated":
        dispatch(getTopRatedShows(page));
        break;
      default:
        dispatch(getPopularShows(page));
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
          label="Top Rated"
        />
      </div>

      <PaginationButtons page={page} handlePageChange={handlePageChange} />

      <div
        className={classNames(
          `${styles.cardExtraHeight} flex flex-wrap justify-center gap-x-4 gap-y-12 mt-8 text-xs card-test`,
          {
            "text-dark-font-primary": isDarkMode,
            "text-light-font-primary": !isDarkMode,
          }
        )}
      >
        {Showstate?.results?.map((show) => (
          <MediaCard
            key={show.id}
            id={show.id}
            title={show.title}
            poster_path={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            type={MediaType.SHOW}
          />
        ))}
      </div>
    </section>
  );
};
