import { api } from "./api";

export const fetchBookById = async (id) => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

export const postReadingStart = async ({ id, page }) => {
  const { data } = await api.post("/books/reading/start", { id, page });
  return data;
};

export const postReadingFinish = async ({ id, page }) => {
  const { data } = await api.post("/books/reading/finish", { id, page });
  return data;
};

export const removeReading = async ({ bookId, readingId }) => {
  const { data } = await api.delete("/books/reading", {
    params: { bookId, readingId },
  });
  return data;
};