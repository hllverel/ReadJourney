import { api } from "./api";

export const addBookFromRecommended = async (id) => {
  const { data } = await api.post(`/books/add/${id}`);
  return data;
};