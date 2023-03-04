import { NavLink } from "react-router-dom";
import { CardTooltip } from "../CardToolTip/CardToolTip";
import { MediaTypes } from "../../types/MediaTypes";

type MediaCardTooltipProps = {
  id: number;
  title: string;
  poster_path: string;
  detailMethod: any;
  type: MediaTypes;
};

export const MediaCard = ({
  id,
  title,
  poster_path,
  detailMethod,
  type,
}: MediaCardTooltipProps) => {
  return (
    <div className="h-56 basis-36 card flex-shrink-0">
      <CardTooltip
        className="h-full"
        id={id}
        detailMethod={detailMethod}
        type={type}
      >
        <NavLink
          key={id}
          to={`/watch/movies/${id}`}
          className="flex flex-col h-full pb-8 gap-2"
        >
          <img
            className="h-full rounded-xl"
            alt={title}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          />
          <span>{title}</span>
        </NavLink>
      </CardTooltip>
    </div>
  );
};
