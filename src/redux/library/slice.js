import { createSlice } from "@reduxjs/toolkit";
import { addRecommendedBook } from "./operations";

const librarySlice = createSlice({
  name: "library",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addRecommendedBook.fulfilled, (state, { payload }) => {
      state.items.push(payload);
    });
  },
});

export const libraryReducer = librarySlice.reducer;