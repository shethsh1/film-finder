import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";
import { XLContainer, MDContainer, Collapse } from "../../components";

const movies = [
  {
    label: "test",
  },
  {
    label: "test2",
  },
  {
    label: "test3",
  },
  {
    label: "test4",
  },
  {
    label: "test5",
  },
  {
    label: "test6",
  },
  {
    label: "test",
  },
  {
    label: "test2",
  },
  {
    label: "test3",
  },
  {
    label: "test4",
  },
  {
    label: "test5",
  },
  {
    label: "test6",
  },
];

type ActiveTab = "Movies" | "Shows" | "Anime";

export const Home = () => {
  let timeout: string | number | NodeJS.Timeout | undefined;
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  const [activeTab, setActiveTab] = useState<ActiveTab>("Movies");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setIsFocused(false);
    }, 600); // Set the delay time in milliseconds
  };

  const handleMouseEnter = () => {
    clearTimeout(timeout);
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

  return (
    <div className="mt-16">
      <MDContainer>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={classNames({
            "text-dark-font-primary": isDarkMode,
            "text-light-font-primary": !isDarkMode,
          })}
        >
          <form onSubmit={handleSubmit} className="relative">
            <div
              className={classNames("flex items-center border-b-2  py-2", {
                "border-dark-tertiary": isDarkMode,
                "border-light-tertiary": !isDarkMode,
              })}
            >
              <input
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
                "absolute z-10 w-full cursor-pointer select-none mt-2 origin-top-right divide-gray-100 rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none",
                {
                  "bg-light-secondary": !isDarkMode,
                  "bg-dark-secondary": isDarkMode,
                }
              )}
            >
              <Collapse show={isFocused}>
                <div className="p-4">
                  {/* tabs start */}
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
                  {/* tabs ends */}
                </div>
              </Collapse>

              {/* results starts */}
              <Collapse show={searchTerm.length > 0 && isFocused}>
                <div className="p-4">
                  {movies.map((movie) => (
                    <div>{movie.label}</div>
                  ))}
                </div>
              </Collapse>
              {/* results ends */}
            </div>
            {/* Search below ends */}
          </form>
        </div>
      </MDContainer>
    </div>
  );
};
