export const getFinishedSessions = (book) =>
  book.progress.filter((entry) => entry.status === "inactive");

export const getPagesRead = (entry) => entry.finishPage - entry.startPage + 1;

export const getPercent = (pages, totalPages) =>
  Math.min(100, Math.round((pages / totalPages) * 10000) / 100);

export const getMinutesRead = (entry) =>
  Math.max(
    1,
    Math.round(
      (new Date(entry.finishReading) - new Date(entry.startReading)) / 60000,
    ),
  );

export const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("en-GB").replaceAll("/", ".");
