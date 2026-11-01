import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBookFromRecommended } from "../../services/library";

export const addRecommendedBook = createAsyncThunk(
  "library/addRecommended",
  async (id, thunkAPI) => {
    try {
      return await addBookFromRecommended(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);