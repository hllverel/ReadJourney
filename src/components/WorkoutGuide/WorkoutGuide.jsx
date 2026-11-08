import { Link } from "react-router-dom";
import styles from "./WorkoutGuide.module.css";

const WorkoutGuide = () => (
  <section className={styles.guide}>
    <h2 className={styles.title}>Start your workout</h2>

    <ul className={styles.steps}>
      <li className={styles.step}>
        <h2 className={styles.number} aria-hidden="true">1</h2>
        <p className={styles.text}>
          <span>Create a personal library:</span> add the books you intend
          to read to it.
        </p>
      </li>
      <li className={styles.step}>
        <h2 className={styles.number} aria-hidden="true">2</h2>
        <p className={styles.text}>
          <span>Create your first workout:</span> define a goal, choose a
          period, start training.
        </p>
      </li>
    </ul>

    <Link className={styles.libraryLink} to="/library">
      My library
      <svg className={styles.arrowIcon} aria-hidden="true">
        <use href="/symbol-defs.svg#arrow" />
      </svg>
    </Link>
  </section>
);

export default WorkoutGuide;