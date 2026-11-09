import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
import {
  getBook,
  startReading,
  stopReading,
  deleteReading,
} from "./operations";
import { clearSession } from "../auth/slice";

const initialState = {
  book: null,
};

const handleBookUpdated = (state, { payload }) => {
  state.book = { ...state.book, ...payload };
};

const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBook.pending, (state) => {
        state.book = null;
      })
      .addCase(getBook.fulfilled, (state, { payload }) => {
        state.book = payload;
      })
      .addCase(startReading.fulfilled, handleBookUpdated)
      .addCase(stopReading.fulfilled, handleBookUpdated)
      .addCase(deleteReading.fulfilled, handleBookUpdated)
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(logOut.rejected, () => initialState)
      .addCase(clearSession, () => initialState);
  },
});

export const readingReducer = readingSlice.reducer;
