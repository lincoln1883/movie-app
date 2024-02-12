import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
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
    }
  },
});

export const { registerPending, registerSuccess, registerFailed, clearError } = authSlice.actions;
export default authSlice.reducer;