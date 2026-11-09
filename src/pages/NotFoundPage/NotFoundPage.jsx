import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => (
  <main className={styles.page}>
    <h1 className={styles.title}>Page not found</h1>
    <p className={styles.text}>
      The page you are looking for does not exist or has been moved.
    </p>
    <Link className={styles.link} to="/">
      Go to the home page
    </Link>
  </main>
);

export default NotFoundPage;
