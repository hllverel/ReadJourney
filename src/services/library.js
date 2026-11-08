import { api } from "./api";

export const addBookFromRecommended = async (id) => {
  const { data } = await api.post(`/books/add/${id}`);
  return data;
};

export const fetchOwnBooks = async () => {
  const { data } = await api.get("/books/own");
  return data;
};

export const createBook = async (book) => {
  const { data } = await api.post("/books/add", book);
  return data;
};

export const deleteBook = async (id) => {
  const { data } = await api.delete(`/books/remove/${id}`);
  return data;
};