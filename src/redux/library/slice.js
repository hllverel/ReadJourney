import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
import {
  getOwnBooks,
  addRecommendedBook,
  addNewBook,
  removeBook,
} from "./operations";
import { startReading, stopReading, deleteReading } from "../reading/operations";
import { clearSession } from "../auth/slice";

const initialState = {
  items: [],
  isLoaded: false,
};

const handleBookAdded = (state, { payload }) => {
  state.items.push(payload);
};

const handleBookUpdated = (state, { payload }) => {
  const index = state.items.findIndex((book) => book._id === payload._id);
  if (index !== -1) {
    state.items[index] = payload;
  }
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOwnBooks.fulfilled, (state, { payload }) => {
        state.items = payload;
        state.isLoaded = true;
      })
      .addCase(addRecommendedBook.fulfilled, handleBookAdded)
      .addCase(addNewBook.fulfilled, handleBookAdded)
      .addCase(removeBook.fulfilled, (state, { meta }) => {
        state.items = state.items.filter((book) => book._id !== meta.arg);
      })
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(logOut.rejected, () => initialState)
      .addCase(startReading.fulfilled, handleBookUpdated)
      .addCase(stopReading.fulfilled, handleBookUpdated)
      .addCase(deleteReading.fulfilled, handleBookUpdated)
      .addCase(clearSession, () => initialState);
  },
});

export const libraryReducer = librarySlice.reducer;