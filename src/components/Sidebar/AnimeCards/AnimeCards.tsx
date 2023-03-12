import classNames from "classnames";
import { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { ThemeContext } from "../../../context/Theme/ThemeContext";
import { Anime } from "../../../features/animeSlice";
import { format } from "date-fns";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface Props {
  topAnime: Anime;
  goToMedia: (id: number) => void;
}

export const AnimeCards: React.FC<Props> = ({ topAnime, goToMedia }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  return (
    <div className="flex flex-col gap-4">
      {topAnime?.data ? (
        topAnime?.data?.slice(0, 10).map((anime) => (
          <div
            key={anime.mal_id}
            onClick={() => goToMedia(anime.mal_id)}
            className={classNames("flex text-xs gap-4 cursor-pointer", {
              "text-dark-font-primary bg-dark-secondary hover:bg-dark-hover":
                isDarkMode,
              "text-light-font-primary bg-light-secondary hover:bg-light-hover":
                !isDarkMode,
            })}
          >
            <img
              className="h-20 w-16 flex-shrink-0"
              src={anime.images.jpg?.image_url}
              alt={anime.title}
            />
            <div className="py-2 mt-2">
              <p className="font-bold">{anime.title}</p>
              <div className="inline-flex gap-1 mt-1 items-center">
                <div className="inline-flex text-md items-center gap-1">
                  <AiFillStar color="gold" size={16} />
                  <span>{anime.score}</span>
                </div>
                <span>&bull;</span>
                <span>Popularity: {anime.popularity}</span>
                <span>&bull;</span>
                <span>{format(new Date(anime.aired.from), "yyyy-MM-dd")}</span>
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
