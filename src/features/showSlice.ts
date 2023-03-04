import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const getPopularShows: any = createAsyncThunk(
  "popularShows/getPopularShows",
  async (page) => {
    const response = await fetch(
      `
         https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getTopRatedShows: any = createAsyncThunk(
  "topRatedShows/getTopRatedShows",
  async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getUpcomingShows: any = createAsyncThunk(
  "upcomingShows/getUpcomingShows",
  async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/upcoming?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getShowDetails: any = createAsyncThunk(
  "ShowsDetails/getShowsDetails",
  async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&append_to_response=videos&language=en-US`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

interface Show {
  id: number;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  name: string;
  release_date: string;
  populrity: number;
  original_title: string;
  original_language: string;
}

interface interfaceShowDetail {
  id: number;
  name: string;
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

type Shows = {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
};

interface ShowState {
  loading: boolean;
  activeShows: Shows | null;
  showDetails: interfaceShowDetail | null;
  cardDetailLoading: boolean;
}

export const showSlice = createSlice({
  name: "show",
  initialState: {
    activeShows: null,
    loading: false,
    showDetails: null,
    cardDetailLoading: false,
  } as ShowState,
  reducers: {},
  extraReducers: {
    [getPopularShows.pending]: (state) => {
      state.loading = true;
    },
    [getPopularShows.fulfilled]: (state, action: PayloadAction<Shows>) => {
      state.activeShows = action.payload;
      state.loading = false;
    },
    [getPopularShows.rejected]: (state) => {
      state.loading = false;
    },
    [getTopRatedShows.pending]: (state) => {
      state.loading = true;
    },
    [getTopRatedShows.fulfilled]: (state, action: PayloadAction<Shows>) => {
      state.activeShows = action.payload;
      state.loading = false;
    },
    [getTopRatedShows.rejected]: (state) => {
      state.loading = false;
    },
    [getUpcomingShows.pending]: (state) => {
      state.loading = true;
    },
    [getUpcomingShows.fulfilled]: (state, action: PayloadAction<Shows>) => {
      state.activeShows = action.payload;
      state.loading = false;
    },
    [getUpcomingShows.rejected]: (state) => {
      state.loading = false;
    },
    [getShowDetails.pending]: (state) => {
      state.cardDetailLoading = true;
    },
    [getShowDetails.fulfilled]: (state, action: any) => {
      state.showDetails = action.payload;
      state.cardDetailLoading = false;
    },
    [getShowDetails.rejected]: (state) => {
      state.cardDetailLoading = false;
    },
  },
});

export default showSlice.reducer;
export type { Shows, ShowState, Show, interfaceShowDetail };
