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
import { addRecommendedBook } from "../../redux/library/operations.js";
import Modal from "../Modal/Modal.jsx";
import ModalMessage from "../ModalMessage/ModalMessage.jsx";
import BookCard from "../BookCard/BookCard.jsx";
import BookDetails from "../BookDetails/BookDetails.jsx";
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
  const [isAdding, setIsAdding] = useState(false);

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
  
  const handleAdd = async () => {
    setIsAdding(true);
    try {
      await dispatch(addRecommendedBook(detailsModal.payload._id)).unwrap();
      detailsModal.close();
      successModal.open();
    } catch (message) {
      toast.error(message);
    } finally {
      setIsAdding(false);
    }
  };

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

      {detailsModal.isOpen && (
        <Modal onClose={detailsModal.close} label="Book details">
          <BookDetails
            book={detailsModal.payload}
            actionLabel="Add to library"
            onAction={handleAdd}
            isPending={isAdding}
          />
        </Modal>
      )}

      {successModal.isOpen && (
        <Modal onClose={successModal.close} label="Book added">
          <ModalMessage icon="👍" iconLabel="Thumbs up" title="Good job">
            Your book is now in <strong>the library!</strong> The joy knows no
            bounds and now you can start your training
          </ModalMessage>
        </Modal>
      )}
    </section>
  );
};

export default RecommendedBooks;