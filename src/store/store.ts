import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from '../features/movieSlice'
import ShowReducer from '../features/showSlice'

export const store = configureStore({
  reducer: {
    movie: MovieReducer,
    show: ShowReducer,
  },
  devTools: true,
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch