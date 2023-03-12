import classNames from "classnames";
import { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { ThemeContext } from "../../../context/Theme/ThemeContext";
import { Movies } from "../../../features/movieSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  topMovies: Movies;
  goToMedia: (id: number) => void;
}

export const MovieCards: React.FC<Props> = ({ topMovies, goToMedia }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  return (
    <div className="flex flex-col gap-4">
      {topMovies?.results ? (
        topMovies.results.slice(0, 10).map((movie) => (
          <div
            key={movie.id}
            onClick={() => goToMedia(movie.id)}
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
              <div className="inline-flex gap-1 mt-1 items-center">
                <div className="inline-flex text-md items-center gap-1">
                  <AiFillStar color="gold" size={16} />
                  <span>{movie.vote_average}</span>
                </div>
                <span>&bull;</span>
                <span>Popularity: {movie.popularity}</span>
                <span>&bull;</span>
                <span>{movie.release_date}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <SkeletonTheme
          baseColor={isDarkMode ? "#1d2d44" : "#c7e5d0"}
          highlightColor={isDarkMode ? "#334256" : "#b3cebb"}
          duration={2}
          height="75px"
        >
          <div className={classNames("flex flex-col gap-4 select-none")}>
            {Array(8)
              .fill(8)
              .map((_, idx) => (
                <Skeleton />
              ))}
          </div>
        </SkeletonTheme>
      )}
    </div>
  );
};
