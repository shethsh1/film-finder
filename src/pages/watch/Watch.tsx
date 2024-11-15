import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import ReactPlayer from "react-player/youtube";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";
import { MediaTypes, MediaType } from "../../types/MediaTypes";
import { interfaceShowDetail, Shows } from "../../features/showSlice";
import { interfaceMovieDetail, Movies } from "../../features/movieSlice";
import { Anime, interfaceAnimeDetail } from "../../features/animeSlice";
import { Sidebar } from "../../components";
import { FourXLContainer } from "../../components";
import { getTopRatedMovies } from "../../features/movieSlice";
import { getTopRatedAnime } from "../../features/animeSlice";
import { getTopRatedShows } from "../../features/showSlice";
import { VideoTable } from "./VideoTable/VideoTable";
import {
  useGetTopAnimeQuery,
  useGetTopMoviesQuery,
  useGetTopShowsQuery,
} from "../../features/apiSlice";
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
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const isDarkMode = theme === "dark" ? true : false;

  const details = useAppSelector((state) =>
    type === MediaType.MOVIE
      ? (state.movie.movieDetails as interfaceMovieDetail)
      : type === MediaType.SHOW
      ? (state.show.showDetails as interfaceShowDetail)
      : (state.anime.animeDetail as interfaceAnimeDetail)
  );

  const handleActiveVideo = (idx: number) => {
    setActiveVideo(idx);
  };

  const getVideos = (): { name: string }[] => {
    let videos: { name: string }[] = [];
    if (type === MediaType.MOVIE || type === MediaType.SHOW) {
      if (isMovieDetail(details) || isShowDetail(details)) {
        videos = details.videos.results.map((video) => ({
          name: video.name,
        }));
      }
    } else if (type === MediaType.ANIME) {
      videos.push({ name: "Trailer" });
    }

    return videos;
  };

  const { data: topMovies } = useGetTopMoviesQuery(1, {
    skip: type !== "movie",
  });
  const { data: topShows } = useGetTopShowsQuery(1, { skip: type !== "show" });
  const { data: topAnime } = useGetTopAnimeQuery(1, { skip: type !== "anime" });

  const dispatch = useAppDispatch();
  const id = useParams().id;

  useEffect(() => {
    dispatch(detailMethod(id));
  }, [detailMethod, dispatch, id]);

  const getMovie = () => {
    if (type === MediaType.ANIME && isAnimeDetail(details)) {
      return details?.trailer?.youtube_id;
    } else if (type === MediaType.SHOW && isShowDetail(details)) {
      return details?.videos?.results?.[activeVideo]?.key;
    } else if (type === MediaType.MOVIE && isMovieDetail(details)) {
      return details?.videos?.results?.[activeVideo]?.key;
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
      return details?.first_air_date;
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

  useEffect(() => {
    switch (type) {
      case "movie":
        dispatch(getTopRatedMovies(1));
        break;
      case "show":
        dispatch(getTopRatedShows(1));
        break;
      case "anime":
        dispatch(getTopRatedAnime(1));
        break;
      default:
        dispatch(getTopRatedMovies(1));
    }
  }, [dispatch, type]);

  const getTypeOfMedia = () => {
    switch (type) {
      case "movie":
        return "movies";
      case "show":
        return "shows";
      case "anime":
        return "anime";
      default:
        return "movies";
    }
  };

  const getTopMedia = (): Movies | Anime | Shows => {
    switch (type) {
      case "movie":
        return topMovies as Movies;
      case "show":
        return topShows as Shows;
      case "anime":
        return topAnime as Anime;
      default:
        return topMovies as Movies;
    }
  };

  useEffect(() => {
    setActiveVideo(0);
  }, [id]);

  return (
    <FourXLContainer>
      <div className="flex gap-8 justify-between">
        <div className="mt-8 w-full p-4">
          <div
            className={classNames("player-wrapper", {
              "bg-dark-secondary text-dark-font-primary":
                isDarkMode && !getMovie(),
              "bg-light-secondary text-light-font-primary":
                !isDarkMode && !getMovie(),
            })}
          >
            {getMovie() ? (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${getMovie()}`}
                controls={true}
                className="react-player"
                width="100%"
                height="100%"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center font-bold">No Video Found</p>
              </div>
            )}
          </div>

          <VideoTable
            videos={getVideos()}
            handleActiveVideo={handleActiveVideo}
            activeVideo={activeVideo}
          />
          <div className="mt-4 flex flex-row">
            <div className="p-6 flex-shrink-0 hidden sm:block">
              <img
                className="lg:h-80 lg:w-60 md:h-40 md:w-30 h-20 w-20"
                alt="img"
                src={getPosterPath()}
              />
            </div>
            <div
              className={classNames("md:pr-6 md:py-6 max-w-3xl", {
                "text-dark-font-primary": isDarkMode,
                "text-light-font-primary": !isDarkMode,
              })}
            >
              <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold">
                {getTitle()}
              </h1>
              <div className="mt-2">
                <p className="mb-2 md:text-sm text-xs">
                  {getOverview()?.slice(0, 1500)}
                </p>
                <p className="md:text-sm text-xs">Score: {getVoteAverage()}</p>
                <p className="md:text-sm text-xs">Status: {getStatus()}</p>
                <p className="md:text-sm text-xs">
                  Release date: {getReleaseDate()}
                </p>
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

        <Sidebar
          title={`Top ${getTypeOfMedia().replace(/^\w/, (c) =>
            c.toUpperCase()
          )}`}
          topMedia={getTopMedia()}
          type={getTypeOfMedia()}
          hideScreen="xl"
        />
      </div>
    </FourXLContainer>
  );
};
