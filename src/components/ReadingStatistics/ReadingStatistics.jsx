import {
  getFinishedSessions,
  getPagesRead,
  getPercent,
} from "../../utils/readingStats.js";
import styles from "./ReadingStatistics.module.css";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ReadingStatistics = ({ book }) => {
  const totalRead = getFinishedSessions(book).reduce(
    (sum, entry) => sum + getPagesRead(entry),
    0,
  );
  const pagesRead = Math.min(totalRead, book.totalPages);
  const percent = getPercent(pagesRead, book.totalPages);

  return (
    <div className={styles.statistics}>
      <p className={styles.description}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>

      <div className={styles.card}>
        <div className={styles.chart}>
          <svg
            className={styles.ring}
            viewBox="0 0 100 100"
            role="img"
            aria-label={`${percent}% of the book read`}
          >
            <circle
              className={styles.track}
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth="10"
            />
            <circle
              className={styles.arc}
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <h2 className={styles.total}>100%</h2>
        </div>

        <div className={styles.legend}>
          <span className={styles.legendMarker} aria-hidden="true" />
          <div>
            <p className={styles.percent}>{percent}%</p>
            <p className={styles.pagesRead}>{pagesRead} pages read</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingStatistics;
