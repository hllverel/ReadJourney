import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRecommendedBooks } from "../../redux/books/operations.js";
import {
  selectBooks,
  selectBooksPage,
  selectBooksTotalPages,
  selectBooksIsLoading,
} from "../../redux/books/selectors.js";
import BookCard from "../BookCard/BookCard.jsx";
import styles from "./RecommendedBooks.module.css";

const RecommendedBooks = ({ limit }) => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const page = useSelector(selectBooksPage);
  const totalPages = useSelector(selectBooksTotalPages);
  const isLoading = useSelector(selectBooksIsLoading);

  const loadPage = useCallback(
    (nextPage) => {
      dispatch(getRecommendedBooks({ page: nextPage, limit }))
        .unwrap()
        .catch((message) => toast.error(message));
    },
    [dispatch, limit]
  );

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recommended</h2>
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => loadPage(page - 1)}
            disabled={page <= 1 || isLoading}
            aria-label="Previous page"
          >
            <svg className={styles.arrowIcon} aria-hidden="true">
              <use href="/symbol-defs.svg#previous" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => loadPage(page + 1)}
            disabled={page >= totalPages || isLoading}
            aria-label="Next page"
          >
            <svg className={styles.arrowIcon} aria-hidden="true">
              <use href="/symbol-defs.svg#next" />
            </svg>
          </button>
        </div>
      </div>

      <ul className={styles.list}>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </ul>
    </section>
  );
};

export default RecommendedBooks;