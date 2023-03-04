import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { interfaceMovieDetail } from "./movieSlice";
import { interfaceShowDetail } from "./showSlice";
import { interfaceAnimeDetail } from "./animeSlice";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/movie` }),
  endpoints: (builder) => ({
    getMovieById: builder.query<interfaceMovieDetail, number>({
      query: (id) =>
        `/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&append_to_response=videos&language=en-US`,
    }),
  }),
});

export const showsApi = createApi({
  reducerPath: "showsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/tv` }),
  endpoints: (builder) => ({
    getShowById: builder.query<interfaceShowDetail, number>({
      query: (id) =>
        `/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&append_to_response=videos&language=en-US`,
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

export const { useGetMovieByIdQuery } = moviesApi;
export const { useGetShowByIdQuery } = showsApi;
export const { useGetAnimeByIdQuery } = animeApi;
