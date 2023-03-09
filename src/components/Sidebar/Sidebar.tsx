import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { Movies } from "../../features/movieSlice";
import { Shows } from "../../features/showSlice";
import { MovieCards } from "./MovieCards/MovieCards";
import { ShowCards } from "./ShowCards/ShowCards";

interface Props {
  title: string;
  topMedia: Movies | Shows | null;
  type: "movies" | "shows" | "anime";
}

export default function Sidebar({ title, topMedia, type }: Props) {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  return (
    <div className="flex-shrink-0 basis-[22rem] hidden lg:block">
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
          <MovieCards topMovies={topMedia as Movies} />
        ) : type === "shows" ? (
          <ShowCards topShows={topMedia as Shows} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
