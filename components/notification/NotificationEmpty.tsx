import React from 'react';
import styles from './NotificationEmpty.module.scss';

const NotificationEmpty: React.FC = () => {
  return (
    <p className={styles.emptyState}>새로운 알림이 없습니다.</p>
  );
};

export default NotificationEmpty;
