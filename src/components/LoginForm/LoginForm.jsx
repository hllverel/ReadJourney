import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { logIn } from "../../redux/auth/operations.js";
import { loginSchema } from "../../utils/loginSchema.js";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (values) => {
    try {
      await dispatch(logIn(values)).unwrap();
    } catch (message) {
      toast.error(message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <label className={styles.field}>
        <span className={styles.label}>Mail:</span>
        <input className={styles.input} type="email" autoComplete="email" {...register("email")} />
      </label>
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <label className={styles.field}>
        <span className={styles.label}>Password:</span>
        <input className={styles.input} type="password" autoComplete="current-password" {...register("password")} />
      </label>
      {errors.password && <p className={styles.error}>{errors.password.message}</p>}

      <div className={styles.actions}>
        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
          Log in
        </button>
        <Link className={styles.registerLink} to="/register">
          Don&apos;t have an account?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;