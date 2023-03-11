import classNames from "classnames";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { Collapse } from "../Animations";
import AnimeSearch from "./AnimeSearch/AnimeSearch";
import MovieSearch from "./MovieSearch/MovieSearch";
import ShowSearch from "./ShowSearch/ShowSearch";
import { FaSearch } from "react-icons/fa";

type ActiveTab = "Movies" | "Shows" | "Anime";

interface SearchQueryProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export default function MediaSearchQuery(props: SearchQueryProps) {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  const [activeTab, setActiveTab] = useState<ActiveTab>("Movies");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCloseFocus = () => {
    setIsFocused(false);
    setSearchTerm("");
  };

  function handleInputChange(event: any) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    // do something with the search term
  }

  function handleActiveTab(tab: ActiveTab) {
    setActiveTab(tab);
    setSearchTerm("");
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      className="relative"
      {...props}
    >
      <div
        className={classNames("flex items-center py-2", {
          "bg-dark-secondary": isDarkMode,
          "bg-light-secondary": !isDarkMode,
        })}
      >
        <div className="relative flex items-center  w-full">
          <div className="absolute left-0 ml-3">
            <FaSearch />
          </div>
          <input
            onFocus={handleFocus}
            className={classNames(
              "appearance-none bg-transparent border-none w-full ml-10 py-1 px-2 leading-tight focus:outline-none flex-1",
              {
                " placeholder-dark-font-primary": isDarkMode,
                " placeholder-light-font-primary": !isDarkMode,
              }
            )}
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Search below starts */}
      <div
        className={classNames(
          "absolute w-full cursor-pointer select-none mt-2 origin-top-right divide-gray-100 rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none",
          {
            "bg-light-secondary": !isDarkMode,
            "bg-dark-secondary": isDarkMode,
          }
        )}
      >
        <Collapse show={isFocused}>
          <div className="p-4">
            <div id="tabs" className="inline-flex font-bold gap-4">
              <button
                disabled={activeTab === "Movies"}
                onClick={() => handleActiveTab("Movies")}
                className={classNames({
                  "border-light-tertiary border-b-2":
                    !isDarkMode && activeTab === "Movies",
                  "border-dark-tertiary border-b-2":
                    isDarkMode && activeTab === "Movies",
                })}
              >
                Movies
              </button>
              <button
                disabled={activeTab === "Shows"}
                onClick={() => handleActiveTab("Shows")}
                className={classNames({
                  "border-light-tertiary border-b-2":
                    !isDarkMode && activeTab === "Shows",
                  "border-dark-tertiary border-b-2":
                    isDarkMode && activeTab === "Shows",
                })}
              >
                Shows
              </button>
              <button
                disabled={activeTab === "Anime"}
                onClick={() => handleActiveTab("Anime")}
                className={classNames({
                  "border-light-tertiary border-b-2":
                    !isDarkMode && activeTab === "Anime",
                  "border-dark-tertiary border-b-2":
                    isDarkMode && activeTab === "Anime",
                })}
              >
                Anime
              </button>
            </div>
          </div>
        </Collapse>

        {/* results starts */}
        {activeTab === "Movies" && (
          <MovieSearch
            searchTerm={searchTerm}
            isFocused={isFocused}
            handleCloseFocus={handleCloseFocus}
          />
        )}
        {activeTab === "Shows" && (
          <ShowSearch
            searchTerm={searchTerm}
            isFocused={isFocused}
            handleCloseFocus={handleCloseFocus}
          />
        )}
        {activeTab === "Anime" && (
          <AnimeSearch
            searchTerm={searchTerm}
            isFocused={isFocused}
            handleCloseFocus={handleCloseFocus}
          />
        )}
      </div>
      {/* Search below ends */}
    </form>
  );
}
