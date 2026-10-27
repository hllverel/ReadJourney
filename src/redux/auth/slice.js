import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut } from "./operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  refreshToken: null,
  isLoggedIn: false,
};

const handleAuthSuccess = (state, { payload }) => {
  state.user = { name: payload.name, email: payload.email };
  state.token = payload.token;
  state.refreshToken = payload.refreshToken;
  state.isLoggedIn = true;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, handleAuthSuccess)
      .addCase(logIn.fulfilled, handleAuthSuccess)
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(logOut.rejected, () => initialState);
  },
});

export const authReducer = authSlice.reducer;