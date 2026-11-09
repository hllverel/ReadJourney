import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { startReading, stopReading } from "../../redux/reading/operations.js";
import { getReadingSchema } from "../../utils/readingSchema.js";
import { useModal } from "../../hooks/useModal.js";
import BookReadModal from "../BookReadModal/BookReadModal.jsx";
import styles from "./ReadingForm.module.css";

const ReadingForm = ({ book }) => {
  const dispatch = useDispatch();
  const finishedModal = useModal();

  const activeSession = book.progress.find((entry) => entry.status === "active");
  const isReading = Boolean(activeSession);
  const isDone = book.status === "done";

  const schema = useMemo(
    () =>
      getReadingSchema({
        totalPages: book.totalPages,
        minPage: activeSession?.startPage ?? 1,
      }),
    [book.totalPages, activeSession?.startPage]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { page: "" },
  });

  const onSubmit = async ({ page }) => {
    const action = isReading ? stopReading : startReading;

    try {
      await dispatch(action({ id: book._id, page })).unwrap();
      reset();
      if (isReading && page === book.totalPages) {
        finishedModal.open();
      }
    } catch (message) {
      toast.error(message);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className={styles.fieldset} disabled={isDone}>
          <legend className={styles.legend}>
            {isReading ? "Stop page:" : "Start page:"}
          </legend>

          <label className={styles.field}>
            <span className={styles.label}>Page number:</span>
            <input
              className={styles.input}
              type="number"
              min="1"
              max={book.totalPages}
              placeholder="0"
              {...register("page", { valueAsNumber: true })}
            />
          </label>
          {errors.page && <p className={styles.error}>{errors.page.message}</p>}
        </fieldset>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting || isDone}
        >
          {isReading ? "To stop" : "To start"}
        </button>
      </form>

      {finishedModal.isOpen && <BookReadModal onClose={finishedModal.close} />}
    </>
  );
};

export default ReadingForm;