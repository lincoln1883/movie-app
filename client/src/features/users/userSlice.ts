import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/environment";

const BASE_URL = url;
//const token = await localStorage.getItem("token") as string;

interface User {
	_id?: string;
	username: string;
	firstName?: string;
	lastName?: string;
	email: string;
	password?: string;
	profilePicture?: string;
	bio?: string;
	following?: [];
	followers?: [];
}

interface UserState {
	user: User | null;
	users: User[] | null;
	status: "idle" | "loading" | "failed" | "success" | "User deleted successfully";
	error: string | null;
}

const initialState: UserState = {
	user: null,
	users: [],
	status: "idle",
	error: null,
};

export const createUser = createAsyncThunk<
	User,
	object,
	{ rejectValue: string }
>("user/createUser", async (user, thunkAPI) => {
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
});

export const fetchUser = createAsyncThunk<
	User,
	string,
	{ rejectValue: string }
>("user/fetchUser", async (id, thunkAPI) => {
	try {
		const token = localStorage.getItem("token") as string;
		const response = await axios.get(`${BASE_URL}/users/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(error.response.data.error);
	}
});

export const fetchAllUsers = createAsyncThunk<
	User[],
	void,
	{ rejectValue: string }
>("user/fetchAllUsers", async (_, thunkAPI) => {
	try {
		const token = localStorage.getItem("token") as string;
		const response = await axios.get(`${BASE_URL}/users`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(error.response.data.error);
	}
});

export const editUser = createAsyncThunk<User, User, { rejectValue: string }>(
	"user/editUser",
	async (user, thunkAPI) => {
		try {
			const token = localStorage.getItem("token") as string;
			const response = await axios.put(`${BASE_URL}/users/${user._id}`, user, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: unknown | any) {
			return thunkAPI.rejectWithValue(error.response.data.error);
		}
	}
);

export const followUser = createAsyncThunk<User, string, { rejectValue: string }>(
	"user/followUser", async (id, thunkAPI) => {
	try {
		const token = localStorage.getItem("token") as string;
		const response = await axios.put(`${BASE_URL}/users/${id}/follow`, {}, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data)
		return response.data;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(error.response.data.error);
	}
});

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
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})
			.addCase(fetchAllUsers.fulfilled, (state, action) => {
				state.status = "success";
				state.users = action.payload;
				state.error = null;
			})
			.addCase(fetchAllUsers.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})
			.addCase(editUser.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload;
			})
			.addCase(editUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})
			.addCase(followUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(followUser.fulfilled, (state, action) => {
				state.status = "success";
				state.user = action.payload;
			})
			.addCase(followUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			});
	},
});

export const { registerPending, registerSuccess, registerFailed, clearError } =
	userSlice.actions;
export default userSlice.reducer;
