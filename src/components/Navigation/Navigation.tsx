import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul className="text-light-font-primary flex text-xl gap-8 py-4">
        <li>
          <NavLink to="/test">Home</NavLink>
        </li>
        <li>
          <NavLink to="/test">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/test">Shows</NavLink>
        </li>
        <li>
          <NavLink to="/test">Anime</NavLink>
        </li>
      </ul>
    </nav>
  );
};
