import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const getLinkClass = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

const Navigation = ({ onNavigate }) => (
  <nav aria-label="Main">
    <ul className={styles.list}>
      <li>
        <NavLink className={getLinkClass} to="/recommended" onClick={onNavigate}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={getLinkClass} to="/library" onClick={onNavigate}>
          My library
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;