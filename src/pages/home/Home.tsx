import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";
import { XLContainer, MDContainer } from "../../components";

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
];

export const Home = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  const [searchTerm, setSearchTerm] = useState("");

  function handleInputChange(event: any) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    // do something with the search term
  }

  return (
    <div className="mt-16">
      <MDContainer>
        <div
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
                "absolute z-10 w-full cursor-pointer select-none mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none",
                {
                  "bg-light-secondary": !isDarkMode,
                  "bg-dark-secondary": isDarkMode,
                }
              )}
            >
              <div className="p-4">
                {/* tabs start */}
                <div id="tabs" className="inline-flex font-bold gap-4">
                  <span
                    className={classNames("border-b-2", {
                      "border-light-tertiary": !isDarkMode,
                      "border-dark-tertiary": isDarkMode,
                    })}
                  >
                    Movies
                  </span>
                  <span>Shows</span>
                  <span>Anime</span>
                </div>
                {/* tabs ends */}

                <div className="mt-4 top-ddd-border">
                  <div className="mt-4">
                    {movies.map((movie) => (
                      <div>{movie.label}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Search below ends */}
          </form>
        </div>
      </MDContainer>
    </div>
  );
};
