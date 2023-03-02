//@ts-nocheck
import React, { useState, useEffect, cloneElement } from "react";
const duration = 300;
export const Fade = ({ children, show }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setOpacity(1);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
    }
  }, [show]);

  const fadeStyles = {
    opacity: opacity,
    transition: `opacity ${duration}ms`,
    visibility: show ? "visible" : "hidden",
  };

  return cloneElement(children, { style: fadeStyles });
};
