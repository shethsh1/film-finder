import { useState, useEffect, cloneElement } from "react";
const duration = 300;

type FadeTooltipProps = {
  children: any;
  show: boolean;
};

export const Fade = ({ children, show }: FadeTooltipProps) => {
  const [opacity, setOpacity] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setOpacity(1);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const fadeStyles = {
    opacity: opacity,
    transition: `opacity ${duration}ms`,
    visibility: visible ? "visible" : "hidden",
  };

  return cloneElement(children, { style: fadeStyles });
};
