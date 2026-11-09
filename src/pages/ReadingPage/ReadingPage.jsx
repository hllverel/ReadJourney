import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getBook } from "../../redux/reading/operations.js";
import { selectReadingBook } from "../../redux/reading/selectors.js";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";
import ReadingForm from "../../components/ReadingForm/ReadingForm.jsx";
import MyReading from "../../components/MyReading/MyReading.jsx";
import ReadingDetails from "../../components/ReadingDetails/ReadingDetails.jsx";
import styles from "./ReadingPage.module.css";

const ReadingPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const book = useSelector(selectReadingBook);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    dispatch(getBook(bookId))
      .unwrap()
      .catch((message) => {
        toast.error(message);
        setHasError(true);
      });
  }, [dispatch, bookId]);

  useEffect(() => {
    dispatch(getBook(bookId))
      .unwrap()
      .catch((message) => toast.error(message));
  }, [dispatch, bookId]);

  const isCurrentBook = book?._id === bookId;

  return (
    <div className={styles.page}>
      {isCurrentBook && (
        <>
          <Dashboard>
            <ReadingForm book={book} />
            <ReadingDetails book={book} />
          </Dashboard>
          <MyReading book={book} />
        </>
      )}
      {hasError && (
        <div className={styles.error}>
          <p className={styles.errorText}>We could not load this book.</p>
          <Link className={styles.errorLink} to="/library">
            Back to My library
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReadingPage;
