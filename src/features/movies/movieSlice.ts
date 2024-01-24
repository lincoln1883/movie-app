import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface Movie {
	id: string | number;
	title: string;
	release_date: string;
	poster_path: string;
	vote_average: number;
	overview: string;
}

interface MovieState {
	movie: Movie | null;
	movies: Movie[];
	status: "idle" | "loading" | "failed" | "success";
	error: string | null;
}

const initialState: MovieState = {
	movie: null,
	movies: [],
	status: "idle",
	error: null,
};


export const fetchMovies = createAsyncThunk<Movie[],void,{rejectValue: string}>("movies/fetchMovies",async (_,thunkAPI) => {
	try {	
	const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
  );
	console.log(response.data);
		return response.data.results;
	}catch(error: unknown | any){
		return thunkAPI.rejectWithValue(error.message || "Failed to fetch movies");
	}
});

export const fetchMovieById = createAsyncThunk<Movie,string,{rejectValue: string}>("movies/fetchMovieById",async (id, thunkAPI) => {
	try {	
	const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${apiKey}&language=en-US`,
	);
	const result = response.data;
	console.log(result);
	return result;
	}catch(error: unknown | any){
		return thunkAPI.rejectWithValue(error.message || "Failed to fetch movies");
	}
});

export const fetchMovieBySearch = createAsyncThunk<Movie[],string,{rejectValue: string}>("movies/fetchMovieBySearch",async (search, thunkAPI) => {
	try {	
	const response = await axios.get(`${BASE_URL}/search/movie?query=${search}&api_key=${apiKey}&language=en-US&page=1&include_adult=false`,
	);
	const result = response.data.results;
	console.log(result);
	return result;
	}catch(error: unknown | any){
		return thunkAPI.rejectWithValue(error.message || "Failed to fetch movies");
	}
});


const movieSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchMovies.pending, (state) => {
			state.status = "loading";
		}).addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
			state.status = "success";
			state.movies = action.payload;
		}).addCase(fetchMovies.rejected, (state) => {
			state.status = "failed";
		}).addCase(fetchMovieById.pending, (state) => {
			state.status = "loading";
		}).addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<Movie>) => {
			state.status = "success";
			const movie = {
				id: action.payload.id,
				title: action.payload.title,
				release_date: action.payload.release_date,
				poster_path: action.payload.poster_path,
				overview: action.payload.overview,
				vote_average: action.payload.vote_average,
			};
			state.movie = movie;
		}).addCase(fetchMovieById.rejected, (state) => {
			state.status = "failed";
		}).addCase(fetchMovieBySearch.pending, (state) => {
			state.status = "loading";
		}).addCase(fetchMovieBySearch.fulfilled, (state, action: PayloadAction<Movie[]>) => {
			state.movies = action.payload;
			state.status = "success";
		}).addCase(fetchMovieBySearch.rejected, (state) => {
			state.status = "failed";
		});
	}
});

export default movieSlice.reducer;

export const fetchOneMovie = (state: MovieState) => state.movies;
