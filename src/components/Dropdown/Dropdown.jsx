import { useState, useRef, useEffect, useId } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);
  const listId = useId();

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const closeIfOutside = (event) => {
      if (!rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current.focus();
      }
    };

    document.addEventListener("mousedown", closeIfOutside);
    document.addEventListener("focusin", closeIfOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", closeIfOutside);
      document.removeEventListener("focusin", closeIfOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    toggleRef.current.focus();
  };

  return (
    <div className={styles.dropdown} ref={rootRef}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-label={`${label}: ${selected?.label}`}
      >
        {selected?.label}
        <svg
          className={isOpen ? `${styles.icon} ${styles.iconOpen}` : styles.icon}
          aria-hidden="true"
        >
          <use href="/symbol-defs.svg#dropdown" />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.list} id={listId}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={
                  option.value === value
                    ? `${styles.option} ${styles.optionSelected}`
                    : styles.option
                }
                aria-current={option.value === value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;