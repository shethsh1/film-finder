import { NavLink } from "react-router-dom";
import { CardTooltip } from "../CardToolTip/CardToolTip";

type MediaCardTooltipProps = {
  id: number;
  title: string;
  poster_path: string;
  detailMethod: any;
};

export const MediaCard = ({
  id,
  title,
  poster_path,
  detailMethod,
}: MediaCardTooltipProps) => {
  return (
    <div className="h-56 basis-36 card ">
      <CardTooltip className="h-full" id={id} detailMethod={detailMethod}>
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
