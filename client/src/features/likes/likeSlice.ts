import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const token = localStorage.getItem("token") as string;

interface Like {
  _id?: string;
  userId: string;
  postId: string;
}

interface LikeState {
  like: Like | null;
  likes: Like[];
  status: "idle" | "loading" | "failed" | "success";
  error: string | null;
}

const initialState: LikeState = {
  like: null,
  likes: [],
  status: "idle",
  error: null,
};

export const createLike = createAsyncThunk<Like, Like, { rejectValue: string }>(
  "likes/createLike",
  async (like, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/likes`, like, {
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

export const getLikes = createAsyncThunk<Like[], void, { rejectValue: string }>(
  "likes/getLikes",
  async (_, thunkAPI) => {
    try {
      const token = (await localStorage.getItem("token")) as string;
      const response = await axios.get(`${BASE_URL}/likes`, {
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

export const disLike = createAsyncThunk<void, Like, { rejectValue: string }>(
  "likes/disLike",
  async ( payload, thunkAPI) => {
    try {
      const { userId, postId, _id } = payload;
      const response = await axios.delete(`${BASE_URL}/likes/${_id}`, {
        data: { userId, postId },
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

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLike.fulfilled, (state, action) => {
        state.status = "success";
        state.like = action.payload;
      })
      .addCase(createLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getLikes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLikes.fulfilled, (state, action) => {
        state.status = "success";
        state.likes = action.payload;
      })
      .addCase(getLikes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(disLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(disLike.fulfilled, (state,action) => {
        state.status = "success";
        state.likes = state.likes.filter((like) => like._id !== action.payload);
        state.error = null;
      })
      .addCase(disLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});


export default likeSlice.reducer;