import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
import {
  getOwnBooks,
  addRecommendedBook,
  addNewBook,
  removeBook,
} from "./operations";

const initialState = {
  items: [],
  isLoaded: false,
};

const handleBookAdded = (state, { payload }) => {
  state.items.push(payload);
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
      .addCase(logOut.rejected, () => initialState);
  },
});

export const libraryReducer = librarySlice.reducer;