// @ts-nocheck
import React, { useState } from "react";

export const CardTooltip = ({ children, text, className }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={toggleTooltip}
      onMouseLeave={toggleTooltip}
    >
      {children}
      {showTooltip && (
        <div className="p-2 ml-1 bg-gray-800 text-white text-sm rounded-xl absolute left- left-full mt-2 z-50 top-1/4">
          {text}
        </div>
      )}
    </div>
  );
};
