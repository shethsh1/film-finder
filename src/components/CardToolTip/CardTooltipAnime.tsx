import React, { useState, useRef, useEffect, useContext } from "react";
import classNames from "classnames";
import { Fade } from "../Animations/Fade";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { useAppSelector } from "../../store/hooks";
import { AnimeObject } from "../../features/animeSlice";
type CardTooltipProps = {
  children: React.ReactNode;
  className?: string;
  id: number;
};

export const CardTooltipAnime = ({
  children,
  className,
  id,
}: CardTooltipProps) => {
  let timeout: any;
  const { theme } = useContext(ThemeContext);
  const loading = useAppSelector((state) => state.anime.cardDetailLoading);
  const animeState = useAppSelector((state) => state.anime.activeAnimes);
  const [details, setDetails] = useState<AnimeObject | null>(null);

  const isDarkMode = theme === "dark" ? true : false;
  const [showTooltip, setShowTooltip] = useState(false);
  const [direction, setDirection] = useState("right");
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const toggleTooltip = () => {
    timeout = setTimeout(() => {
      setShowTooltip(true);
    }, 400);
  };

  const hideTooltip = () => {
    clearInterval(timeout);
    setTimeout(() => {
      setShowTooltip(false);
    }, 400);
  };

  useEffect(() => {
    const result = animeState?.data.find((anime) => anime.mal_id === id);
    setDetails(result as AnimeObject);
  }, [animeState, id]);

  useEffect(() => {
    if (buttonRef.current && showTooltip) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - buttonRect.right;
      const spaceLeft = window.innerWidth - buttonRect.left;
      if (spaceRight < 0) {
        setDirection("left");
        return;
      }
      if (spaceLeft < 0) {
        setDirection("right");
      }
    }
  }, [showTooltip]);

  return (
    <div
      className={`${className} relative`}
      onMouseEnter={toggleTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <Fade show={showTooltip}>
        <div
          ref={buttonRef}
          className={classNames(
            "p-4 w-60 h-auto text-sm rounded-xl absolute mt-2 top-1/4 z-50 hidden md:block",
            {
              "right-full mr-1": direction === "left",
              "left-full ml-1": direction === "right",
              "text-dark-font-primary": isDarkMode,
              "text-light-font-primary": !isDarkMode,
              "bg-dark-secondary": isDarkMode,
              "bg-light-secondary": !isDarkMode,
            }
          )}
        >
          {!loading ? (
            <div>
              <h1 className="text-md font-bold">{details?.title}</h1>
              <div className="text-xs mt-2">
                <p className="mb-2">{details?.synopsis?.slice(0, 400)}...</p>
                <p>Score: {details?.score}</p>
                <p>Status: {details?.status}</p>
                <p>Release date: {details?.aired?.string}</p>
              </div>

              <div className="genre mt-2 text-xs">
                <div className="inline-flex gap-1 flex-wrap">
                  <span className="font-bold">Genre:</span>
                  {details?.genres?.map((o) => (
                    <span key={o.mal_id}>{o.name}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>loading</div>
          )}
        </div>
      </Fade>
    </div>
  );
};
