import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ onClose, label, children }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const appRoot = document.getElementById("root");
    const previouslyFocused = document.activeElement;

    appRoot.inert = true;
    document.body.style.overflow = "hidden";
    closeButtonRef.current.focus();

    return () => {
      appRoot.inert = false;
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, []);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <svg className={styles.closeIcon} aria-hidden="true">
            <use href="/symbol-defs.svg#close" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
