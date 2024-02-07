import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
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

export const fetchShowCredits = createAsyncThunk<
  Credit[],
  string,
  {rejectValue: string}
>('credits/fetchShowCredits', async (id, thunkAPI) => {
    try {
        const response = await axios.get(
        `${BASE_URL}/tv/${id}/credits?api_key=${apiKey}&language=en-US`);
        const result = response.data;
        return result.cast;
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to fetch show credits');
    }
});

export const showCreditSlice = createSlice({
    name: 'credits',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchShowCredits.pending, (state) => {
        state.status = 'loading';
        });
        builder.addCase(fetchShowCredits.fulfilled, (state, action: PayloadAction<Credit[]>) => {
        state.status = 'success';
        state.credits = action.payload;
        });
        builder.addCase(fetchShowCredits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        });
    }
});

export default showCreditSlice.reducer;