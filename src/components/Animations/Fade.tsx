import React, { useState, useEffect } from "react";
import classNames from "classnames";

interface Props {
  show: boolean;
  children: React.ReactNode;
}

export const Fade: React.FC<Props> = ({ show, children }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div
      className={classNames(`transition-opacity duration-300`, {
        "opacity-0": !isVisible,
        "opacity-100": isVisible,
      })}
    >
      {children}
    </div>
  );
};
