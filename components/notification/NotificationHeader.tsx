import React from 'react';
import styles from './NotificationHeader.module.scss';

const NotificationHeader: React.FC = () => {
  return (
    <div className={styles.topArea}>
      <span className={styles.title}>알림</span>
      <div className={styles.actions}>
        <button type="button" className={styles.btnOutline}>전체삭제</button>
        <button type="button" className={styles.btnOutline}>전체읽음</button>
        <button type="button" className={styles.btnSetting} title="알림 설정"></button>
      </div>
    </div>
  );
};

export default NotificationHeader;
