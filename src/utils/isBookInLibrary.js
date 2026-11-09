const normalise = (value) => value.trim().toLowerCase();

export const isBookInLibrary = (libraryBooks, book) =>
  libraryBooks.some(
    (item) =>
      normalise(item.title) === normalise(book.title) &&
      normalise(item.author) === normalise(book.author),
  );
