import React, { useState, useRef, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import classNames from "classnames";
import { Fade } from "../Animations/Fade";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { MediaTypes, MediaType } from "../../types/MediaTypes";

type CardTooltipProps = {
  children: React.ReactNode;
  className?: string;
  id: number;
  detailMethod: any;
  type: MediaTypes;
};

export const CardTooltip = ({
  children,
  className,
  id,
  detailMethod,
  type,
}: CardTooltipProps) => {
  let timeout: any;
  const { theme } = useContext(ThemeContext);
  const details = useAppSelector((state) =>
    type === MediaType.MOVIE ? state.movie.movieDetails : state.show.showDetails
  );
  const loading = useAppSelector((state) => state.movie.cardDetailLoading);
  const isDarkMode = theme === "dark" ? true : false;
  const [showTooltip, setShowTooltip] = useState(false);
  const [direction, setDirection] = useState("right");
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const toggleTooltip = () => {
    timeout = setTimeout(() => {
      dispatch(detailMethod(id));
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
                <p className="mb-2">{details?.overview}</p>
                <p>Score: {details?.vote_average}</p>
                <p>Status: {details?.status}</p>
                <p>Release date: {details?.release_date}</p>
              </div>

              <div className="genre mt-2 text-xs">
                <div className="inline-flex gap-1 flex-wrap">
                  <span className="font-bold">Genre:</span>
                  {details?.genres?.map((o) => (
                    <span key={o.id}>{o.name}</span>
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
