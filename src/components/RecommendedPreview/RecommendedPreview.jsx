import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getRecommendedBooks } from "../../redux/books/operations.js";
import { selectBooks } from "../../redux/books/selectors.js";
import { useModal } from "../../hooks/useModal.js";
import BookCard from "../BookCard/BookCard.jsx";
import AddToLibraryModals from "../AddToLibraryModals/AddToLibraryModals.jsx";
import { useBooksPerPage } from "../../hooks/useBooksPerPage.js";
import styles from "./RecommendedPreview.module.css";

const RecommendedPreview = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const detailsModal = useModal();
  const listRef = useRef(null);
  const limit = useBooksPerPage(listRef, 1);

  useEffect(() => {
    if (!limit) return;
    dispatch(getRecommendedBooks({ page: 1, limit }))
      .unwrap()
      .catch((message) => toast.error(message));
  }, [dispatch, limit]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Recommended books</h2>

      <ul className={styles.list} ref={listRef}>
        {books.slice(0, limit ?? 0).map((book) => (
          <BookCard key={book._id} book={book} onOpen={detailsModal.open} size="small" />
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
