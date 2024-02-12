import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerPending, registerFailed, registerSuccess } from '../auth/authSlice';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'failed' | 'success';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

export const createUser = createAsyncThunk<User, object, { rejectValue: string }>(
  'user/createUser',
  async (user, thunkAPI) => {
    registerPending();
    try {
      const response = await axios.post(`${BASE_URL}/signup`, user);
      registerSuccess(response.data);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown | any) {
      registerFailed(error.response.data.error);
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;