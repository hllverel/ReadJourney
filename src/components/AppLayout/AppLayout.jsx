import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getOwnBooks } from "../../redux/library/operations.js";
import Header from "../Header/Header.jsx";
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnBooks())
      .unwrap()
      .catch((message) => toast.error(message));
  }, [dispatch]);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
