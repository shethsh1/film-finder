import classNames from "classnames";
import React, { useState, useEffect, useContext } from "react";
import { Collapse } from "../../../components";
import { ThemeContext } from "../../../context/Theme/ThemeContext";
import { useGetMoviesBySearchTermQuery } from "../../../features/apiSlice";
import { debounce } from "lodash";
import defaultImage from "../../../images/No-Image.png";

interface Props {
  searchTerm: string;
  isFocused: boolean;
}

export const MovieSearch: React.FC<Props> = ({ searchTerm, isFocused }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: movies, isFetching } =
    useGetMoviesBySearchTermQuery(debouncedSearchTerm);
  const [firstLoad, setFirstLoad] = useState(true);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  return (
    <Collapse show={!firstLoad && isFocused}>
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
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : defaultImage
                }
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
