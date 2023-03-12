import classNames from "classnames";
import { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeContext } from "../../../context/Theme/ThemeContext";
import { Shows } from "../../../features/showSlice";
interface Props {
  topShows: Shows;
  goToMedia: (id: number) => void;
}

export const ShowCards: React.FC<Props> = ({ topShows, goToMedia }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  return (
    <div className="flex flex-col gap-4">
      {topShows?.results ? (
        topShows?.results?.slice(0, 10).map((show) => (
          <div
            key={show.id}
            onClick={() => goToMedia(show.id)}
            className={classNames("flex text-xs gap-4 cursor-pointer", {
              "text-dark-font-primary bg-dark-secondary hover:bg-dark-hover":
                isDarkMode,
              "text-light-font-primary bg-light-secondary hover:bg-light-hover":
                !isDarkMode,
            })}
          >
            <img
              className="h-20 w-16 flex-shrink-0"
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt={show.name}
            />
            <div className="py-2 mt-2">
              <p className="font-bold">{show.name}</p>
              <div className="inline-flex gap-1 mt-1 items-center">
                <div className="inline-flex text-md items-center gap-1">
                  <AiFillStar color="gold" size={16} />
                  <span>{show.vote_average}</span>
                </div>
                <span>&bull;</span>
                <span>Popularity: {show.popularity}</span>
                <span>&bull;</span>
                <span>{show.first_air_date}</span>
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
                <Skeleton key={idx} />
              ))}
          </div>
        </SkeletonTheme>
      )}
    </div>
  );
};
