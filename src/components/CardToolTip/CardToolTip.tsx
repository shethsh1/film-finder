import React, { useState, useRef, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getMovieDetails, Movie } from "../../features/movieSlice";
import classNames from "classnames";
import { Fade } from "../Animations/Fade";
import { ThemeContext } from "../../context/Theme/ThemeContext";

type CardTooltipProps = {
  children: React.ReactNode;
  text: string;
  className?: string;
  id: number;
  detailMethod: any;
};

export const CardTooltip = ({
  children,
  text,
  className,
  id,
  detailMethod,
}: CardTooltipProps) => {
  let timeout: any;
  const { theme } = useContext(ThemeContext);
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
    setShowTooltip(false);
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
            "p-4 w-60 h-auto text-sm rounded-xl absolute mt-2 top-1/4 z-50",
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
          <div>
            <h1 className="text-md font-bold">
              The Simpsons Meet the Bocellis in Feliz Navidad
            </h1>
            {/* <h1>Raccoon Rascal</h1>
            <p>Other names: Araiguma Rascal; Raccoon Rascal</p>
            <p>Scores: 6.74 / 834 reviews</p>
            <p>Date aired: Jan 02, 1977 to Dec 25, 1977</p>
            <p>Duration: 26 min</p>
            <p>Status: Releasing</p>
            <p>Genre: Drama, Slice of Life</p>
            <p>
              Life in Brailsford Junction, Wisconsin, is simple and quiet for
              Sterling North, who spends most of his free time caring for
              animals. With his mother in the hospital and his brother fighting
              on the Western Front, the boy lives only with his father and...
            </p> */}
          </div>
        </div>
      </Fade>
    </div>
  );
};
