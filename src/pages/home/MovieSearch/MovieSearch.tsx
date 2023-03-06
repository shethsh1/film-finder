import React from "react";
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

  console.log(isFocused);

  return (
    <Collapse show={!isFetching && isFocused}>
      <div className="p-4">
        {movies?.results?.map((movie) => (
          <div key={movie.id}>movies</div>
        ))}
      </div>
    </Collapse>
  );
};
