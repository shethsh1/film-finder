import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";
import { MDContainer, Collapse, MediaSearchQuery } from "../../components";
import MovieSearch from "../../components/MediaSearchQuery/MovieSearch/MovieSearch";
import ShowSearch from "../../components/MediaSearchQuery/ShowSearch/ShowSearch";
import AnimeSearch from "../../components/MediaSearchQuery/AnimeSearch/AnimeSearch";

type ActiveTab = "Movies" | "Shows" | "Anime";

export const Home = () => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  const containerRef = useRef<HTMLDivElement>(null);

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
          <div className="lg:text-4xl md:text-3xl text-2xl  flex flex-col gap-4 items-center mb-12">
            <h1 className="text-center" style={{ fontFamily: "Lobster Two" }}>
              Hello! Welcome to Film Finder
            </h1>
            <p
              className="lg:text-3xl md:text-2xl text-xl text-center"
              style={{ fontFamily: "Poppins" }}
            >
              Find Your Favorite Movies, TV Shows, and Anime
            </p>
          </div>
          <MediaSearchQuery />
        </div>
      </MDContainer>
    </div>
  );
};
