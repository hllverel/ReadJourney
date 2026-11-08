import { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRecommendedBooks } from "../../redux/books/operations.js";
import {
  selectBooks,
  selectBooksPage,
  selectBooksTotalPages,
  selectBooksIsLoading,
} from "../../redux/books/selectors.js";
import { useBooksPerPage } from "../../hooks/useBooksPerPage.js";
import { useModal } from "../../hooks/useModal.js";
import AddToLibraryModals from "../AddToLibraryModals/AddToLibraryModals.jsx";
import BookCard from "../BookCard/BookCard.jsx";
import styles from "./RecommendedBooks.module.css";

const RecommendedBooks = ({filters}) => {
  const listRef = useRef(null);
  const limit = useBooksPerPage(listRef);
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const page = useSelector(selectBooksPage);
  const totalPages = useSelector(selectBooksTotalPages);
  const isLoading = useSelector(selectBooksIsLoading);
  const detailsModal = useModal();
  const successModal = useModal();

  const loadPage = useCallback(
    (nextPage) => {
      dispatch(getRecommendedBooks({ page: nextPage, limit, ...filters }))
        .unwrap()
        .catch((message) => toast.error(message));
    },
    [dispatch, limit, filters]
  );

   useEffect(() => {
     if (limit) loadPage(1);
   }, [limit, loadPage]);
  

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

      <ul className={styles.list} ref={listRef}>
        {books.map((book) => (
          <BookCard key={book._id} book={book} onOpen={detailsModal.open}/>
        ))}
      </ul>

      <AddToLibraryModals
        book={detailsModal.isOpen ? detailsModal.payload : null}
        onClose={detailsModal.close}
      />
    </section>
  );
};

export default RecommendedBooks;