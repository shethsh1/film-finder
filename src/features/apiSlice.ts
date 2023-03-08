import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { interfaceMovieDetail, Movies } from "./movieSlice";
import { interfaceShowDetail, Shows } from "./showSlice";
import { AnimeObject, interfaceAnimeDetail } from "./animeSlice";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `         ${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}`,
  }),
  endpoints: (builder) => ({
    getMovieById: builder.query<interfaceMovieDetail, number>({
      query: (id) =>
        `/movie/${id}?append_to_response=videos&language=en-US&api_key=${
          process.env.REACT_APP_MOVIE_DB_KEY_LOCAL || ""
        }`,
    }),
    getMoviesBySearchTerm: builder.query<Movies, string>({
      query: (searchterm) =>
        `/search/movie?language=en-US&query=${searchterm}&include_adult=false&api_key=${
          process.env.REACT_APP_MOVIE_DB_KEY_LOCAL || ""
        }`,
    }),
  }),
});

export const showsApi = createApi({
  reducerPath: "showsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `         ${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}`,
  }),
  endpoints: (builder) => ({
    getShowById: builder.query<interfaceShowDetail, number>({
      query: (id) =>
        `/tv/${id}?append_to_response=videos&language=en-US&api_key=${
          process.env.REACT_APP_MOVIE_DB_KEY_LOCAL || ""
        }`,
    }),
    getShowsBySearchTerm: builder.query<Shows, string>({
      query: (searchterm) =>
        `/search/tv?language=en-US&query=${searchterm}&include_adult=false&api_key=${
          process.env.REACT_APP_MOVIE_DB_KEY_LOCAL || ""
        }`,
    }),
  }),
});

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.jikan.moe/v4/anime` }),
  endpoints: (builder) => ({
    getAnimeById: builder.query<interfaceAnimeDetail, number>({
      query: (id) => `${id}`,
      transformResponse: (response: { data: interfaceAnimeDetail }) =>
        response.data,
    }),
    getAnimeBySearchTerm: builder.query<AnimeObject[], string>({
      query: (searchterm) => `?q=${searchterm}`,
      transformResponse: (response: { data: AnimeObject[] }) => response.data,
    }),
  }),
});

export const { useGetMovieByIdQuery, useGetMoviesBySearchTermQuery } =
  moviesApi;
export const { useGetShowByIdQuery, useGetShowsBySearchTermQuery } = showsApi;
export const { useGetAnimeByIdQuery, useGetAnimeBySearchTermQuery } = animeApi;
