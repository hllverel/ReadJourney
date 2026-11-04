import { Link } from "react-router-dom";
import styles from "./WorkoutGuide.module.css";

const WorkoutGuide = () => (
  <section className={styles.guide}>
    <h2 className={styles.title}>Start your workout</h2>

    <ol className={styles.steps}>
      <li className={styles.step}>
        <span className={styles.number} aria-hidden="true">1</span>
        <p className={styles.text}>
          <strong>Create a personal library:</strong> add the books you intend
          to read to it.
        </p>
      </li>
      <li className={styles.step}>
        <span className={styles.number} aria-hidden="true">2</span>
        <p className={styles.text}>
          <strong>Create your first workout:</strong> define a goal, choose a
          period, start training.
        </p>
      </li>
    </ol>

    <Link className={styles.libraryLink} to="/library">
      My library
      <svg className={styles.arrowIcon} aria-hidden="true">
        <use href="/symbol-defs.svg#arrow" />
      </svg>
    </Link>
  </section>
);

export default WorkoutGuide;