import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (page) => `/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${page}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery } = moviesApi;