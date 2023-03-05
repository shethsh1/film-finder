import React, { useEffect, useState, useRef } from "react";

interface Props {
  children: React.ReactNode;
  show: boolean;
  duration?: number;
}

export const Collapse: React.FC<Props> = ({
  children,
  show,
  duration = 200,
}) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (show) {
      // Get the height of the collapsed content and set it as the max-height
      setHeight(contentRef.current?.scrollHeight || 0);
    } else {
      setHeight(0);
    }
  }, [show]);

  return (
    <div
      className="overflow-hidden"
      style={{
        transition: `max-height ${duration}ms ease-in-out`,
        maxHeight: show ? `${height}px` : "0px",
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
