import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../../utils/environment";

const BASE_URL = url;
const token = localStorage.getItem("token") as string;

interface Comment {
	_id?: string;
	postId: string;
	userId: string;
	comment: string;
	createdAt?: string;
	updatedAt?: string;
	likes?: number;
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
	void,
	{ rejectValue: string }
>("comments/fetchComments", async (_, thunkAPI) => {
	try {
		const response = await axios.get(`${BASE_URL}/comments`,{
			headers:{
				Authorization: `Bearer ${token}`
			}
		});
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
		const response = await axios.post(`${BASE_URL}/posts/:postId/comments`, comment, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(
			error.message || "Failed to create comment"
		);
	}
});

export const editComment = createAsyncThunk<
	Comment,
	Comment,
	{ rejectValue: string }
>("comments/editComment", async (comment, thunkAPI) => {
	try {
		const response = await axios.put(
			`${BASE_URL}/posts/:postId/comments/${comment._id}`,
			comment,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(
			error.message || "Failed to edit comment"
		);
	}
});

export const deleteComment = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>("comments/deleteComment", async (id, thunkAPI) => {
	try {
		const response = await axios.delete(`${BASE_URL}/posts/:postsId/comments/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(
			error.message || "Failed to delete comment"
		);
	}
});

export const likeComment = createAsyncThunk<
	void,
	string,
	{ rejectValue: string }
>("comments/likeComment", async (id, thunkAPI) => {
	try {
		const response = await axios.put(
			`${BASE_URL}/comments/${id}/likes`,{like: 1},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(response.data);
		return response.data;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(
			error.message || "Failed to like comment"
		);
	}
});

export const unlikeComment = createAsyncThunk<
	void,
	string,
	{ rejectValue: string }
>("comments/unlikeComment", async (id, thunkAPI) => {
	try {
		const response = await axios.put(
			`${BASE_URL}/comments/${id}/dislikes`,{like: 1},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	catch (error: unknown | any) {
		return thunkAPI.rejectWithValue(
			error.message || "Failed to unlike comment"
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
		addLike: (state, action: PayloadAction<string>) => {
			const comment = state.comments.find(
				(comment) => comment._id === action.payload
			);
			if (comment) {
				comment.likes = comment.likes! + 1;
			}
		},
		removeLike: (state, action: PayloadAction<string>) => {
			const comment = state.comments.find(
				(comment) => comment._id === action.payload
			);
			if (comment) {
				comment.likes = comment.likes! - 1;
			}
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
			}).addCase(editComment.pending, (state) => {
				state.status = "loading";
			}).addCase(editComment.fulfilled, (state, action) => {
				state.comments = state.comments.map((comment) =>
					comment._id === action.payload._id ? action.payload : comment
				);
				state.status = "success";
				state.error = null;
			}).addCase(editComment.rejected, (state, action) => {
				state.error = action.payload as string;
			}).addCase(deleteComment.pending, (state) => {
				state.status = "loading";
			}).addCase(deleteComment.fulfilled, (state, action) => {
				state.status = "success";
				state.comments = state.comments.filter(
					(comment) => comment._id !== action.payload
				);
				state.error = null;
			}).addCase(deleteComment.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	},
});

export const { addComment,addLike,removeLike } = commentSlice.actions;

export default commentSlice.reducer;
