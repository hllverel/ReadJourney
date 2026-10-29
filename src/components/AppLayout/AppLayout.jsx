import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import styles from "./AppLayout.module.css";

const AppLayout = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.content}>
      <Outlet />
    </main>
  </div>
);

export default AppLayout;