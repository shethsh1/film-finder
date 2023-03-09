import { NavLink } from "react-router-dom";
import {
  CardTooltipAnime,
  CardTooltipMovie,
  CardTooltipShow,
} from "../CardToolTip";
import { MediaType, MediaTypes } from "../../types/MediaTypes";
import { BsFillPlayFill } from "react-icons/bs";
import styles from "./MediaCard.module.css";

type MediaCardTooltipProps = {
  id: number;
  title: string;
  poster_path: string | undefined;
  type: MediaTypes;
};

export const MediaCard = ({
  id,
  title,
  poster_path,
  type,
}: MediaCardTooltipProps) => {
  return (
    <div className="h-56 basis-36 card flex-shrink-0">
      {type === MediaType.MOVIE ? (
        <CardTooltipMovie className="h-full" id={id}>
          <NavLink
            key={id}
            to={`/watch/movies/${id}`}
            className={`flex flex-col h-full pb-8 gap-2 ${styles["image-container"]} ${styles["hover-gray"]}`}
          >
            <img className="h-full rounded-xl" alt={title} src={poster_path} />
            <div className={styles["play-button"]}>
              <BsFillPlayFill size={48} color="#fff" />
            </div>
            <span>{title}</span>
          </NavLink>
        </CardTooltipMovie>
      ) : type === MediaType.SHOW ? (
        <CardTooltipShow className="h-full" id={id}>
          <NavLink
            key={id}
            to={`/watch/shows/${id}`}
            className={`flex flex-col h-full pb-8 gap-2 ${styles["image-container"]} ${styles["hover-gray"]}`}
          >
            <img className="h-full rounded-xl" alt={title} src={poster_path} />
            <div className={styles["play-button"]}>
              <BsFillPlayFill size={48} color="#fff" />
            </div>
            <span>{title}</span>
          </NavLink>
        </CardTooltipShow>
      ) : (
        <CardTooltipAnime className="h-full" id={id}>
          <NavLink
            key={id}
            to={`/watch/anime/${id}`}
            className={`flex flex-col h-full pb-8 gap-2 ${styles["image-container"]} ${styles["hover-gray"]}`}
          >
            <img className="h-full rounded-xl" alt={title} src={poster_path} />
            <div className={styles["play-button"]}>
              <BsFillPlayFill size={48} color="#fff" />
            </div>
            <span>{title.slice(0, 48)}</span>
          </NavLink>
        </CardTooltipAnime>
      )}
    </div>
  );
};
