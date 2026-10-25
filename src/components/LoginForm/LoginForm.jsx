import { useState, useId } from "react";
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

  const [showPassword, setShowPassword] = useState(false);
  const passwordId = useId();
  
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

      <div className={styles.field}>
        <label className={styles.label} htmlFor={passwordId}>
          Password:
        </label>
        <input
          id={passwordId}
          className={styles.input}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          {...register("password")}
        />
        <button
          className={styles.toggleButton}
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <svg className={styles.toggleIcon} aria-hidden="true">
            <use href={`/symbol-defs.svg#${showPassword ? "hidepassword" : "showpassword"}`} />
          </svg>
        </button>
      </div>
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