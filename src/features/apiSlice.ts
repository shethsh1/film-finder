import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { interfaceMovieDetail, Movies } from "./movieSlice";
import { interfaceShowDetail, Shows } from "./showSlice";
import { interfaceAnimeDetail } from "./animeSlice";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3` }),
  endpoints: (builder) => ({
    getMovieById: builder.query<interfaceMovieDetail, number>({
      query: (id) =>
        `/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&append_to_response=videos&language=en-US`,
    }),
    getMoviesBySearchTerm: builder.query<Movies, string>({
      query: (searchterm) =>
        `/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&query=${searchterm}&include_adult=false`,
    }),
  }),
});

export const showsApi = createApi({
  reducerPath: "showsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3` }),
  endpoints: (builder) => ({
    getShowById: builder.query<interfaceShowDetail, number>({
      query: (id) =>
        `/tv/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&append_to_response=videos&language=en-US`,
    }),
    getShowsBySearchTerm: builder.query<Shows, string>({
      query: (searchterm) =>
        `/search/tv?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&query=${searchterm}&include_adult=false`,
    }),
  }),
});

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.jikan.moe/v4/anime` }),
  endpoints: (builder) => ({
    getAnimeById: builder.query<interfaceAnimeDetail, number>({
      query: (id) => `/${id}`,
      transformResponse: (response: { data: interfaceAnimeDetail }) =>
        response.data,
    }),
  }),
});

export const { useGetMovieByIdQuery, useGetMoviesBySearchTermQuery } =
  moviesApi;
export const { useGetShowByIdQuery, useGetShowsBySearchTermQuery } = showsApi;
export const { useGetAnimeByIdQuery } = animeApi;
