import styles from "./Dashboard.module.css";

const Dashboard = ({ children }) => (
  <aside className={styles.dashboard} aria-label="Dashboard">
    {children}
  </aside>
);

export default Dashboard;