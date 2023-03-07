import React, { useRef, useEffect, useState } from "react";

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
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  useEffect(() => {
    setContentHeight(contentRef.current?.scrollHeight || 0);
  }, [children]);

  return (
    <div
      className="overflow-hidden"
      style={{
        transition: `height ${duration}ms ease-in-out`,
        height: show ? `${contentHeight}px` : "0px",
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
