import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface Show {
  id: string | number;
  name: string;
  first_air_date: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  networks?: { name: string; logo_path: string }[];
}

interface ShowState {
  show: Show | null;
  shows: Show[];
  status: "idle" | "loading" | "failed" | "success";
  error: string | null;
}

const initialState: ShowState = {
  show: null,
  shows: [],
  status: "idle",
  error: null,
};

export const fetchShows = createAsyncThunk<
  Show[],
  string,
  { rejectValue: string }
>("shows/fetchShows", async (page, thunkAPI) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/popular?api_key=${apiKey}&language=en-US&page=${page}`
    );
    return response.data.results;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown | any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch shows");
  }
});

export const fetchShowById = createAsyncThunk<
  Show,
  string,
  { rejectValue: string }
>("shows/fetchShowById", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/${id}?api_key=${apiKey}&language=en-US`
    );
    const result = response.data;
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown | any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch shows");
  }
});

export const fetchShowBySearch = createAsyncThunk<
  Show[],
  string,
  { rejectValue: string }
>("shows/fetchShowBySearch", async (search, thunkAPI) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/tv?query=${search}&api_key=${apiKey}&language=en-US&page=1&include_adult=false`
    );
    const result = response.data.results;
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown | any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch shows");
  }
});

const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    clearShows: (state) => {
      state.shows = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShows.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchShows.fulfilled, (state, action) => {
      state.status = "success";
      state.shows = action.payload;
    });
    builder.addCase(fetchShows.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchShowById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchShowById.fulfilled, (state, action) => {
      state.status = "success";
      state.show = action.payload;
    });
    builder.addCase(fetchShowById.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchShowBySearch.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchShowBySearch.fulfilled,
      (state, action: PayloadAction<Show[]>) => {
        state.status = "success";
        state.shows = action.payload;
      }
    );
    builder.addCase(fetchShowBySearch.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default showSlice.reducer;
export const fetchOneShow = (state: ShowState) => state.shows;
