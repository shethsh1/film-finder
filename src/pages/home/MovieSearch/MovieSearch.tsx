import classNames from "classnames";
import React, { useState, useEffect, useContext } from "react";
import { Collapse } from "../../../components";
import { ThemeContext } from "../../../context/Theme/ThemeContext";
// import Collapse from "@mui/material/Collapse";
import { useGetMoviesBySearchTermQuery } from "../../../features/apiSlice";

interface Props {
  searchTerm: string;
  isFocused: boolean;
}

export const MovieSearch: React.FC<Props> = ({ searchTerm, isFocused }) => {
  const { data: movies, isFetching } =
    useGetMoviesBySearchTermQuery(searchTerm);
  const [firstLoad, setFirstLoad] = useState(true);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <Collapse show={!isFetching && !firstLoad && isFocused}>
      <div>
        {movies?.results?.slice(0, 5).map((movie) => (
          <div
            key={movie.id}
            className={classNames("flex gap-4 hover:bg-dark-hover p-4", {
              "hover:bg-dark-hover": isDarkMode,
              "hover:bg-light-hover": !isDarkMode,
            })}
          >
            <div className="flex-shrink-0">
              <img
                className="h-15 w-10"
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              ></img>
            </div>
            <div className="">
              <p className="text-lg font-bold">{movie.title}</p>
              <p className="md:inline-flex gap-2 hidden">
                <span>Score: {movie.vote_average}</span>
                <span>&bull;</span>
                <span>Popularity: {movie.popularity}</span>
                <span>&bull;</span>
                <span>{movie.release_date}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Collapse>
  );
};
