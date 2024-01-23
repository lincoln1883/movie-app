import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface Movie {
	id: string;
	title: string;
	release_date: string;
	media_type: string;
	poster_path: string;
	rating: number;
}

interface MovieState {
	movies: Movie[];
	status: "idle" | "loading" | "failed" | "success";
	error: string | null;
}

const initialState: MovieState = {
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
	}catch(error: any){
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
		});
	}
});

export default movieSlice.reducer;