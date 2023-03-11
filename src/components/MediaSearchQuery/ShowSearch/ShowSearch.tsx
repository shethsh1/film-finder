import classNames from "classnames";
import React, { useState, useEffect, useContext } from "react";
import { Collapse } from "../../../components";
import { ThemeContext } from "../../../context/Theme/ThemeContext";
import { useGetShowsBySearchTermQuery } from "../../../features/apiSlice";
import { debounce } from "lodash";
import defaultImage from "../../../images/No-Image.png";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router";

interface Props {
  searchTerm: string;
  isFocused: boolean;
  handleCloseFocus: () => void;
}

export default function ShowSearch({
  searchTerm,
  isFocused,
  handleCloseFocus,
}: Props) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [loading, setLoading] = useState(false);
  const { data: shows } = useGetShowsBySearchTermQuery(debouncedSearchTerm, {
    skip: debouncedSearchTerm === "",
  });
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  const navigate = useNavigate();

  const goToPage = (id: number) => {
    navigate(`/watch/shows/${id}`);
    handleCloseFocus();
  };

  useEffect(() => {
    setLoading(true);
    const debouncedSearch = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    setLoading(false);
  }, [shows]);

  return (
    <Collapse show={isFocused}>
      <div>
        {!loading && shows && shows.results && shows.results.length > 0 ? (
          shows?.results?.slice(0, 5).map((show) => (
            <div
              key={show.id}
              onClick={() => goToPage(show.id)}
              className={classNames("flex gap-4 hover:bg-dark-hover p-4", {
                "hover:bg-dark-hover": isDarkMode,
                "hover:bg-light-hover": !isDarkMode,
              })}
            >
              <div className="flex-shrink-0 h-16 w-10">
                <img
                  className="h-full w-full"
                  alt={show.name}
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
                      : defaultImage
                  }
                ></img>
              </div>
              <div className="">
                <p className="md:text-lg font-bold">{show.name}</p>
                <p className="md:inline-flex gap-2 hidden">
                  <span>Score: {show.vote_average}</span>
                  <span>&bull;</span>
                  <span>Popularity: {show.popularity}</span>
                  <span>&bull;</span>
                  <span>{show.first_air_date}</span>
                </p>
              </div>
            </div>
          ))
        ) : loading ? (
          <div className="flex justify-center p-4">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="fill"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass={
                isDarkMode ? "fill-dark-tertiary" : "fill-light-tertiary"
              }
              visible={true}
            />
          </div>
        ) : (
          searchTerm && (
            <div className="p-4 pb-8 text-center">No results Found</div>
          )
        )}
      </div>
    </Collapse>
  );
}
