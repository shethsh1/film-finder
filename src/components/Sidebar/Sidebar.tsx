import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { Movies } from "../../features/movieSlice";
import { MovieCards } from "./MovieCards.tsx/MovieCards";

interface Props {
  title: string;
  topMedia: Movies | null;
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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
