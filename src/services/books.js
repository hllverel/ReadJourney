import { api } from "./api";

export const fetchRecommendedBooks = async ({
  page = 1,
  limit = 10,
  title,
  author,
} = {}) => {
  const { data } = await api.get("/books/recommend", {
    params: {
      page,
      limit,
      title: title || undefined,
      author: author || undefined,
    },
  });
  return data;
};
