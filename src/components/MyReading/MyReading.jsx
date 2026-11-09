import BookCover from "../BookCover/BookCover.jsx";
import { formatTimeLeft } from "../../utils/formatTimeLeft.js";
import styles from "./MyReading.module.css";

const MyReading = ({ book }) => {
  const isReading = book.progress.some((entry) => entry.status === "active");

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>My reading</h2>
        {book.timeLeftToRead && (
          <p className={styles.timeLeft}>{formatTimeLeft(book.timeLeftToRead)}</p>
        )}
      </div>

      <div className={styles.book}>
        <BookCover book={book} className={styles.cover} />
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        <svg
          className={styles.indicator}
          role="img"
          aria-label={isReading ? "Reading in progress" : "Not reading"}
        >
          <use
            href={`/symbol-defs.svg#${isReading ? "stoprecording" : "recording"}`}
          />
        </svg>
      </div>
    </section>
  );
};

export default MyReading;