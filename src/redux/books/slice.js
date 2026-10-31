import { createSlice } from "@reduxjs/toolkit";
import { getRecommendedBooks } from "./operations";

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  perPage: 10,
  isLoading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendedBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecommendedBooks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload.results;
        state.page = payload.page;
        state.totalPages = payload.totalPages;
        state.perPage = payload.perPage;
      })
      .addCase(getRecommendedBooks.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const booksReducer = booksSlice.reducer;