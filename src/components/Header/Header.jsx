import { useState, useId } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Navigation from "../Navigation/Navigation.jsx";
import { logOut } from "../../redux/auth/operations.js";
import { selectUser } from "../../redux/auth/selectors.js";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (message) {
      toast.error(message);
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} aria-label="ReadJourney home">
        <svg className={styles.logoSvg} aria-hidden="true">
          <use href="/symbol-defs.svg#logo" />
        </svg>
        <span className={styles.logoText}>read journey</span>
      </Link>

      <div className={styles.userBar}>
        <div className={styles.avatar} aria-hidden="true">
          {name?.charAt(0).toUpperCase()}
        </div>
        <p className={styles.userName}>{name}</p>
      </div>

      <button
        type="button"
        className={styles.menuToggle}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls={menuId}
      >
        <svg className={styles.menuIcon} aria-hidden="true">
          <use href={`/symbol-defs.svg#${isMenuOpen ? "close" : "menu"}`} />
        </svg>
      </button>

      <div
        id={menuId}
        className={
          isMenuOpen ? `${styles.navWrapper} ${styles.open}` : styles.navWrapper
        }
      >
        <Navigation onNavigate={() => setIsMenuOpen(false)} />
        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;