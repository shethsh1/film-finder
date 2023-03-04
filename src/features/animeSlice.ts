import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPopularAnime: any = createAsyncThunk(
  "popularAnime/getPopularAnime",
  async (page) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getUpcomingAnime: any = createAsyncThunk(
  "animeSeasons/getAnimeRecommendations",
  async (page) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/seasons/upcoming?page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getAnimeDetails: any = createAsyncThunk(
  "animeDetails/getAnimeDetails",
  async (mal_id) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
    const formatResponse = await response.json();
    return formatResponse;
  }
);

interface AnimeObject {
  mal_id: number;
  images: {
    jpg?: {
      image_url: string;
    };
    webp?: {
      image_url: string;
    };
  };
  title: string;
  status: string;
  score: string;
  genres: { mal_id: number; name: string }[];
  trailer: {
    youtube_id: string;
  };
  synopsis: string;
  aired: {
    string: string;
  };
}

interface interfaceAnimeDetail {
  mal_id: number;
  images: {
    jpg?: {
      image_url: string;
    };
    webp?: {
      image_url: string;
    };
  };
  trailer: {
    youtube_id: string;
  };
  title: string;
  status: string;
  genres: { mal_id: number; name: string }[];
  synopsis: string;
  score: string;
  aired: {
    string: string;
  };
}

interface AnimeState {
  activeAnimes: {
    data: AnimeObject[];
    pagination: {
      current_page: number;
    };
    status: string;
  } | null;

  loading: boolean;
  cardDetailLoading: boolean;
  animeDetail: interfaceAnimeDetail | null;
}

export const animeSlice = createSlice({
  name: "anime",
  initialState: {
    activeAnimes: null,
    loading: false,
    cardDetailLoading: false,
    animeDetail: null,
  } as AnimeState,
  reducers: {},
  extraReducers: {
    [getPopularAnime.pending]: (state) => {
      state.loading = true;
    },
    [getPopularAnime.fulfilled]: (state, action) => {
      state.activeAnimes = action.payload;
      state.loading = false;
    },
    [getPopularAnime.rejected]: (state) => {
      state.loading = false;
    },
    [getUpcomingAnime.pending]: (state) => {
      state.loading = true;
    },
    [getUpcomingAnime.fulfilled]: (state, action) => {
      state.activeAnimes = action.payload;
      state.loading = false;
    },
    [getUpcomingAnime.rejected]: (state) => {
      state.loading = false;
    },

    [getAnimeDetails.pending]: (state) => {
      state.cardDetailLoading = true;
    },
    [getAnimeDetails.fulfilled]: (state, action) => {
      state.animeDetail = action.payload.data;
      state.cardDetailLoading = false;
    },
    [getAnimeDetails.rejected]: (state) => {
      state.cardDetailLoading = false;
    },
  },
});

export type { interfaceAnimeDetail, AnimeObject };

export default animeSlice.reducer;
