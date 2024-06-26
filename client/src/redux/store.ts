import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import showReducer from "../features/shows/showSlice";
import movieCreditsReducer from "../features/credits/movieCredits/movieCreditSlice";
import showCreditsReducer from "../features/credits/showCredits/showCreditSlice";
import userReducer from "../features/users/userSlice";
import authReducer from "../features/auth/authSlice";
import commentReducer from "../features/comments/movies/commentSlice";
import postReducer from "../features/posts/postSlice";
import likeReducer from "../features/likes/likeSlice";

const store = configureStore({
	reducer: {
		movies: movieReducer,
		shows: showReducer,
		movieCredits: movieCreditsReducer,
		showCredits: showCreditsReducer,
		users: userReducer,
		currentUser: authReducer,
		comments: commentReducer,
		posts: postReducer,
		likes: likeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
