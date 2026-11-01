import styles from "./ModalMessage.module.css";

const ModalMessage = ({ icon, iconLabel, title, children }) => (
  <div className={styles.message}>
    <span className={styles.icon} role="img" aria-label={iconLabel}>
      {icon}
    </span>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.text}>{children}</p>
  </div>
);

export default ModalMessage;