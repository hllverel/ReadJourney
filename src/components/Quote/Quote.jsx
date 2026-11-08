import styles from "./Quote.module.css";

const Quote = () => (
  <div className={styles.quote}>
    <img
      className={styles.icon}
      src="/assets/books@1x.webp"
      srcSet="/assets/books@1x.webp 1x, /assets/books@2x.webp 2x"
      alt="stacked books icon"
    />
    <p className={styles.text}>
      "Books are <span>windows</span> to the world, and reading is a journey into the
      unknown."
    </p>
  </div>
);

export default Quote;