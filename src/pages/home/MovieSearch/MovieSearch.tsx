import React, { useState, useEffect } from "react";
import { Collapse } from "../../../components";
// import Collapse from "@mui/material/Collapse";
import { useGetMoviesBySearchTermQuery } from "../../../features/apiSlice";

interface Props {
  searchTerm: string;
  isFocused: boolean;
}

export const MovieSearch: React.FC<Props> = ({ searchTerm, isFocused }) => {
  const { data: movies, isFetching } =
    useGetMoviesBySearchTermQuery(searchTerm);
  const [firstLoad, setFirstLoad] = useState(true);

  React.useEffect(() => {
    console.log("render");
  });

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <Collapse show={!isFetching && isFocused && !firstLoad}>
      <div className="p-4">
        {movies?.results?.slice(0, 5).map((movie) => (
          <div key={movie.id}>movies</div>
        ))}
      </div>
    </Collapse>
  );
};
