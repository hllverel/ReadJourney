import styles from "./ModalMessage.module.css";

const ModalMessage = ({ image, title, children }) => (
  <div className={styles.message}>
    <img
      className={styles.image}
      src={`${image}@1x.webp`}
      srcSet={`${image}@1x.webp 1x, ${image}@2x.webp 2x`}
      alt=""
    />
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.text}>{children}</p>
  </div>
);

export default ModalMessage;