import styles from "./BookCard.module.css";

const BookCard = ({ book, onOpen }) => (
  <li className={styles.card}>
    <button type="button" className={styles.coverButton} onClick={() => onOpen(book)}>
      <img
        className={styles.cover}
        src={book.imageUrl}
        alt={`${book.title} cover`}
        loading="lazy"
      />
    </button>
    <h3 className={styles.title}>{book.title}</h3>
    <p className={styles.author}>{book.author}</p>
  </li>
);

export default BookCard;