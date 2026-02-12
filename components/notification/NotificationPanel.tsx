import React from 'react';
import NotificationEmpty from './NotificationEmpty';
import NotificationHeader from './NotificationHeader';
import styles from './NotificationPanel.module.scss';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.panel} ${isOpen ? styles.show : ''}`}>
        <NotificationHeader />
        <div className={`${styles.contentArea} ${children ? styles.hasContent : ''}`}>
          {children || <NotificationEmpty />}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
