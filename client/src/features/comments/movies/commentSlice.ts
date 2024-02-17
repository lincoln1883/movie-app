import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;
const token = localStorage.getItem("token") as string;

interface Comment {
	_id?: string;
	movieId: string | number;
	userId: string;
	content: string;
	createdAt?: string;
	likes?: number;
	dislikes?: number;
}

interface CommentState {
	comment: Comment | null,
	comments: Comment[];
	status: "idle" | "loading" | "failed" | "success";
	error: string | null;
}

const initialState: CommentState = {
	comment: null,
	comments: [],
	status: "idle",
	error: null,
};

export const fetchComments = createAsyncThunk<
	Comment[],
	string,
	{ rejectValue: string }
>("comments/fetchComments", async (movieId, thunkAPI) => {
	try {
		const response = await axios.get(`${BASE_URL}/comments/${movieId}`);
		console.log(response);
		return response.data.comments;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(
			error.message || "Failed to fetch comments"
		);
	}
});

export const createComment = createAsyncThunk<
	Comment,
	Comment,
	{ rejectValue: string }
>("comments/createComment", async (comment, thunkAPI) => {
	try {
		const response = await axios.post(`${BASE_URL}/comments`, comment, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response);
		return response.data;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(
			error.message || "Failed to create comment"
		);
	}
});

export const commentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {
		addComment: (state, action: PayloadAction<Comment>) => {
			state.comments.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchComments.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.status = "success";
				state.comments = action.payload;
				state.error = null;
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload as string;
			})
			.addCase(createComment.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createComment.fulfilled, (state, action) => {
				state.status = "success";
				state.comments.push(action.payload);
				state.error = null;
			})
			.addCase(createComment.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	},
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;
