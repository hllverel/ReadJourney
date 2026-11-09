import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { removeBook } from "../../redux/library/operations.js";
import {
  selectLibraryBooks,
  selectLibraryIsLoaded,
} from "../../redux/library/selectors.js";
import { libraryFilterOptions } from "../../utils/libraryFilterOptions.js";
import { useModal } from "../../hooks/useModal.js";
import BookCard from "../BookCard/BookCard.jsx";
import BookDetails from "../BookDetails/BookDetails.jsx";
import Modal from "../Modal/Modal.jsx";
import styles from "./MyLibraryBooks.module.css";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(selectLibraryBooks);
  const isLoaded = useSelector(selectLibraryIsLoaded);
  const [status, setStatus] = useState("all");
  const detailsModal = useModal();

  const visibleBooks =
    status === "all" ? books : books.filter((book) => book.status === status);

  const handleDelete = (book) => {
    dispatch(removeBook(book._id))
      .unwrap()
      .catch((message) => toast.error(message));
  };

  const handleStartReading = () => {
    const { _id } = detailsModal.payload;
    detailsModal.close();
    navigate(`/reading/${_id}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>My library</h2>

        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter books by status"
          >
            {libraryFilterOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <svg className={styles.selectIcon} aria-hidden="true">
            <use href="/symbol-defs.svg#dropdown" />
          </svg>
        </div>
      </div>

      {isLoaded && books.length === 0 && (
        <div className={styles.empty}>
          <span className={styles.emptyIcon} role="img" aria-label="Books">
            📚
          </span>
          <p className={styles.emptyText}>
            To start training, add{" "}
            <span className={styles.muted}>some of your books</span> or from the
            recommended ones
          </p>
        </div>
      )}

      {isLoaded && books.length > 0 && visibleBooks.length === 0 && (
        <p className={styles.noResults}>No books with this status yet.</p>
      )}

      {visibleBooks.length > 0 && (
        <ul className={styles.list}>
          {visibleBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onOpen={detailsModal.open}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      {detailsModal.isOpen && (
        <Modal onClose={detailsModal.close} label="Book details">
          <BookDetails
            book={detailsModal.payload}
            actionLabel="Start reading"
            onAction={handleStartReading}
          />
        </Modal>
      )}
    </section>
  );
};

export default MyLibraryBooks;
