import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecommendedBooks } from "../../services/books";

export const getRecommendedBooks = createAsyncThunk(
  "books/getRecommended",
  async (params, thunkAPI) => {
    try {
      return await fetchRecommendedBooks(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
