import { useForm } from "react-hook-form";
import styles from "./Filters.module.css";

const Filters = ({ onApply }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { title: "", author: "" },
  });

  const onSubmit = ({ title, author }) => {
    onApply({ title: title.trim(), author: author.trim() });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
      </fieldset>

      <button className={styles.submitButton} type="submit">
        To apply
      </button>
    </form>
  );
};

export default Filters;