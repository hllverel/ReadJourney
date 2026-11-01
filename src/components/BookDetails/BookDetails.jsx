import styles from "./BookDetails.module.css";

const BookDetails = ({ book, actionLabel, onAction, isPending }) => (
  <div className={styles.details}>
    <img
      className={styles.cover}
      src={book.imageUrl}
      alt={`${book.title} cover`}
    />
    <h2 className={styles.title}>{book.title}</h2>
    <p className={styles.author}>{book.author}</p>
    <p className={styles.pages}>{book.totalPages} pages</p>
    <button
      type="button"
      className={styles.actionButton}
      onClick={onAction}
      disabled={isPending}
    >
      {actionLabel}
    </button>
  </div>
);

export default BookDetails;