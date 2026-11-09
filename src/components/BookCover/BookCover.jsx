import styles from "./BookCover.module.css";

const BookCover = ({ book, className = "", loading }) => {
  if (!book.imageUrl) {
    return (
      <div
        className={`${className} ${styles.placeholder}`}
        role="img"
        aria-label={`${book.title} cover`}
      >
        <svg className={styles.placeholderIcon} aria-hidden="true">
          <use href="/symbol-defs.svg#noimage" />
        </svg>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={book.imageUrl}
      alt={`${book.title} cover`}
      loading={loading}
    />
  );
};

export default BookCover;
