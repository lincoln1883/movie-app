import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

interface Credit {
  id: string | number
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  profile_path: string;
  name: string;
  known_for_department: string;
}

interface CreditState {
  credits: Credit[];
  status: 'idle' | 'loading' | 'failed' | 'success';
  error: string | null;
}

const initialState: CreditState = {
  credits: [],
  status: 'idle',
  error: null,
};

export const fetchMovieCredits = createAsyncThunk<
  Credit[],
  string,
  {rejectValue: string}
>('credits/fetchMovieCredits', async (id, thunkAPI) => {
    try {
        const response = await axios.get(
        `${BASE_URL}/movie/${id}/credits?api_key=${apiKey}&language=en-US`);
        const result = response.data;
        return result.cast;
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch movie credits');
    }
});

export const creditSlice = createSlice({
    name: 'credits',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovieCredits.pending, (state) => {
        state.status = 'loading';
        });
        builder.addCase(fetchMovieCredits.fulfilled, (state, action: PayloadAction<Credit[]>) => {
        state.status = 'success';
        state.credits = action.payload;
        });
        builder.addCase(fetchMovieCredits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        });
    },
});

export default creditSlice.reducer;