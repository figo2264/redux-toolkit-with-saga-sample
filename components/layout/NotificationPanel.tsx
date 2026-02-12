import React from 'react';
import NotificationEmpty from './NotificationEmpty';
import NotificationHeader from './NotificationHeader';
import styles from './NotificationPanel.module.scss';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.panel} ${isOpen ? styles.show : ''}`}>
        <NotificationHeader />
        <div className={styles.contentArea}>
          <NotificationEmpty />
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
