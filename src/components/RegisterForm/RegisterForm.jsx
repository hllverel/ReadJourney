import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { register as registerUser } from "../../redux/auth/operations";
import { registerSchema } from "../../utils/registerSchema";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (values) => {
    try {
      await dispatch(registerUser(values)).unwrap();
    } catch (message) {
      toast.error(message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className={styles.field}>
        <span className={styles.label}>Name:</span>
        <input className={styles.input} type="text" autoComplete="name" {...register("name")} />
      </label>
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}

      <label className={styles.field}>
        <span className={styles.label}>Mail:</span>
        <input className={styles.input} type="email" autoComplete="email" {...register("email")} />
      </label>
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <label className={styles.field}>
        <span className={styles.label}>Password:</span>
        <input className={styles.input} type="password" autoComplete="new-password" {...register("password")} />
      </label>
      {errors.password && <p className={styles.error}>{errors.password.message}</p>}

      <div className={styles.actions}>
        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
          Registration
        </button>
        <Link className={styles.loginLink} to="/login">
          Already have an account?
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;