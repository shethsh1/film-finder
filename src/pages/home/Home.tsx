import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";
import { MDContainer, Collapse } from "../../components";
import MovieSearch from "./MovieSearch/MovieSearch";
import ShowSearch from "./ShowSearch/ShowSearch";
import AnimeSearch from "./AnimeSearch/AnimeSearch";

type ActiveTab = "Movies" | "Shows" | "Anime";

export const Home = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  const [activeTab, setActiveTab] = useState<ActiveTab>("Movies");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  function handleInputChange(event: any) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    // do something with the search term
  }

  function handleActiveTab(tab: ActiveTab) {
    setActiveTab(tab);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSearchTerm("");
  }, [activeTab]);

  return (
    <div className="mt-16 min-h-[800px]">
      <MDContainer>
        <div
          ref={containerRef}
          className={classNames({
            "text-dark-font-primary": isDarkMode,
            "text-light-font-primary": !isDarkMode,
          })}
        >
          <div className="text-4xl flex flex-col gap-4 items-center mb-12">
            <h1 className="text-center" style={{ fontFamily: "Lobster Two" }}>
              Hello! Welcome to Film Finder
            </h1>
            <p
              className="text-3xl text-center"
              style={{ fontFamily: "Poppins" }}
            >
              Find Your Favorite Movies, TV Shows, and Anime
            </p>
          </div>
          <form onSubmit={handleSubmit} className="relative">
            <div
              className={classNames("flex items-center border-b-2  py-2", {
                "border-dark-tertiary": isDarkMode,
                "border-light-tertiary": !isDarkMode,
              })}
            >
              <input
                onFocus={handleFocus}
                className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
              />
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
              {activeTab === "Movies" && searchTerm !== "" && (
                <MovieSearch searchTerm={searchTerm} isFocused={isFocused} />
              )}
              {activeTab === "Shows" && searchTerm !== "" && (
                <ShowSearch searchTerm={searchTerm} isFocused={isFocused} />
              )}
              {activeTab === "Anime" && searchTerm !== "" && (
                <AnimeSearch searchTerm={searchTerm} isFocused={isFocused} />
              )}
            </div>
            {/* Search below ends */}
          </form>
        </div>
      </MDContainer>
    </div>
  );
};
