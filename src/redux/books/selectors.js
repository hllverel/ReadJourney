export const selectBooks = (state) => state.books.items;
export const selectBooksPage = (state) => state.books.page;
export const selectBooksTotalPages = (state) => state.books.totalPages;
export const selectBooksIsLoading = (state) => state.books.isLoading;
export const selectBooksError = (state) => state.books.error;