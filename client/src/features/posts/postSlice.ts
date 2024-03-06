import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/environment";

const BASE_URL = url;
const token = localStorage.getItem("token") as string;

interface Post {
  _id?: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  movieId: string;
  userId: string;
  rating: number;
  reviews?: string;
  likes?: string[];
  comments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface PostState {
  post: Post | null;
  posts: Post[];
  status: 'idle' | 'loading' | 'failed' | 'success';
  error: string | null;
}

const initialState: PostState = {
  post: null,
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[], void, { rejectValue: string }>(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const token = (await localStorage.getItem("token")) as string;
      const response = await axios.get(`${BASE_URL}/posts`, {
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

export const createPost = createAsyncThunk<Post, Post, { rejectValue: string }>(
  'posts/createPost',
  async (post, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, post, {
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

export const deletePost = createAsyncThunk<void, string, { rejectValue: string }>(
  'posts/deletePost',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${id}`, {
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

export const updatePost = createAsyncThunk<Post, Post, { rejectValue: string }>(
  'posts/updatePost',
  async (post, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/posts/${post._id}`, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postCreate: (state, action) => {
      state.status = "loading";
      state.post = action.payload;
      state.error = null;
    },
    clearPost: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "success";
        state.post = action.payload;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "success";
        state.post = action.payload;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
  }
});

export const { clearPost, postCreate } = postSlice.actions;

export default postSlice.reducer;