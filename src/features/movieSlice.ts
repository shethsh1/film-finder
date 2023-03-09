import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let API_KEY = "";
let cond = "&";
if (process.env.REACT_APP_MOVIE_DB_KEY_LOCAL) {
  API_KEY = `&api_key=${process.env.REACT_APP_MOVIE_DB_KEY_LOCAL}`;
  cond = "?";
}

export const getPopularMovies: any = createAsyncThunk(
  "popularMovies/getPopularMovies",
  async (page) => {
    const response = await fetch(
      `
         ${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}/movie/popular${cond}language=en-US&page=${page}${API_KEY}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getTopRatedMovies: any = createAsyncThunk(
  "topRatedMovies/getTopRatedMovies",
  async (page) => {
    const response = await fetch(
      `${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}/movie/top_rated${cond}language=en-US&page=${page}${API_KEY}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getUpcomingMovies: any = createAsyncThunk(
  "upcomingMovies/getUpcomingMovies",
  async (page) => {
    const response = await fetch(
      `${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}/movie/upcoming${cond}language=en-US&page=${page}${API_KEY}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getMovieDetails: any = createAsyncThunk(
  "movieDetails/getMovieDetails",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}/movie/${id}${cond}append_to_response=videos&language=en-US&${API_KEY}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getMovieByQuery: any = createAsyncThunk(
  "getMovieByQuery/getMovieByQuery",
  async (searchterm) => {
    const response = await fetch(`
    ${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}/search/movie${cond}language=en-US&query=${searchterm}&include_adult=false${API_KEY}`);
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
  topRatedMovies: Movies | null;
  movieDetails: interfaceMovieDetail | null;
  cardDetailLoading: boolean;
}

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popularMovies: null,
    topRatedMovies: null,
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
    [getTopRatedMovies.pending]: (state) => {},
    [getTopRatedMovies.fulfilled]: (state, action: PayloadAction<Movies>) => {
      state.topRatedMovies = action.payload;
    },
    [getTopRatedMovies.rejected]: (state) => {},
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
