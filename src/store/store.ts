import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "../features/movieSlice";
import ShowReducer from "../features/showSlice";
import AnimeReducer from "../features/animeSlice";
import { moviesApi, showsApi, animeApi } from "../features/apiSlice";

export const store = configureStore({
  reducer: {
    movie: MovieReducer,
    show: ShowReducer,
    anime: AnimeReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [showsApi.reducerPath]: showsApi.reducer,
    [animeApi.reducerPath]: animeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware, showsApi.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
