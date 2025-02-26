import React from 'react';
import styles from './styles.module.scss';

interface ModalProps {
  title: string;
  content: string | React.ReactElement | React.ReactNode;
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

  const renderContent = () => {
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Жабуу"
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>{renderContent()}</div>
      </div>
    </div>
  );
};
