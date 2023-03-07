import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const getPopularMovies: any = createAsyncThunk(
  "popularMovies/getPopularMovies",
  async (page) => {
    const response = await fetch(
      `
      /api/movie/popular?language=en-US&page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getTopRatedMovies: any = createAsyncThunk(
  "topRatedMovies/getTopRatedMovies",
  async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getUpcomingMovies: any = createAsyncThunk(
  "upcomingMovies/getUpcomingMovies",
  async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getMovieDetails: any = createAsyncThunk(
  "movieDetails/getMovieDetails",
  async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&append_to_response=videos&language=en-US`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getMovieByQuery: any = createAsyncThunk(
  "getMovieByQuery/getMovieByQuery",
  async (searchterm) => {
    const response = await fetch(`
        https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&query=${searchterm}&include_adult=false`);
    const formatResponse = await response.json();
    return formatResponse;
  }
);

interface Movie {
  id: number;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  title: string;
  release_date: string;
  popularity: number;
  original_title: string;
  original_language: string;
}

interface interfaceMovieDetail {
  id: number;
  title: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  overview: string;
  status: string;
  release_date: string;
  poster_path: string;
  videos: {
    results: { key: string; id: number }[];
  };
}

type Movies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

interface MovieState {
  loading: boolean;
  popularMovies: Movies | null;
  movieDetails: interfaceMovieDetail | null;
  cardDetailLoading: boolean;
}

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popularMovies: null,
    loading: false,
    movieDetails: null,
    cardDetailLoading: false,
  } as MovieState,
  reducers: {},
  extraReducers: {
    [getPopularMovies.pending]: (state) => {
      state.loading = true;
    },
    [getPopularMovies.fulfilled]: (state, action: PayloadAction<Movies>) => {
      state.popularMovies = action.payload;
      state.loading = false;
    },
    [getPopularMovies.rejected]: (state) => {
      state.loading = false;
    },
    [getTopRatedMovies.pending]: (state) => {
      state.loading = true;
    },
    [getTopRatedMovies.fulfilled]: (state, action: PayloadAction<Movies>) => {
      state.popularMovies = action.payload;
      state.loading = false;
    },
    [getTopRatedMovies.rejected]: (state) => {
      state.loading = false;
    },
    [getUpcomingMovies.pending]: (state) => {
      state.loading = true;
    },
    [getUpcomingMovies.fulfilled]: (state, action: PayloadAction<Movies>) => {
      state.popularMovies = action.payload;
      state.loading = false;
    },
    [getMovieByQuery.rejected]: (state) => {
      state.loading = false;
    },
    [getMovieByQuery.pending]: (state) => {
      state.loading = true;
    },
    [getMovieByQuery.fulfilled]: (state, action: PayloadAction<Movies>) => {
      state.popularMovies = action.payload;
      state.loading = false;
    },
    [getUpcomingMovies.rejected]: (state) => {
      state.loading = false;
    },

    [getMovieDetails.pending]: (state) => {
      state.cardDetailLoading = true;
    },
    [getMovieDetails.fulfilled]: (state, action: any) => {
      state.movieDetails = action.payload;
      state.cardDetailLoading = false;
    },
    [getMovieDetails.rejected]: (state) => {
      state.cardDetailLoading = false;
    },
  },
});

export default movieSlice.reducer;
export type { Movies, MovieState, Movie, interfaceMovieDetail };
