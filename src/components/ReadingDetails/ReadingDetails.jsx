import { useState } from "react";
import { getFinishedSessions } from "../../utils/readingStats.js";
import ReadingDiary from "../ReadingDiary/ReadingDiary.jsx";
import ReadingStatistics from "../ReadingStatistics/ReadingStatistics.jsx";
import styles from "./ReadingDetails.module.css";

const ReadingDetails = ({ book }) => {
  const [view, setView] = useState("statistics");
  const hasSessions = getFinishedSessions(book).length > 0;

  if (!hasSessions) {
    return (
      <section className={styles.details}>
        <h2 className={styles.title}>Progress</h2>
        <p className={styles.hint}>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <span className={styles.star} role="img" aria-label="Star">
          🌟
        </span>
      </section>
    );
  }

  return (
    <section className={styles.details}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {view === "diary" ? "Diary" : "Statistics"}
        </h2>

        <div className={styles.toggles}>
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={view === "diary"}
            aria-label="Show diary"
            onClick={() => setView("diary")}
          >
            <svg className={styles.toggleIcon} aria-hidden="true">
              <use href="/symbol-defs.svg#hourglass" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.toggle}
            aria-pressed={view === "statistics"}
            aria-label="Show statistics"
            onClick={() => setView("statistics")}
          >
            <svg className={styles.toggleIcon} aria-hidden="true">
              <use href="/symbol-defs.svg#piechart" />
            </svg>
          </button>
        </div>
      </div>

      {view === "diary" ? (
        <ReadingDiary book={book} />
      ) : (
        <ReadingStatistics book={book} />
      )}
    </section>
  );
};

export default ReadingDetails;
