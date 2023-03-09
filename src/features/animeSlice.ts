import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPopularAnime: any = createAsyncThunk(
  "popularAnime/getPopularAnime",
  async (page) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/seasons/now?page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getUpcomingAnime: any = createAsyncThunk(
  "animeSeasons/upcoming",
  async (page) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/seasons/upcoming?page=${page}`
    );
    const formatResponse = await response.json();
    return formatResponse;
  }
);

export const getTopRatedAnime: any = createAsyncThunk(
  "etTopRatedAnime/getTopRatedAnime",
  async (page) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?page=${page}`
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
    from: string;
    string: string;
  };
  popularity: string;
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
    from: string;
    string: string;
  };
  popularity: string;
}

interface Anime {
  data: AnimeObject[];
  pagination: {
    current_page: number;
  };
  status: string;
}

interface AnimeState {
  activeAnimes: Anime | null;
  loading: boolean;
  cardDetailLoading: boolean;
  animeDetail: interfaceAnimeDetail | null;
  topRatedAnime: Anime | null;
}

export const animeSlice = createSlice({
  name: "anime",
  initialState: {
    activeAnimes: null,
    topRatedAnime: null,
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

    [getTopRatedAnime.pending]: (state) => {
      state.loading = true;
    },
    [getTopRatedAnime.fulfilled]: (state, action) => {
      state.topRatedAnime = action.payload;
      state.loading = false;
    },
    [getTopRatedAnime.rejected]: (state) => {
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

export type { interfaceAnimeDetail, AnimeObject, Anime };

export default animeSlice.reducer;
