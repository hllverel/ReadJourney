import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getRecommendedBooks } from "../../redux/books/operations.js";
import { selectBooks } from "../../redux/books/selectors.js";
import { useModal } from "../../hooks/useModal.js";
import BookCard from "../BookCard/BookCard.jsx";
import AddToLibraryModals from "../AddToLibraryModals/AddToLibraryModals.jsx";
import styles from "./RecommendedPreview.module.css";

const PREVIEW_LIMIT = 3;

const RecommendedPreview = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const detailsModal = useModal();

  useEffect(() => {
    dispatch(getRecommendedBooks({ page: 1, limit: PREVIEW_LIMIT }))
      .unwrap()
      .catch((message) => toast.error(message));
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Recommended books</h2>

      <ul className={styles.list}>
        {books.slice(0, PREVIEW_LIMIT).map((book) => (
          <BookCard key={book._id} book={book} onOpen={detailsModal.open} />
        ))}
      </ul>

      <Link className={styles.homeLink} to="/recommended">
        Home
        <svg className={styles.arrowIcon} aria-hidden="true">
          <use href="/symbol-defs.svg#arrow" />
        </svg>
      </Link>

      <AddToLibraryModals
        book={detailsModal.isOpen ? detailsModal.payload : null}
        onClose={detailsModal.close}
      />
    </section>
  );
};

export default RecommendedPreview;
