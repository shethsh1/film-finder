import classNames from "classnames";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";

import { getPopularAnime, getUpcomingAnime } from "../../features/animeSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { MediaCard, PaginationButtons } from "../../components";
import styles from "./Anime.module.css";
import { TypeButton } from "../../components";
import { MediaType } from "../../types/MediaTypes";
import { ThreeDots } from "react-loader-spinner";

type PageType = "Trending" | "Top Rated" | "Upcoming";

export const Anime = () => {
  const animeState = useAppSelector((state) => state.anime.activeAnimes);
  const loading = useAppSelector((state) => state.anime.loading);

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
        dispatch(getPopularAnime(page));
        break;
      case "Upcoming":
        dispatch(getUpcomingAnime(page));
        break;
      default:
        dispatch(getPopularAnime(page));
        break;
    }
  }, [dispatch, page, pageType]);

  useEffect(() => {
    console.log(animeState);
  }, [animeState]);

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
        className={classNames(
          "text-white mt-8 flex flex-wrap md:flex-row flex-col gap-4",
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

      <PaginationButtons
        page={page}
        handlePageChange={handlePageChange}
        disabled={loading}
      />

      <div
        className={classNames(
          `${styles.cardExtraHeight} flex flex-wrap justify-center gap-x-4 gap-y-12 mt-8 text-xs card-test`,
          {
            "text-dark-font-primary": isDarkMode,
            "text-light-font-primary": !isDarkMode,
          }
        )}
      >
        {!loading && animeState && animeState.status !== "429" ? (
          animeState?.data?.map((anime) => (
            <MediaCard
              key={anime.mal_id}
              id={anime.mal_id}
              title={anime.title}
              poster_path={anime?.images?.jpg?.image_url}
              type={MediaType.ANIME}
            />
          ))
        ) : (
          <div>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="fill-dark-tertiary"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass="fill-dark-tertiary"
              visible={true}
            />
          </div>
        )}
      </div>
    </section>
  );
};
