import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

let API_KEY = "";
let cond = "&";
if (process.env.REACT_APP_MOVIE_DB_KEY_LOCAL) {
  API_KEY = `&api_key=${process.env.REACT_APP_MOVIE_DB_KEY_LOCAL}`;
  cond = "?";
}

export const getPopularShows: any = createAsyncThunk(
  "popularShows/getPopularShows",
  async (page) => {
    const response = await fetch(
      `
      ${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}/tv/popular${cond}language=en-US&page=${page}${API_KEY}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getTopRatedShows: any = createAsyncThunk(
  "topRatedShows/getTopRatedShows",
  async (page) => {
    const response = await fetch(
      `${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}/tv/top_rated${cond}language=en-US&page=${page}${API_KEY}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getUpcomingShows: any = createAsyncThunk(
  "upcomingShows/getUpcomingShows",
  async (page) => {
    const response = await fetch(
      `${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}/tv/airing_today${cond}language=en-US&page=${page}${API_KEY}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getShowDetails: any = createAsyncThunk(
  "ShowsDetails/getShowsDetails",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_MOVIE_DB_API_WEBSITE}/tv/${id}${cond}append_to_response=videos&language=en-US${API_KEY}`
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
  popularity: number;
  original_title: string;
  original_language: string;
  first_air_date: string;
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
    results: { key: string; id: number; name: string }[];
  };
  first_air_date: string;
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
  topRatedShows: Shows | null;
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
      state.topRatedShows = action.payload;
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
