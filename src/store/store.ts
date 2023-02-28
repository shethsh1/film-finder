import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from '../features/movieSlice'

export const store = configureStore({
  reducer: {
    movie: MovieReducer,
  },
  devTools: true,
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch