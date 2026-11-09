import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addNewBook } from "../../redux/library/operations.js";
import { selectLibraryBooks } from "../../redux/library/selectors.js";
import { addBookSchema } from "../../utils/addBookSchema.js";
import { isBookInLibrary } from "../../utils/isBookInLibrary.js";
import { useModal } from "../../hooks/useModal.js";
import BookAddedModal from "../BookAddedModal/BookAddedModal.jsx";
import styles from "./AddBookForm.module.css";

const AddBookForm = () => {
  const dispatch = useDispatch();
  const libraryBooks = useSelector(selectLibraryBooks);
  const successModal = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addBookSchema),
    defaultValues: { title: "", author: "", totalPages: "" },
  });

  const onSubmit = async (values) => {
    if (isBookInLibrary(libraryBooks, values)) {
      toast.error("This book is already in your library");
      return;
    }

    try {
      await dispatch(addNewBook(values)).unwrap();
      reset();
      successModal.open();
    } catch (message) {
      toast.error(message);
    }
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Filters:</legend>

          <label className={styles.field}>
            <span className={styles.label}>Book title:</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter text"
              autoComplete="off"
              {...register("title")}
            />
          </label>
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}

          <label className={styles.field}>
            <span className={styles.label}>The author:</span>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter text"
              autoComplete="off"
              {...register("author")}
            />
          </label>
          {errors.author && (
            <p className={styles.error}>{errors.author.message}</p>
          )}

          <label className={styles.field}>
            <span className={styles.label}>Number of pages:</span>
            <input
              className={styles.input}
              type="number"
              min="1"
              placeholder="0"
              {...register("totalPages", { valueAsNumber: true })}
            />
          </label>
          {errors.totalPages && (
            <p className={styles.error}>{errors.totalPages.message}</p>
          )}
        </fieldset>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          Add book
        </button>
      </form>

      {successModal.isOpen && <BookAddedModal onClose={successModal.close} />}
    </>
  );
};

export default AddBookForm;
