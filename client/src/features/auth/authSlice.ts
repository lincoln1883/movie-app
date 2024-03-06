import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPosts } from "../posts/postSlice";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

interface Auth {
  id: string;
  username: string;
  email: string;
  password: string;
  token: string;
}

interface AuthState {
  currentUser: Auth | null;
  status: "idle" | "loading" | "failed" | "success";
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk<Auth, object, { rejectValue: string }>(
  "auth/loginUser",
  async (user, thunkAPI) => {
    thunkAPI.dispatch(loginPending());
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, user);
      thunkAPI.dispatch(loginSuccess(response.data.user));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("currentUser", JSON.stringify(response.data.userObject));
      thunkAPI.dispatch(fetchPosts());
      return response.data.userObject;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown | any) {
      thunkAPI.dispatch(loginFailed(error.response.data.error));
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.status = "loading";
    },
    loginSuccess: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      state.error = null;
    }).addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const {loginPending, loginSuccess,loginFailed, clearError,logout } = authSlice.actions;
export default authSlice.reducer;