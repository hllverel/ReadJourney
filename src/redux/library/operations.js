import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBookFromRecommended,
  fetchOwnBooks,
  createBook,
  deleteBook,
} from "../../services/library";

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message;

export const addRecommendedBook = createAsyncThunk(
  "library/addRecommended",
  async (id, thunkAPI) => {
    try {
      return await addBookFromRecommended(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getOwnBooks = createAsyncThunk(
  "library/getOwn",
  async (_, thunkAPI) => {
    try {
      return await fetchOwnBooks();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const addNewBook = createAsyncThunk(
  "library/addNew",
  async (book, thunkAPI) => {
    try {
      return await createBook(book);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const removeBook = createAsyncThunk(
  "library/remove",
  async (id, thunkAPI) => {
    try {
      return await deleteBook(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);
