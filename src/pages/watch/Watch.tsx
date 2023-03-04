import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import ReactPlayer from "react-player/youtube";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";
import { MediaTypes, MediaType } from "../../types/MediaTypes";
import { interfaceShowDetail } from "../../features/showSlice";
import { interfaceMovieDetail } from "../../features/movieSlice";

type Props = {
  detailMethod: any;
  type: MediaTypes;
};

function isMovieDetail(details: any): details is interfaceMovieDetail {
  return details;
}

// function isShowDetail(details: any): details is interfaceShowDetail {
//   return details;
// }

export const Watch = ({ detailMethod, type }: Props) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  const details = useAppSelector((state) =>
    type === MediaType.MOVIE
      ? (state.movie.movieDetails as interfaceMovieDetail)
      : (state.show.showDetails as interfaceShowDetail)
  );
  const loading = useAppSelector((state) => state.movie.cardDetailLoading);
  const dispatch = useAppDispatch();
  const id = useParams().id;

  useEffect(() => {
    dispatch(detailMethod(id));
  }, [detailMethod, dispatch, id]);

  if (loading || !details) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mt-8">
      {details?.videos?.results?.[0]?.key && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${details.videos.results[0].key}`}
          controls={true}
        />
      )}
      <div></div>

      <div className="mt-4 flex">
        <div className="p-6 flex-shrink-0">
          <img
            className="h-80 w-60"
            alt={isMovieDetail(details) ? details.title : details.name}
            src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
          />
        </div>
        <div
          className={classNames("pr-6 py-6 max-w-lg", {
            "text-dark-font-primary": isDarkMode,
            "text-light-font-primary": !isDarkMode,
          })}
        >
          <h1 className="text-4xl font-bold">
            {isMovieDetail(details) ? details.title : details.name}
          </h1>
          <div className="mt-2">
            <p className="mb-2">{details?.overview}</p>
            <p className="text-xs">Score: {details?.vote_average}</p>
            <p className="text-xs">Status: {details?.status}</p>
            <p className="text-xs">Release date: {details?.release_date}</p>
          </div>

          <div className="genre mt-2 text-md">
            <div className="inline-flex gap-1 flex-wrap">
              <span className="font-bold">Genre:</span>
              {details?.genres?.map((o) => (
                <span key={o.id}>{o.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
