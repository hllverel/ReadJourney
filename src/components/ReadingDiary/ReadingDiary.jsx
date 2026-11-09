import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { deleteReading } from "../../redux/reading/operations.js";
import {
  getFinishedSessions,
  getPagesRead,
  getPercent,
  getMinutesRead,
  formatDate,
} from "../../utils/readingStats.js";
import styles from "./ReadingDiary.module.css";

const ReadingDiary = ({ book }) => {
  const dispatch = useDispatch();

  const sessions = [...getFinishedSessions(book)].sort(
    (a, b) => new Date(b.finishReading) - new Date(a.finishReading)
  );

  const handleDelete = (entry) => {
    dispatch(deleteReading({ bookId: book._id, readingId: entry._id }))
      .unwrap()
      .catch((message) => toast.error(message));
  };

  return (
    <ul className={styles.list}>
      {sessions.map((entry, index) => (
        <li key={entry._id} className={styles.item}>
          <div className={styles.top}>
            <span
              className={
                index === 0
                  ? `${styles.marker} ${styles.markerLatest}`
                  : styles.marker
              }
              aria-hidden="true"
            />
            <time className={styles.date} dateTime={entry.finishReading}>
              {formatDate(entry.finishReading)}
            </time>
            <p className={styles.pages}>{getPagesRead(entry)} pages</p>
          </div>

          <div className={styles.details}>
            <div>
              <p className={styles.percent}>
                {getPercent(getPagesRead(entry), book.totalPages)}%
              </p>
              <p className={styles.minutes}>{getMinutesRead(entry)} minutes</p>
            </div>

            <div className={styles.speed}>
              <div className={styles.speedRow}>
                <svg
                  className={styles.sparkline}
                  viewBox="0 0 88 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <polygon
                    points="0,32 0,10 88,0 88,32"
                    fill="currentColor"
                    fillOpacity="0.2"
                  />
                  <line
                    x1="0"
                    y1="10"
                    x2="88"
                    y2="0"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDelete(entry)}
                  aria-label={`Delete the reading from ${formatDate(entry.finishReading)}`}
                >
                  <svg className={styles.deleteIcon} aria-hidden="true">
                    <use href="/symbol-defs.svg#delete" />
                  </svg>
                </button>
              </div>
              <p className={styles.speedText}>{entry.speed} pages per hour</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReadingDiary;