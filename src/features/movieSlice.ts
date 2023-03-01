import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export const getPopularMovies: any = createAsyncThunk(
	'popularMovies/getPopularMovies',
	async page => {
		const response = await fetch(
			`
         https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${page}`,
		)
		const formatResponse = await response.json()
		return formatResponse
	},
)

export const getTopRatedMovies = createAsyncThunk(
	'topRatedMovies/getTopRatedMovies',
	async page => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${page}`,
		)
		const formatResponse = await response.json()
		return formatResponse
	},
)

export const getMovieDiscover = createAsyncThunk(
	'movieDiscover/getMovieDiscover',
	async () => {
		const response = await fetch(
			`
         https://api.themoviedb.org/3/discover/movie?api_key=69a8a5f5d8ff53eb47ca412ef26ae76f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatratehttps://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
		)
		const formatResponse = await response.json()
		return formatResponse
	},
)

export const getUpcomingMovies = createAsyncThunk(
	'upcomingMovies/getUpcomingMovies',
	async page => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&page=${page}`,
		)
		const formatResponse = await response.json()
		return formatResponse
	},
)

export const getMovieDetails: any = createAsyncThunk(
	'movieDetails/getMovieDetails',
	async id => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&append_to_response=videos&language=en-US`,
		)
		const formatResponse = await response.json()
		return formatResponse
	},
)

interface Movie {
    id: number,
    overview: string,
    poster_path: string,
    vote_average: number,
    vote_count: number,
    title: string,
    release_date: string,
    populrity: number,
    original_title: string,
    original_language: string,

}

type Movies = {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number,
    
} 

interface MovieState {
    loading: boolean,
    popularMovies: Movies | null,
	movieDetails: any
}


export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        popularMovies: null,
        loading: false,
		movieDetails: [],
    } as MovieState,
    reducers: {},
    extraReducers: {
        [getPopularMovies.pending]: state => {
            state.loading = true
        },
        [getPopularMovies.fulfilled]: (state, action: PayloadAction<Movies>) => {
            state.popularMovies = action.payload
            state.loading = false
        },
        [getPopularMovies.rejected]: state => {
            state.loading = false
        },
		[getMovieDetails.pending]: state => {
            state.loading = true
        },
        [getMovieDetails.fulfilled]: (state, action: any) => {
			console.log(action.payload);
            state.movieDetails = action.payload
            state.loading = false
        },
        [getMovieDetails.rejected]: state => {
            state.loading = false
			
        },
    },
})

export default movieSlice.reducer;
export type {
    Movies,
    MovieState,
    Movie,
}