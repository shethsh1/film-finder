import classNames from "classnames";
import React, { useState, useEffect, useContext } from "react";
import { Collapse } from "../../../components";
import { ThemeContext } from "../../../context/Theme/ThemeContext";
import { useGetAnimeBySearchTermQuery } from "../../../features/apiSlice";
import { debounce } from "lodash";
import defaultImage from "../../../images/No-Image.png";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router";

interface Props {
  searchTerm: string;
  isFocused: boolean;
}

export default function AnimeSearch({ searchTerm, isFocused }: Props) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [loading, setLoading] = useState(true);
  const { data: anime } = useGetAnimeBySearchTermQuery(debouncedSearchTerm);
  const [firstLoad, setFirstLoad] = useState(true);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  const navigate = useNavigate();

  const goToPage = (id: number) => {
    navigate(`/watch/anime/${id}`);
  };

  useEffect(() => {
    setFirstLoad(false);
  }, []);

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
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [anime]);

  return (
    <Collapse show={!firstLoad && isFocused} addBuffer={31}>
      <div>
        {!loading && anime && anime.length > 0 ? (
          anime?.slice(0, 5).map((ani) => (
            <div
              key={ani.mal_id}
              onClick={() => goToPage(ani.mal_id)}
              className={classNames("flex gap-4 hover:bg-dark-hover p-4", {
                "hover:bg-dark-hover": isDarkMode,
                "hover:bg-light-hover": !isDarkMode,
              })}
            >
              <div className="flex-shrink-0 h-16 w-10">
                <img
                  className="h-full w-full"
                  alt={ani.title}
                  src={
                    ani?.images.jpg?.image_url
                      ? ani.images.jpg.image_url
                      : defaultImage
                  }
                ></img>
              </div>
              <div className="">
                <p className="md:text-lg font-bold">{ani.title}</p>
                <p className="md:inline-flex gap-2 hidden">
                  <span>Score: {ani.score}</span>
                  <span>&bull;</span>
                  <span>{ani.status}</span>
                  <span>&bull;</span>
                  <span>{ani.aired.string}</span>
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
          <div className="p-4 text-center">No results Found</div>
        )}
      </div>
    </Collapse>
  );
}
