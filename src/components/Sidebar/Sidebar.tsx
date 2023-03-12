import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { Movies } from "../../features/movieSlice";
import { Shows } from "../../features/showSlice";
import { MovieCards } from "./MovieCards/MovieCards";
import { ShowCards } from "./ShowCards/ShowCards";
import { Anime } from "../../features/animeSlice";
import { AnimeCards } from "./AnimeCards/AnimeCards";
import { useNavigate } from "react-router-dom";

type HideScreen = "xs" | "md" | "lg" | "xl";

interface Props {
  title: string;
  topMedia: Movies | Shows | Anime | null | undefined;
  type: "movies" | "shows" | "anime";
  hideScreen?: HideScreen;
}

export default function Sidebar({
  title,
  topMedia,
  type,
  hideScreen = "lg",
}: Props) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  const goToMedia = (id: number) => {
    navigate(`/watch/${type}/${id}`);
  };

  return (
    <div
      className={classNames("flex-shrink-0 basis-[22rem]", {
        "hidden xl:block": hideScreen === "xl",
        "hidden lg:block": hideScreen === "lg",
        "hidden md:block": hideScreen === "md",
      })}
    >
      <div
        className={classNames("text-2xl font-bold my-4", {
          "text-dark-font-primary": isDarkMode,
          "text-light-font-primary": !isDarkMode,
        })}
      >
        {title}
      </div>
      <div>
        {type === "movies" ? (
          <MovieCards topMovies={topMedia as Movies} goToMedia={goToMedia} />
        ) : type === "shows" ? (
          <ShowCards topShows={topMedia as Shows} goToMedia={goToMedia} />
        ) : type === "anime" ? (
          <AnimeCards topAnime={topMedia as Anime} goToMedia={goToMedia} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
