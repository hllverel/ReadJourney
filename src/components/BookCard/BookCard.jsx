import BookCover from "../BookCover/BookCover.jsx";
import styles from "./BookCard.module.css";

const BookCard = ({ book, onOpen, onDelete }) => (
  <li className={styles.card}>
    <button
      type="button"
      className={styles.coverButton}
      onClick={() => onOpen(book)}
    >
      <BookCover book={book} className={styles.cover} loading="lazy" />
    </button>

    <div className={styles.info}>
      <div className={styles.text}>
        <h3 className={styles.title} title={book.title}>
          {book.title}
        </h3>
        <p className={styles.author}>{book.author}</p>
      </div>

      {onDelete && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(book)}
          aria-label={`Delete ${book.title}`}
        >
          <svg className={styles.deleteIcon} aria-hidden="true">
            <use href="/symbol-defs.svg#delete" />
          </svg>
        </button>
      )}
    </div>
  </li>
);

export default BookCard;