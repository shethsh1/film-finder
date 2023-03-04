import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import ReactPlayer from "react-player/youtube";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";
import { MediaTypes, MediaType } from "../../types/MediaTypes";
import { interfaceShowDetail } from "../../features/showSlice";
import { interfaceMovieDetail } from "../../features/movieSlice";
import { interfaceAnimeDetail } from "../../features/animeSlice";

type Props = {
  detailMethod: any;
  type: MediaTypes;
};

function isMovieDetail(details: any): details is interfaceMovieDetail {
  return details;
}

function isShowDetail(details: any): details is interfaceShowDetail {
  return details;
}

function isAnimeDetail(details: any): details is interfaceAnimeDetail {
  return details;
}

export const Watch = ({ detailMethod, type }: Props) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  const details = useAppSelector((state) =>
    type === MediaType.MOVIE
      ? (state.movie.movieDetails as interfaceMovieDetail)
      : type === MediaType.SHOW
      ? (state.show.showDetails as interfaceShowDetail)
      : (state.anime.animeDetail as interfaceAnimeDetail)
  );
  const loading = useAppSelector((state) => state.movie.cardDetailLoading);
  const dispatch = useAppDispatch();
  const id = useParams().id;

  useEffect(() => {
    dispatch(detailMethod(id));
  }, [detailMethod, dispatch, id]);

  useEffect(() => {
    console.log(details);
  }, [details]);

  const getMovie = () => {
    if (type === MediaType.ANIME && isAnimeDetail(details)) {
      return details?.trailer?.youtube_id;
    } else if (type === MediaType.SHOW && isShowDetail(details)) {
      return details?.videos?.results?.[0]?.key;
    } else if (type === MediaType.MOVIE && isMovieDetail(details)) {
      return details?.videos?.results?.[0]?.key;
    }
  };

  const getTitle = () => {
    if (type === MediaType.ANIME && isAnimeDetail(details)) {
      return details?.title;
    } else if (type === MediaType.SHOW && isShowDetail(details)) {
      return details?.name;
    } else if (type === MediaType.MOVIE && isMovieDetail(details)) {
      return details?.title;
    }
    return null;
  };

  const getOverview = () => {
    if (type === MediaType.ANIME && isAnimeDetail(details)) {
      return details?.synopsis;
    } else if (type === MediaType.SHOW && isShowDetail(details)) {
      return details?.overview;
    } else if (type === MediaType.MOVIE && isMovieDetail(details)) {
      return details?.overview;
    }
    return null;
  };

  const getVoteAverage = () => {
    if (type === MediaType.ANIME && isAnimeDetail(details)) {
      return details?.score;
    } else if (type === MediaType.SHOW && isShowDetail(details)) {
      return details?.vote_average;
    } else if (type === MediaType.MOVIE && isMovieDetail(details)) {
      return details?.vote_average;
    }
    return null;
  };

  const getStatus = () => {
    if (type === MediaType.ANIME && isAnimeDetail(details)) {
      return details?.status;
    } else if (type === MediaType.SHOW && isShowDetail(details)) {
      return details?.status;
    } else if (type === MediaType.MOVIE && isMovieDetail(details)) {
      return details?.status;
    }
    return null;
  };

  const getReleaseDate = () => {
    if (type === MediaType.ANIME && isAnimeDetail(details)) {
      return details?.aired?.string;
    } else if (type === MediaType.SHOW && isShowDetail(details)) {
      return details?.release_date;
    } else if (type === MediaType.MOVIE && isMovieDetail(details)) {
      return details?.release_date;
    }
    return null;
  };

  const getPosterPath = () => {
    if (type === MediaType.ANIME && isAnimeDetail(details)) {
      return details.images?.jpg?.image_url;
    } else if (type === MediaType.SHOW && isShowDetail(details)) {
      return `https://image.tmdb.org/t/p/w500/${details?.poster_path}`;
    } else if (type === MediaType.MOVIE && isMovieDetail(details)) {
      return `https://image.tmdb.org/t/p/w500/${details?.poster_path}`;
    }
    return "";
  };

  if (loading || !details) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mt-8">
      {getMovie() && (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${getMovie()}`}
          controls={true}
        />
      )}

      <div className="mt-4 flex">
        <div className="p-6 flex-shrink-0">
          <img className="h-80 w-60" alt="img" src={getPosterPath()} />
        </div>
        <div
          className={classNames("pr-6 py-6 max-w-lg", {
            "text-dark-font-primary": isDarkMode,
            "text-light-font-primary": !isDarkMode,
          })}
        >
          <h1 className="text-4xl font-bold">{getTitle()}</h1>
          <div className="mt-2">
            <p className="mb-2">{getOverview()}</p>
            <p className="text-xs">Score: {getVoteAverage()}</p>
            <p className="text-xs">Status: {getStatus()}</p>
            <p className="text-xs">Release date: {getReleaseDate()}</p>
          </div>

          <div className="genre mt-2 text-md">
            <div className="inline-flex gap-1 flex-wrap">
              <span className="font-bold">Genre:</span>
              {details?.genres?.map((o, i) => (
                <span key={i}>{o.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
