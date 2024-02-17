import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const token = localStorage.getItem("token") as string;

interface User {
  id: string; 
  username: string;
  email: string;
  password: string;
	profilePicture: string;
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
    thunkAPI.dispatch(registerPending());
    try {
      const response = await axios.post(`${BASE_URL}/signup`, user);
      thunkAPI.dispatch(registerSuccess(response.data));
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown | any) {
      thunkAPI.dispatch(registerFailed(error.response.data.error));
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchUser = createAsyncThunk<User, string, { rejectValue: string }>(
	'user/fetchUser',
	async (id, thunkAPI) => {
		try {
			const response = await axios.get(`${BASE_URL}/users/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
			return response.data;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: unknown | any) {
			return thunkAPI.rejectWithValue(error.response.data.error);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		registerPending: (state) => {
			state.status = "loading";
		},
		registerSuccess: (state, action) => {
			state.status = "success";
			state.user = action.payload;
			state.error = null;
		},
		registerFailed: (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload;
			})
			.addCase(createUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			});
	},
});

export const { registerPending, registerSuccess, registerFailed, clearError } = userSlice.actions;
export default userSlice.reducer;