import styles from "./AuthLayout.module.css";

const AuthLayout = ({ children }) => (
  <main className={styles.layout}>
    <section className={styles.formCard}>
      <div className={styles.logoArea}>
        <svg className={styles.logo} aria-hidden="true">
          <use href="/symbol-defs.svg#logo" />
        </svg>
        <p className={styles.logoTitle}>Read Journey</p>
      </div>
      <h1 className={styles.title}>
        Expand your mind, reading <span className={styles.titleAccent}>a book</span>
      </h1>
      {children}
    </section>

    <section className={styles.heroCard}>
      <img
        className={styles.heroImage}
        src="/assets/PhoneScreen@1x.webp"
        srcSet="/assets/PhoneScreen@1x.webp 1x, /assets/PhoneScreen@2x.webp 2x"
        alt="Preview of the ReadJourney app showing recommended books"
      />
    </section>
  </main>
);

export default AuthLayout;