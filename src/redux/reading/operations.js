import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBookById,
  postReadingStart,
  postReadingFinish,
  removeReading,
} from "../../services/reading";

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message;

export const getBook = createAsyncThunk(
  "reading/getBook",
  async (id, thunkAPI) => {
    try {
      return await fetchBookById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const startReading = createAsyncThunk(
  "reading/start",
  async (values, thunkAPI) => {
    try {
      return await postReadingStart(values);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const stopReading = createAsyncThunk(
  "reading/stop",
  async (values, thunkAPI) => {
    try {
      return await postReadingFinish(values);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteReading = createAsyncThunk(
  "reading/delete",
  async (values, thunkAPI) => {
    try {
      return await removeReading(values);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);
