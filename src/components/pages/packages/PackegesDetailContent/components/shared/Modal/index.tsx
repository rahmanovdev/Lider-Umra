import React from "react";
import styles from "./styles.module.scss"; // Стили модального окна

interface ModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  content,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};
