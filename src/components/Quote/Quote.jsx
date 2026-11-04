import styles from "./Quote.module.css";

const Quote = () => (
  <div className={styles.quote}>
    <span className={styles.icon} role="img" aria-label="Books">📚</span>
    <p className={styles.text}>
      "Books are <span>windows</span> to the world, and reading is a journey into the
      unknown."
    </p>
  </div>
);

export default Quote;