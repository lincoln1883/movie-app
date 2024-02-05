import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import showReducer from "../features/shows/showSlice";
import creditsReducer from "../features/credits/creditSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    shows: showReducer,
    credits: creditsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
